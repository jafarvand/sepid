# SQL Server restore/import scripts

The `.bak` file must be restored by SQL Server before the web app can import real table rows.

## 1. Restore backup

Run this on a machine that has SQL Server and `sqlcmd`:

```powershell
.\scripts\restore-backup.ps1 `
  -ServerInstance ".\SQLEXPRESS" `
  -BackupPath "D:\ai\sepidAI\Backup_sepidAI01_Ver5.2.5_980806_1657.bak" `
  -DatabaseName "sepidAI_Analysis"
```

If SQL Server uses custom data/log folders, pass `-DataPath` and `-LogPath`.

## 2. Import master data into the web app database

```powershell
.\scripts\import-master-data.ps1 `
  -ServerInstance ".\SQLEXPRESS" `
  -DatabaseName "sepidAI_Analysis" `
  -OutputPath ".\data\master-data-db.json"
```

The web app reads and writes `data/master-data-db.json`.



