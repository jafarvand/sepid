param(
  [Parameter(Mandatory = $true)]
  [ValidateSet("schema", "rows", "update")]
  [string]$Action,

  [string]$ServerInstance = ".\SQLEXPRESS",
  [string]$DatabaseName = "Sepidar_Analysis_New",
  [string]$Schema = "",
  [string]$Table = "",
  [int]$Page = 1,
  [int]$PageSize = 100,
  [string]$Search = "",
  [string]$SortField = "",
  [string]$SortDirection = "asc",
  [string]$BodyPath = ""
)

$ErrorActionPreference = "Stop"

function New-Connection {
  $cs = "Server=$ServerInstance;Database=$DatabaseName;Integrated Security=True;TrustServerCertificate=True;"
  $conn = New-Object System.Data.SqlClient.SqlConnection $cs
  $conn.Open()
  return $conn
}

function New-Command {
  param([System.Data.SqlClient.SqlConnection]$Connection, [string]$Sql)
  $cmd = $Connection.CreateCommand()
  $cmd.CommandText = $Sql
  $cmd.CommandTimeout = 300
  return $cmd
}

function Invoke-DataTable {
  param([System.Data.SqlClient.SqlConnection]$Connection, [string]$Sql)
  $cmd = New-Command $Connection $Sql
  $adapter = New-Object System.Data.SqlClient.SqlDataAdapter $cmd
  $table = New-Object System.Data.DataTable
  [void]$adapter.Fill($table)
  Write-Output -NoEnumerate $table
}

function Convert-Value {
  param($Value)
  if ($Value -is [DBNull]) { return $null }
  if ($Value -is [byte[]]) { return [Convert]::ToBase64String($Value) }
  if ($Value -is [datetime]) { return $Value.ToString("yyyy-MM-ddTHH:mm:ss") }
  if ($Value -is [guid]) { return $Value.ToString() }
  return $Value
}

function Convert-DataRows {
  param([System.Data.DataTable]$Data)
  $rows = New-Object 'System.Collections.Generic.List[object]'
  for ($ri = 0; $ri -lt $Data.Rows.Count; $ri++) {
    $dr = $Data.Rows.Item($ri)
    $obj = [ordered]@{}
    for ($ci = 0; $ci -lt $Data.Columns.Count; $ci++) {
      $col = $Data.Columns.Item($ci)
      $obj[$col.ColumnName] = Convert-Value $dr.Item($col.ColumnName)
    }
    $rows.Add([pscustomobject]$obj)
  }
  Write-Output -NoEnumerate $rows
}

function Write-Json {
  param($Value)
  $json = $Value | ConvertTo-Json -Depth 30 -Compress
  $utf8NoBom = New-Object System.Text.UTF8Encoding $false
  [Console]::OutputEncoding = $utf8NoBom
  [Console]::WriteLine($json)
}

function Quote-Name {
  param([string]$Name)
  return "[" + $Name.Replace("]", "]]") + "]"
}

function Get-SchemaTitle {
  param([string]$SchemaName)
  switch ($SchemaName.ToUpperInvariant()) {
    "ACC" { return "Accounting" }
    "RPA" { return "Treasury" }
    "FMK" { return "Framework" }
    "GNR" { return "General" }
    "INV" { return "Inventory" }
    "SLS" { return "Sales" }
    "PAY" { return "Payroll" }
    "POS" { return "Point of Sale" }
    "AST" { return "Fixed Assets" }
    "CNT" { return "Contracts" }
    "MSG" { return "Messaging" }
    "SCD" { return "Scheduling" }
    "WKO" { return "Production" }
    default { return $SchemaName }
  }
}

function Get-SchemaSubtitle {
  param([string]$SchemaName)
  switch ($SchemaName.ToUpperInvariant()) {
    "ACC" { return "Accounts, detail ledgers, vouchers, voucher items" }
    "RPA" { return "Cash, bank, cheques, receipts, payments, settlements" }
    default { return "SQL schema $SchemaName" }
  }
}

function Get-Columns {
  param([System.Data.SqlClient.SqlConnection]$Connection, [string]$SchemaName, [string]$TableName)
  Invoke-DataTable $Connection @"
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
WHERE c.TABLE_SCHEMA = N'$SchemaName' AND c.TABLE_NAME = N'$TableName'
ORDER BY c.ORDINAL_POSITION;
"@
}

function Get-AllColumns {
  param([System.Data.SqlClient.SqlConnection]$Connection)
  Invoke-DataTable $Connection @"
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
ORDER BY c.TABLE_SCHEMA, c.TABLE_NAME, c.ORDINAL_POSITION;
"@
}

function Convert-Fields {
  param($Columns)
  if ($Columns -is [System.Data.DataTable]) {
    $sourceRows = $Columns.Rows
  } elseif ($null -eq $Columns) {
    $sourceRows = @()
  } else {
    $sourceRows = $Columns
  }
  $fields = New-Object 'System.Collections.Generic.List[object]'
  for ($i = 0; $i -lt $sourceRows.Count; $i++) {
    $row = $sourceRows[$i]
    $sqlType = [string]$row.Item("DATA_TYPE")
    $type = "text"
    if ($sqlType -match "int|decimal|numeric|money|float|real") { $type = "number" }
    if ($sqlType -eq "bit") { $type = "boolean" }
    $fields.Add([pscustomobject]@{
      name = [string]$row.Item("COLUMN_NAME")
      label = [string]$row.Item("COLUMN_NAME")
      type = $type
      sqlType = $sqlType
      required = ([string]$row.Item("IS_NULLABLE") -eq "NO")
      primaryKey = [bool]$row.Item("IsPrimaryKey")
    })
  }
  Write-Output -NoEnumerate $fields
}

function Assert-Table {
  param([System.Data.SqlClient.SqlConnection]$Connection, [string]$SchemaName, [string]$TableName)
  $cmd = New-Command $Connection "SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE' AND TABLE_SCHEMA=@schema AND TABLE_NAME=@table"
  [void]$cmd.Parameters.Add("@schema", [System.Data.SqlDbType]::NVarChar, 128)
  [void]$cmd.Parameters.Add("@table", [System.Data.SqlDbType]::NVarChar, 128)
  $cmd.Parameters["@schema"].Value = $SchemaName
  $cmd.Parameters["@table"].Value = $TableName
  if ([int]$cmd.ExecuteScalar() -ne 1) {
    throw "Table not found: $SchemaName.$TableName"
  }
}

$conn = New-Connection
try {
  if ($Action -eq "schema") {
    $tables = Invoke-DataTable $conn @"
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
"@
    $modules = New-Object 'System.Collections.Generic.List[object]'
    $allColumns = Get-AllColumns $conn
    $columnsByTable = @{}
    foreach ($columnRow in $allColumns.Rows) {
      $key = ([string]$columnRow.Item("TABLE_SCHEMA")) + "." + ([string]$columnRow.Item("TABLE_NAME"))
      if (-not $columnsByTable.ContainsKey($key)) {
        $columnsByTable[$key] = New-Object 'System.Collections.Generic.List[object]'
      }
      $columnsByTable[$key].Add($columnRow)
    }
    $groups = $tables.Rows | Group-Object TABLE_SCHEMA
    foreach ($group in $groups) {
      $schemaName = [string]$group.Name
      $moduleTables = New-Object 'System.Collections.Generic.List[object]'
      foreach ($tableRow in $group.Group) {
        $tableName = [string]$tableRow.Item("TABLE_NAME")
        $columns = $columnsByTable["$schemaName.$tableName"]
        $moduleTables.Add([pscustomobject]@{
          id = "$schemaName.$tableName"
          schema = $schemaName
          name = $tableName
          title = "$schemaName.$tableName"
          rowCount = [int64]$tableRow.Item("RowCount")
          fields = Convert-Fields $columns
          rows = @()
        })
      }
      $modules.Add([pscustomobject]@{
        key = $schemaName.ToLowerInvariant()
        schema = $schemaName
        title = Get-SchemaTitle $schemaName
        subtitle = Get-SchemaSubtitle $schemaName
        tables = $moduleTables
      })
    }
    Write-Json $modules
    return
  }

  if (-not $Schema -or -not $Table) { throw "Schema and Table are required." }
  Assert-Table $conn $Schema $Table
  $columns = Get-Columns $conn $Schema $Table
  $columnNames = @()
  $searchable = @()
  $pkColumns = @()
  for ($i = 0; $i -lt $columns.Rows.Count; $i++) {
    $row = $columns.Rows.Item($i)
    $colName = [string]$row.Item("COLUMN_NAME")
    $sqlType = [string]$row.Item("DATA_TYPE")
    $columnNames += $colName
    if ([bool]$row.Item("IsPrimaryKey")) { $pkColumns += $colName }
    if ($sqlType -notmatch "binary|image|timestamp|rowversion|xml|geography|geometry|hierarchyid") {
      $searchable += $colName
    }
  }

  if ($Action -eq "rows") {
    $pageSafe = [Math]::Max(1, $Page)
    $pageSizeSafe = [Math]::Min(500, [Math]::Max(10, $PageSize))
    $offset = ($pageSafe - 1) * $pageSizeSafe
    $selectList = ($columnNames | ForEach-Object { Quote-Name $_ }) -join ", "
    $where = ""
    if ($Search -and $searchable.Count -gt 0) {
      $clauses = $searchable | ForEach-Object { "CONVERT(NVARCHAR(MAX), $(Quote-Name $_)) LIKE @search" }
      $where = "WHERE " + ($clauses -join " OR ")
    }

    $sortColumn = $columnNames[0]
    if ($SortField -and $columnNames -contains $SortField) { $sortColumn = $SortField }
    $direction = if ($SortDirection.ToLowerInvariant() -eq "desc") { "DESC" } else { "ASC" }
    $qualified = (Quote-Name $Schema) + "." + (Quote-Name $Table)

    $countCmd = New-Command $conn "SELECT COUNT_BIG(1) FROM $qualified $where"
    if ($where) {
      [void]$countCmd.Parameters.Add("@search", [System.Data.SqlDbType]::NVarChar, 4000)
      $countCmd.Parameters["@search"].Value = "%" + $Search + "%"
    }
    $total = [int64]$countCmd.ExecuteScalar()

    $cmd = New-Command $conn "SELECT $selectList FROM $qualified $where ORDER BY $(Quote-Name $sortColumn) $direction OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY"
    if ($where) {
      [void]$cmd.Parameters.Add("@search", [System.Data.SqlDbType]::NVarChar, 4000)
      $cmd.Parameters["@search"].Value = "%" + $Search + "%"
    }
    [void]$cmd.Parameters.Add("@offset", [System.Data.SqlDbType]::Int)
    [void]$cmd.Parameters.Add("@pageSize", [System.Data.SqlDbType]::Int)
    $cmd.Parameters["@offset"].Value = $offset
    $cmd.Parameters["@pageSize"].Value = $pageSizeSafe
    $adapter = New-Object System.Data.SqlClient.SqlDataAdapter $cmd
    $data = New-Object System.Data.DataTable
    [void]$adapter.Fill($data)

    Write-Json ([pscustomobject]@{
      schema = $Schema
      table = $Table
      page = $pageSafe
      pageSize = $pageSizeSafe
      total = $total
      fields = Convert-Fields $columns
      primaryKey = $pkColumns
      rows = Convert-DataRows $data
    })
    return
  }

  if ($Action -eq "update") {
    if (-not $BodyPath -or -not (Test-Path -LiteralPath $BodyPath)) { throw "BodyPath is required for update." }
    $body = Get-Content -LiteralPath $BodyPath -Raw | ConvertFrom-Json
    if ($pkColumns.Count -eq 0) { throw "Table $Schema.$Table has no primary key; update is disabled." }

    $setParts = New-Object 'System.Collections.Generic.List[string]'
    $whereParts = New-Object 'System.Collections.Generic.List[string]'
    $cmd = New-Command $conn ""

    foreach ($col in $columnNames) {
      if ($pkColumns -contains $col) { continue }
      if ($body.values.PSObject.Properties.Name -contains $col) {
        $paramName = "@v_" + $setParts.Count
        $setParts.Add((Quote-Name $col) + " = " + $paramName)
        $prop = $body.values.PSObject.Properties[$col]
        [void]$cmd.Parameters.AddWithValue($paramName, $(if ($null -eq $prop.Value) { [DBNull]::Value } else { $prop.Value }))
      }
    }

    foreach ($pk in $pkColumns) {
      if (-not ($body.keys.PSObject.Properties.Name -contains $pk)) { throw "Missing key column $pk." }
      $paramName = "@k_" + $whereParts.Count
      $whereParts.Add((Quote-Name $pk) + " = " + $paramName)
      $prop = $body.keys.PSObject.Properties[$pk]
      [void]$cmd.Parameters.AddWithValue($paramName, $(if ($null -eq $prop.Value) { [DBNull]::Value } else { $prop.Value }))
    }

    if ($setParts.Count -eq 0) { throw "No editable values supplied." }
    $qualified = (Quote-Name $Schema) + "." + (Quote-Name $Table)
    $cmd.CommandText = "UPDATE $qualified SET " + ($setParts -join ", ") + " WHERE " + ($whereParts -join " AND ")
    $affected = $cmd.ExecuteNonQuery()
    Write-Json ([pscustomobject]@{ ok = $true; affected = $affected })
    return
  }
}
finally {
  $conn.Close()
}
