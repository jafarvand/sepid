param(
  [Parameter(Mandatory = $true)]
  [string]$ServerInstance,

  [Parameter(Mandatory = $true)]
  [string]$DatabaseName,

  [Parameter(Mandatory = $true)]
  [string]$OutputPath,

  [string]$Username = "",

  [string]$Password = ""
)

$ErrorActionPreference = "Stop"

function New-Connection {
  if ($Username) {
    $cs = "Server=$ServerInstance;Database=$DatabaseName;User ID=$Username;Password=$Password;TrustServerCertificate=True;"
  } else {
    $cs = "Server=$ServerInstance;Database=$DatabaseName;Integrated Security=True;TrustServerCertificate=True;"
  }
  $conn = New-Object System.Data.SqlClient.SqlConnection $cs
  $conn.Open()
  return $conn
}

function Invoke-DataTable {
  param(
    [System.Data.SqlClient.SqlConnection]$Connection,
    [string]$Sql
  )
  $cmd = $Connection.CreateCommand()
  $cmd.CommandText = $Sql
  $cmd.CommandTimeout = 300
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

function Convert-TableRows {
  param([System.Data.DataTable]$Table)
  $rows = New-Object 'System.Collections.Generic.List[object]'
  for ($ri = 0; $ri -lt $Table.Rows.Count; $ri++) {
    $dr = $Table.Rows.Item($ri)
    $obj = [ordered]@{ __id = [guid]::NewGuid().ToString("N") }
    for ($ci = 0; $ci -lt $Table.Columns.Count; $ci++) {
      $col = $Table.Columns[$ci]
      $obj[$col.ColumnName] = Convert-Value $dr.Item($col.ColumnName)
    }
    $rows.Add([pscustomobject]$obj)
  }
  Write-Output -NoEnumerate $rows
}

function Convert-Fields {
  param([System.Data.DataTable]$Columns)
  $fields = New-Object 'System.Collections.Generic.List[object]'
  for ($ci = 0; $ci -lt $Columns.Rows.Count; $ci++) {
    $col = $Columns.Rows.Item($ci)
    $type = "text"
    $sqlType = [string]$col.Item("DATA_TYPE")
    if ($sqlType -match "int|decimal|numeric|money|float|real") { $type = "number" }
    if ($sqlType -eq "bit") { $type = "boolean" }

    $fields.Add([pscustomobject]@{
      name = [string]$col.Item("COLUMN_NAME")
      label = [string]$col.Item("COLUMN_NAME")
      type = $type
      required = ([string]$col.Item("IS_NULLABLE") -eq "NO")
      sqlType = $sqlType
    })
  }
  Write-Output -NoEnumerate $fields
}

function Get-SchemaTitle {
  param([string]$Schema)
  switch ($Schema.ToUpperInvariant()) {
    "FMK" { return "Framework" }
    "GNR" { return "General" }
    "ACC" { return "Accounting" }
    "INV" { return "Inventory" }
    "SLS" { return "Sales" }
    "RPA" { return "Receipt and Payment" }
    "POS" { return "Point of Sale" }
    "AST" { return "Fixed Assets" }
    "CNT" { return "Contracts" }
    "PAY" { return "Payroll" }
    "MSG" { return "Messaging" }
    "SCD" { return "Scheduling" }
    "WKO" { return "Production" }
    default { return $Schema }
  }
}

$conn = New-Connection
try {
  $tables = Invoke-DataTable $conn @"
SELECT TABLE_SCHEMA, TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_TYPE = 'BASE TABLE'
ORDER BY TABLE_SCHEMA, TABLE_NAME;
"@

  $catalog = New-Object 'System.Collections.Generic.List[object]'
  $schemas = $tables.Rows | Group-Object TABLE_SCHEMA

  foreach ($schemaGroup in $schemas) {
    $schema = [string]$schemaGroup.Name
    $moduleTables = New-Object 'System.Collections.Generic.List[object]'

    foreach ($tableRow in $schemaGroup.Group) {
      $name = [string]$tableRow.Item("TABLE_NAME")
      $fullName = "$schema.$name"

      $columns = Invoke-DataTable $conn @"
SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, ORDINAL_POSITION
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = N'$schema' AND TABLE_NAME = N'$name'
ORDER BY ORDINAL_POSITION;
"@

      if ($columns.Rows.Count -eq 0) { continue }

      $quotedColumns = New-Object 'System.Collections.Generic.List[string]'
      for ($ci = 0; $ci -lt $columns.Rows.Count; $ci++) {
        $col = $columns.Rows.Item($ci)
        $quotedColumns.Add(("[" + [string]$col.Item("COLUMN_NAME") + "]"))
      }

      if ($quotedColumns.Count -eq 0) {
        Write-Host "Skipped $schema.$name because no columns were readable"
        continue
      }

      $selectList = $quotedColumns -join ", "
      $rowsTable = Invoke-DataTable $conn "SELECT $selectList FROM [$schema].[$name];"

      $moduleTables.Add([pscustomobject]@{
        id = $fullName
        title = $fullName
        description = "Imported from SQL Server table $fullName"
        fields = Convert-Fields $columns
        rows = Convert-TableRows $rowsTable
      })

      Write-Host ("Imported {0}: {1} rows" -f $fullName, $rowsTable.Rows.Count)
    }

    $catalog.Add([pscustomobject]@{
      key = $schema.ToLowerInvariant()
      title = Get-SchemaTitle $schema
      subtitle = "SQL schema $schema"
      tables = $moduleTables
    })
  }

  $dir = Split-Path -Parent $OutputPath
  if ($dir -and -not (Test-Path -LiteralPath $dir)) {
    New-Item -ItemType Directory -Path $dir | Out-Null
  }

  $json = $catalog | ConvertTo-Json -Depth 30
  $utf8NoBom = New-Object System.Text.UTF8Encoding $false
  [System.IO.File]::WriteAllText((Resolve-Path -LiteralPath $OutputPath).Path, $json, $utf8NoBom)
  Write-Host "Imported full SQL Server data to $OutputPath"
}
finally {
  $conn.Close()
}
