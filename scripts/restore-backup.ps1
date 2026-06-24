param(
  [Parameter(Mandatory = $true)]
  [string]$ServerInstance,

  [Parameter(Mandatory = $true)]
  [string]$BackupPath,

  [string]$DatabaseName = "Sepidar_Analysis",

  [string]$DataPath = "",

  [string]$LogPath = ""
)

$ErrorActionPreference = "Stop"

if (-not (Get-Command sqlcmd -ErrorAction SilentlyContinue)) {
  throw "sqlcmd was not found. Install SQL Server command line tools or run this script on the SQL Server host."
}

if (-not (Test-Path -LiteralPath $BackupPath)) {
  throw "Backup file not found: $BackupPath"
}

$fileListQuery = "SET NOCOUNT ON; RESTORE FILELISTONLY FROM DISK = N'$($BackupPath.Replace("'","''"))';"
$fileList = sqlcmd -S $ServerInstance -E -W -s "|" -Q $fileListQuery

$rows = $fileList | Where-Object { $_ -match "\|" -and $_ -notmatch "^LogicalName" -and $_ -notmatch "^-+$" }
if ($rows.Count -lt 2) {
  throw "Could not read logical file names from backup."
}

$dataLogical = ($rows | Where-Object { $_ -match "\|D\|" } | Select-Object -First 1).Split("|")[0].Trim()
$logLogical = ($rows | Where-Object { $_ -match "\|L\|" } | Select-Object -First 1).Split("|")[0].Trim()

if (-not $DataPath) {
  $DataPath = "C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA"
}
if (-not $LogPath) {
  $LogPath = $DataPath
}

$mdf = Join-Path $DataPath "$DatabaseName.mdf"
$ldf = Join-Path $LogPath "$($DatabaseName)_log.ldf"

$restoreSql = @"
IF DB_ID(N'$DatabaseName') IS NOT NULL
BEGIN
  ALTER DATABASE [$DatabaseName] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
  DROP DATABASE [$DatabaseName];
END;

RESTORE DATABASE [$DatabaseName]
FROM DISK = N'$($BackupPath.Replace("'","''"))'
WITH MOVE N'$($dataLogical.Replace("'","''"))' TO N'$($mdf.Replace("'","''"))',
     MOVE N'$($logLogical.Replace("'","''"))' TO N'$($ldf.Replace("'","''"))',
     RECOVERY,
     REPLACE;
"@

sqlcmd -S $ServerInstance -E -Q $restoreSql
Write-Host "Restored $DatabaseName on $ServerInstance"
