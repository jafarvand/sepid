# Sepidar SQL Web UI

رابط وب فارسی برای مشاهده، جستجو، مرتب سازی، فیلتر و ویرایش داده های سیستم سپیدار روی SQL Server.

## وضعیت فعلی

- دیتابیس هدف: `Sepidar_Analysis_New`
- ماژول های حسابداری `ACC` و خزانه داری `RPA` در منو اولویت دارند.
- همه جدول های دیتابیس از SQL Server خوانده می شوند.
- جستجو، مرتب سازی و صفحه بندی سمت سرور انجام می شود.
- ویرایش ردیف برای جدول هایی که کلید اصلی دارند فعال است.
- افزودن و حذف رکورد فعلا غیرفعال است تا قوانین وابستگی جدول های سپیدار بدون بررسی دقیق شکسته نشود.

## اجرای محلی

```powershell
npm install
$env:SQL_SERVER="localhost"
$env:SQL_PORT="1433"
$env:SQL_DATABASE="Sepidar_Analysis_New"
$env:SQL_USER="sepidar_app"
$env:SQL_PASSWORD="YOUR_PASSWORD"
npm start
```

آدرس برنامه:

```text
http://127.0.0.1:5173
```

> نسخه Docker/Linux از Windows Integrated Authentication استفاده نمی کند. برای اجرا روی سرور لینوکس باید SQL Server از راه TCP/IP در دسترس باشد و یک SQL Login داشته باشید.

## Docker

فایل نمونه محیط:

```bash
cp env.example .env
```

مقادیر `.env` را تنظیم کنید:

```env
APP_PORT=5173
IMAGE_NAME=ghcr.io/OWNER/REPO:latest
SQL_SERVER=YOUR_SQL_SERVER_HOST_OR_IP
SQL_PORT=1433
SQL_DATABASE=Sepidar_Analysis_New
SQL_USER=sepidar_app
SQL_PASSWORD=CHANGE_ME
SQL_ENCRYPT=false
SQL_TRUST_CERT=true
```

ساخت و اجرا:

```bash
docker build -t sepidar-web:local .
IMAGE_NAME=sepidar-web:local docker compose up -d
```

## آماده سازی SQL Server

روی SQL Server باید این موارد فعال باشد:

- TCP/IP روی پورت `1433`
- دسترسی فایروال از سرور لینوکس به SQL Server
- SQL Server Authentication یا Mixed Mode
- یک کاربر SQL برای برنامه

نمونه حداقل دسترسی:

```sql
USE [master];
CREATE LOGIN [sepidar_app] WITH PASSWORD = 'CHANGE_STRONG_PASSWORD';

USE [Sepidar_Analysis_New];
CREATE USER [sepidar_app] FOR LOGIN [sepidar_app];
ALTER ROLE db_datareader ADD MEMBER [sepidar_app];
ALTER ROLE db_datawriter ADD MEMBER [sepidar_app];
```

برای محیط واقعی بهتر است به جای `db_datawriter`، دسترسی نوشتن محدودتر و جدول به جدول تعریف شود.

## CI/CD روی GitHub

Workflow در مسیر زیر اضافه شده است:

```text
.github/workflows/deploy.yml
```

این workflow با push روی branch `main`:

1. ایمیج Docker را در GitHub Container Registry می سازد و push می کند.
2. از طریق SSH به سرور لینوکس وصل می شود.
3. فایل `docker-compose.yml` را روی سرور کپی می کند.
4. فایل `.env` را از secret ها می سازد.
5. ایمیج جدید را pull و سرویس را restart می کند.

## GitHub Secrets مورد نیاز

در مسیر `Settings > Secrets and variables > Actions` این secret ها را تعریف کنید:

```text
SSH_HOST              IP یا دامنه سرور لینوکس
SSH_USER              کاربر SSH، مثلا root یا deploy
SSH_PRIVATE_KEY       کلید خصوصی SSH
SSH_PORT              اختیاری، پیش فرض 22
DEPLOY_PATH           مثلا /opt/sepidar-web
SQL_SERVER            IP یا hostname سرور SQL Server
SQL_USER              کاربر SQL Server
SQL_PASSWORD          رمز SQL Server
```

متغیرهای اختیاری GitHub Actions:

```text
APP_PORT              پیش فرض 5173
SQL_PORT              پیش فرض 1433
SQL_DATABASE          پیش فرض Sepidar_Analysis_New
SQL_ENCRYPT           پیش فرض false
SQL_TRUST_CERT        پیش فرض true
```

## آماده سازی سرور لینوکس

روی سرور لینوکس Docker و Compose plugin باید نصب باشد:

```bash
docker --version
docker compose version
```

مسیر deploy را بسازید:

```bash
sudo mkdir -p /opt/sepidar-web
sudo chown "$USER":"$USER" /opt/sepidar-web
```

اگر پورت برنامه عمومی است، فایروال را باز کنید:

```bash
sudo ufw allow 5173/tcp
```

برای production بهتر است برنامه پشت Nginx و HTTPS قرار بگیرد.
