# sepidAI SQL Web UI

رابط وب فارسی برای مشاهده، جستجو، مرتب سازی، فیلتر و ویرایش داده های سیستم sepidAI روی SQL Server.

## وضعیت فعلی

- دیتابیس هدف: `sepidAI_Analysis_New`
- ماژول های حسابداری `ACC` و خزانه داری `RPA` در منو اولویت دارند.
- همه جدول های دیتابیس از SQL Server خوانده می شوند.
- جستجو، مرتب سازی و صفحه بندی سمت سرور انجام می شود.
- ویرایش ردیف برای جدول هایی که کلید اصلی دارند فعال است.
- افزودن و حذف رکورد فعلا غیرفعال است تا قوانین وابستگی جدول های sepidAI بدون بررسی دقیق شکسته نشود.

## قواعد توسعه رابط کاربری

- همه تاریخ ها باید برای کاربر به صورت شمسی/جلالی نمایش داده شوند.
- فیلدهای پولی و مبلغی باید با جداکننده هزارگان نمایش داده شوند.
- فیلدهای فنی مثل `Id`، کلیدهای اصلی، `Ref`، نسخه، ایجادکننده و تاریخ های سیستمی نباید در جدول و فرم کاربر نمایش داده شوند.
- منوی سیستم باید قابلیت جمع شدن به سمت راست و بازگشت داشته باشد.
- نام جدول ها و ستون های قابل مشاهده باید فارسی و کسب و کاری باشند؛ نام SQL فقط در tooltip یا برای توسعه استفاده شود.

## اجرای محلی

```powershell
npm install
$env:SQL_SERVER="localhost"
$env:SQL_PORT="1433"
$env:SQL_DATABASE="sepidAI_Analysis_New"
$env:SQL_USER="sepidAI_app"
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
SQL_DATABASE=sepidAI_Analysis_New
SQL_USER=sepidAI_app
SQL_PASSWORD=CHANGE_ME
SQL_ENCRYPT=false
SQL_TRUST_CERT=true
```

ساخت و اجرا:

```bash
docker build -t sepidAI-web:local .
IMAGE_NAME=sepidAI-web:local docker compose up -d
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
CREATE LOGIN [sepidAI_app] WITH PASSWORD = 'CHANGE_STRONG_PASSWORD';

USE [sepidAI_Analysis_New];
CREATE USER [sepidAI_app] FOR LOGIN [sepidAI_app];
ALTER ROLE db_datareader ADD MEMBER [sepidAI_app];
ALTER ROLE db_datawriter ADD MEMBER [sepidAI_app];
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
DEPLOY_PATH           مثلا /opt/sepidAI-web
SQL_SERVER            IP یا hostname سرور SQL Server
SQL_USER              کاربر SQL Server
SQL_PASSWORD          رمز SQL Server
```

متغیرهای اختیاری GitHub Actions:

```text
APP_PORT              پیش فرض 5173
SQL_PORT              پیش فرض 1433
SQL_DATABASE          پیش فرض sepidAI_Analysis_New
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
sudo mkdir -p /opt/sepidAI-web
sudo chown "$USER":"$USER" /opt/sepidAI-web
```

اگر پورت برنامه عمومی است، فایروال را باز کنید:

```bash
sudo ufw allow 5173/tcp
```

برای production بهتر است برنامه پشت Nginx و HTTPS قرار بگیرد.



