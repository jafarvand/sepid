const http = require("http");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawn } = require("child_process");
let sql = null;
try {
  sql = require("mssql");
} catch {
  sql = null;
}

const root = __dirname;
const port = Number(process.env.PORT || 5173);
const bindHost = process.env.HOST || "127.0.0.1";
const sqlServer = process.env.SQL_SERVER || (process.platform === "win32" ? ".\\SQLEXPRESS" : "localhost");
const sqlPort = Number(process.env.SQL_PORT || 1433);
const sqlDatabase = process.env.SQL_DATABASE || "Sepidar_Analysis_New";
const sqlUser = process.env.SQL_USER || "";
const sqlPassword = process.env.SQL_PASSWORD || "";
const sqlEncrypt = String(process.env.SQL_ENCRYPT || "false").toLowerCase() === "true";
const sqlTrustCert = String(process.env.SQL_TRUST_CERT || "true").toLowerCase() !== "false";

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png"
};

const moduleTitles = {
  ACC: ["Accounting", "Accounts, detail ledgers, vouchers, voucher items"],
  RPA: ["Treasury", "Cash, bank, cheques, receipts, payments, settlements"],
  FMK: ["Framework", "Users, roles, settings, infrastructure"],
  GNR: ["General", "Shared master data and settings"],
  INV: ["Inventory", "Items, warehouses, stock and movements"],
  SLS: ["Sales", "Customers, orders, invoices and returns"],
  PAY: ["Payroll", "Employees, payroll rules and payments"],
  POS: ["Point of Sale", "POS master data and operations"],
  AST: ["Fixed Assets", "Assets, depreciation and asset operations"],
  CNT: ["Contracts", "Contracts and related operations"],
  MSG: ["Messaging", "Messages and notifications"],
  SCD: ["Scheduling", "Schedules and plans"],
  WKO: ["Production", "Production formulas, orders and operations"]
};

let poolPromise;

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (url.pathname.startsWith("/api/")) {
      await handleApi(req, res, url);
      return;
    }
    serveStatic(req, res, url);
  } catch (error) {
    sendJson(res, 500, { error: "server_error", message: error.message });
  }
});

server.listen(port, bindHost, () => {
  console.log(`Sepidar SQL app: http://${bindHost}:${port}`);
  console.log(`SQL Server: ${sqlServer}:${sqlPort} / ${sqlDatabase}`);
});

async function handleApi(req, res, url) {
  if (req.method === "GET" && url.pathname === "/api/health") {
    if (!sql) {
      sendJson(res, 200, { ok: true, mode: "powershell" });
      return;
    }
    const pool = await getPool();
    await pool.request().query("SELECT 1 AS ok");
    sendJson(res, 200, { ok: true, mode: "mssql" });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/schema") {
    sendJson(res, 200, await getSchema());
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/rows") {
    const tableId = required(url.searchParams.get("table"), "table");
    const [schema, table] = splitTableId(tableId);
    sendJson(res, 200, await getRows({
      schema,
      table,
      page: Number(url.searchParams.get("page") || 1),
      pageSize: Number(url.searchParams.get("pageSize") || 100),
      search: url.searchParams.get("search") || "",
      sortField: url.searchParams.get("sortField") || "",
      sortDirection: url.searchParams.get("sortDirection") || "asc"
    }));
    return;
  }

  if (req.method === "PUT" && url.pathname === "/api/row") {
    const tableId = required(url.searchParams.get("table"), "table");
    const [schema, table] = splitTableId(tableId);
    const body = JSON.parse(await readBodyText(req));
    sendJson(res, 200, await updateRow(schema, table, body));
    return;
  }

  sendJson(res, 404, { error: "not_found" });
}

async function getSchema() {
  if (!sql) return runSqlApi(["-Action", "schema"]);
  const pool = await getPool();
  const tables = await pool.request().query(`
    SELECT
      t.TABLE_SCHEMA,
      t.TABLE_NAME,
      ISNULL(SUM(p.[rows]), 0) AS [RowCount]
    FROM INFORMATION_SCHEMA.TABLES t
    LEFT JOIN sys.tables st ON st.name = t.TABLE_NAME AND SCHEMA_NAME(st.schema_id) = t.TABLE_SCHEMA
    LEFT JOIN sys.partitions p ON p.object_id = st.object_id AND p.index_id IN (0, 1)
    WHERE t.TABLE_TYPE = 'BASE TABLE'
    GROUP BY t.TABLE_SCHEMA, t.TABLE_NAME
    ORDER BY
      CASE t.TABLE_SCHEMA WHEN 'ACC' THEN 0 WHEN 'RPA' THEN 1 ELSE 2 END,
      t.TABLE_SCHEMA,
      t.TABLE_NAME;
  `);
  const columns = await pool.request().query(columnSql());
  const columnsByTable = new Map();
  for (const column of columns.recordset) {
    const key = `${column.TABLE_SCHEMA}.${column.TABLE_NAME}`;
    if (!columnsByTable.has(key)) columnsByTable.set(key, []);
    columnsByTable.get(key).push(column);
  }

  const modules = new Map();
  for (const row of tables.recordset) {
    const schema = row.TABLE_SCHEMA;
    if (!modules.has(schema)) {
      const labels = moduleTitles[schema] || [schema, `SQL schema ${schema}`];
      modules.set(schema, {
        key: schema.toLowerCase(),
        schema,
        title: labels[0],
        subtitle: labels[1],
        tables: []
      });
    }
    const tableName = row.TABLE_NAME;
    modules.get(schema).tables.push({
      id: `${schema}.${tableName}`,
      schema,
      name: tableName,
      title: `${schema}.${tableName}`,
      rowCount: Number(row.RowCount || 0),
      fields: convertFields(columnsByTable.get(`${schema}.${tableName}`) || []),
      rows: []
    });
  }
  return [...modules.values()];
}

async function getRows({ schema, table, page, pageSize, search, sortField, sortDirection }) {
  if (!sql) {
    return runSqlApi([
      "-Action", "rows",
      "-Schema", schema,
      "-Table", table,
      "-Page", String(page || 1),
      "-PageSize", String(pageSize || 100),
      "-Search", search || "",
      "-SortField", sortField || "",
      "-SortDirection", sortDirection || "asc"
    ]);
  }
  await assertTable(schema, table);
  const columns = await getColumns(schema, table);
  const columnNames = columns.map((c) => c.COLUMN_NAME);
  const searchable = columns
    .filter((c) => !/binary|image|timestamp|rowversion|xml|geography|geometry|hierarchyid/i.test(c.DATA_TYPE))
    .map((c) => c.COLUMN_NAME);
  const primaryKey = columns.filter((c) => c.IsPrimaryKey).map((c) => c.COLUMN_NAME);
  const pageSafe = Math.max(1, page || 1);
  const pageSizeSafe = Math.min(500, Math.max(10, pageSize || 100));
  const offset = (pageSafe - 1) * pageSizeSafe;
  const sortColumn = columnNames.includes(sortField) ? sortField : columnNames[0];
  const direction = String(sortDirection).toLowerCase() === "desc" ? "DESC" : "ASC";
  const qualified = `${quoteName(schema)}.${quoteName(table)}`;
  const where = search && searchable.length
    ? `WHERE ${searchable.map((c) => `CONVERT(NVARCHAR(MAX), ${quoteName(c)}) LIKE @search`).join(" OR ")}`
    : "";

  const pool = await getPool();
  const countRequest = pool.request();
  if (where) countRequest.input("search", sql.NVarChar(4000), `%${search}%`);
  const count = await countRequest.query(`SELECT COUNT_BIG(1) AS total FROM ${qualified} ${where}`);

  const request = pool.request();
  if (where) request.input("search", sql.NVarChar(4000), `%${search}%`);
  request.input("offset", sql.Int, offset);
  request.input("pageSize", sql.Int, pageSizeSafe);
  const data = await request.query(`
    SELECT ${columnNames.map(quoteName).join(", ")}
    FROM ${qualified}
    ${where}
    ORDER BY ${quoteName(sortColumn)} ${direction}
    OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY;
  `);

  return {
    schema,
    table,
    page: pageSafe,
    pageSize: pageSizeSafe,
    total: Number(count.recordset[0].total || 0),
    fields: convertFields(columns),
    primaryKey,
    rows: data.recordset
  };
}

async function updateRow(schema, table, body) {
  if (!sql) {
    const bodyPath = path.join(os.tmpdir(), `sepidar-row-${Date.now()}-${Math.random().toString(16).slice(2)}.json`);
    fs.writeFileSync(bodyPath, JSON.stringify(body || {}), "utf8");
    try {
      return await runSqlApi(["-Action", "update", "-Schema", schema, "-Table", table, "-BodyPath", bodyPath]);
    } finally {
      fs.rmSync(bodyPath, { force: true });
    }
  }
  await assertTable(schema, table);
  const columns = await getColumns(schema, table);
  const columnNames = columns.map((c) => c.COLUMN_NAME);
  const pkColumns = columns.filter((c) => c.IsPrimaryKey).map((c) => c.COLUMN_NAME);
  if (!pkColumns.length) throw new Error(`Table ${schema}.${table} has no primary key; update is disabled.`);

  const values = body?.values || {};
  const keys = body?.keys || {};
  const setParts = [];
  const whereParts = [];
  const request = (await getPool()).request();

  let valueIndex = 0;
  for (const column of columnNames) {
    if (pkColumns.includes(column)) continue;
    if (!Object.prototype.hasOwnProperty.call(values, column)) continue;
    const param = `v${valueIndex++}`;
    setParts.push(`${quoteName(column)} = @${param}`);
    request.input(param, values[column] === undefined ? null : values[column]);
  }

  let keyIndex = 0;
  for (const column of pkColumns) {
    if (!Object.prototype.hasOwnProperty.call(keys, column)) throw new Error(`Missing key column ${column}.`);
    const param = `k${keyIndex++}`;
    whereParts.push(`${quoteName(column)} = @${param}`);
    request.input(param, keys[column]);
  }

  if (!setParts.length) throw new Error("No editable values supplied.");
  const result = await request.query(`
    UPDATE ${quoteName(schema)}.${quoteName(table)}
    SET ${setParts.join(", ")}
    WHERE ${whereParts.join(" AND ")};
  `);
  return { ok: true, affected: result.rowsAffected[0] || 0 };
}

async function getColumns(schema, table) {
  const pool = await getPool();
  const result = await pool.request()
    .input("schema", sql.NVarChar(128), schema)
    .input("table", sql.NVarChar(128), table)
    .query(`${columnSql()} WHERE c.TABLE_SCHEMA = @schema AND c.TABLE_NAME = @table ORDER BY c.ORDINAL_POSITION;`);
  return result.recordset;
}

async function assertTable(schema, table) {
  const pool = await getPool();
  const result = await pool.request()
    .input("schema", sql.NVarChar(128), schema)
    .input("table", sql.NVarChar(128), table)
    .query("SELECT COUNT(1) AS found FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE' AND TABLE_SCHEMA=@schema AND TABLE_NAME=@table");
  if (Number(result.recordset[0].found) !== 1) throw new Error(`Table not found: ${schema}.${table}`);
}

function columnSql() {
  return `
    SELECT
      c.TABLE_SCHEMA,
      c.TABLE_NAME,
      c.COLUMN_NAME,
      c.DATA_TYPE,
      c.IS_NULLABLE,
      c.ORDINAL_POSITION,
      CASE WHEN pk.COLUMN_NAME IS NULL THEN CAST(0 AS bit) ELSE CAST(1 AS bit) END AS IsPrimaryKey
    FROM INFORMATION_SCHEMA.COLUMNS c
    LEFT JOIN (
      SELECT ku.TABLE_SCHEMA, ku.TABLE_NAME, ku.COLUMN_NAME
      FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
      INNER JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE ku
        ON ku.CONSTRAINT_NAME = tc.CONSTRAINT_NAME
       AND ku.TABLE_SCHEMA = tc.TABLE_SCHEMA
       AND ku.TABLE_NAME = tc.TABLE_NAME
      WHERE tc.CONSTRAINT_TYPE = 'PRIMARY KEY'
    ) pk
      ON pk.TABLE_SCHEMA = c.TABLE_SCHEMA
     AND pk.TABLE_NAME = c.TABLE_NAME
     AND pk.COLUMN_NAME = c.COLUMN_NAME
  `;
}

function convertFields(columns) {
  return columns.map((row) => {
    const sqlType = row.DATA_TYPE;
    let type = "text";
    if (/int|decimal|numeric|money|float|real/i.test(sqlType)) type = "number";
    if (sqlType === "bit") type = "boolean";
    return {
      name: row.COLUMN_NAME,
      label: row.COLUMN_NAME,
      type,
      sqlType,
      required: row.IS_NULLABLE === "NO",
      primaryKey: Boolean(row.IsPrimaryKey)
    };
  });
}

function serveStatic(req, res, url) {
  let requestedPath = decodeURIComponent(url.pathname);
  if (requestedPath === "/") requestedPath = "/index.html";

  const filePath = path.normalize(path.join(root, requestedPath));
  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": contentTypes[path.extname(filePath)] || "application/octet-stream" });
    res.end(data);
  });
}

async function getPool() {
  if (!sql) throw new Error("The mssql package is not installed and PowerShell fallback is not available for this operation.");
  if (!poolPromise) {
    const config = {
      server: sqlServer,
      port: sqlPort,
      database: sqlDatabase,
      options: {
        encrypt: sqlEncrypt,
        trustServerCertificate: sqlTrustCert
      },
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
      }
    };
    if (sqlUser) {
      config.user = sqlUser;
      config.password = sqlPassword;
    }
    poolPromise = sql.connect(config);
  }
  return poolPromise;
}

function runSqlApi(extraArgs) {
  return new Promise((resolve, reject) => {
    const script = path.join(root, "scripts", "sql-api.ps1");
    const args = [
      "-ExecutionPolicy", "Bypass",
      "-File", script,
      "-ServerInstance", sqlServer,
      "-DatabaseName", sqlDatabase,
      ...extraArgs
    ];

    const child = spawn("powershell", args, { cwd: root, windowsHide: true });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (data) => {
      stdout += data.toString("utf8");
    });
    child.stderr.on("data", (data) => {
      stderr += data.toString("utf8");
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(stderr || stdout || `SQL API exited with code ${code}`));
        return;
      }
      try {
        resolve(JSON.parse(stripBom(stdout.trim())));
      } catch (error) {
        reject(new Error(`Invalid SQL API JSON: ${error.message}\n${stdout.slice(0, 1000)}`));
      }
    });
  });
}

function readBodyText(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("error", reject);
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8") || "{}"));
  });
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function stripBom(text) {
  return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
}

function required(value, name) {
  if (!value) throw new Error(`${name} is required`);
  return value;
}

function splitTableId(tableId) {
  const parts = tableId.split(".");
  if (parts.length !== 2 || !parts[0] || !parts[1]) throw new Error(`Invalid table id: ${tableId}`);
  return parts;
}

function quoteName(name) {
  return `[${String(name).replace(/]/g, "]]")}]`;
}
