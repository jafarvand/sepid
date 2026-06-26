# Implemented Pages and Persian Equivalents

This file lists the currently registered frontend pages from `app.js` and their Persian equivalents.

Note:
- `PTY` currently exists only as a subsystem menu label and does not yet have dedicated page mappings in the registry.
- The entries below are grouped by subsystem.

## ACC

| SQL Table | Persian Equivalent |
|---|---|
| `Account` | سرفصل حساب ها |
| `AccountGroup` | گروه حساب ها |
| `AccountSL` | حساب های معین |
| `DetailAccount` | حساب های تفصیلی |
| `CostCenter` | مراکز هزینه |
| `Ledger` | دفتر حسابداری |
| `Journal` | دفتر روزنامه |
| `CashFlow` | جریان نقدی |
| `TrialBalance` | تراز آزمایشی |
| `ProfitLoss` | سود و زیان |
| `AccountTurnover` | گردش حساب ها |
| `CostCenterTurnover` | گردش هزینه ها به تفکیک مرکز هزینه |
| `AccountTopic` | ارتباط حساب و سرفصل مالیاتی |
| `DL` | تفصیلی ها |
| `Topic` | سرفصل های مالیاتی |
| `Voucher` | اسناد حسابداری |
| `VoucherItem` | آرتیکل های سند |
| `GLVoucher` | اسناد دفتر کل |
| `GLVoucherItem` | آیتم های دفتر کل |
| `MergedVoucherReferenceNumber` | شماره عطف اسناد تجمیعی |
| `OpeningOperation` | عملیات افتتاحیه |
| `OpeningOperationItem` | آیتم های افتتاحیه |

## RPA

| SQL Table | Persian Equivalent |
|---|---|
| `AccountType` | نوع حساب خزانه |
| `Bank` | بانک ها |
| `BankBranch` | شعب بانک |
| `BankAccount` | حساب های بانکی |
| `Cash` | صندوق ها |
| `PettyCash` | تنخواه گردان ها |
| `Pos` | دستگاه های کارت خوان |
| `ChequeBook` | دسته چک ها |
| `DocSpecification` | مشخصات اسناد خزانه |
| `CashFlow` | وجوه نقد |
| `LiquidityReport` | گزارش نقدینگی |
| `PayableCommitment` | تعهدات پرداختنی |
| `ReceivableCommitment` | تعهدات دریافتنی |
| `ChequeOperation` | عملیات چک |
| `ChequeStatus` | وضعیت چک |
| `BankAccountBalance` | مانده حساب بانکی |
| `CashBalance` | مانده صندوق |
| `PosBalance` | مانده کارت خوان |
| `BankBill` | صورتحساب بانکی |
| `BankBillItem` | آیتم های صورتحساب بانکی |
| `PettyCashBill` | صورت هزینه تنخواه |
| `PettyCashBillItem` | آیتم های صورت هزینه تنخواه |
| `ReceiptHeader` | دریافت ها |
| `ReceiptCheque` | چک های دریافتی |
| `ReceiptChequeBanking` | واگذاری چک دریافتی |
| `ReceiptChequeBankingItem` | آیتم های واگذاری چک دریافتی |
| `ReceiptChequeHistory` | سوابق چک دریافتی |
| `ReceiptDraft` | حواله های دریافت |
| `ReceiptPettyCash` | دریافت تنخواه |
| `ReceiptPos` | دریافت کارت خوان |
| `PaymentHeader` | پرداخت ها |
| `PaymentCheque` | چک های پرداختی |
| `PaymentChequeBanking` | عملیات بانکی چک پرداختی |
| `PaymentChequeBankingItem` | آیتم های عملیات بانکی چک پرداختی |
| `PaymentChequeHistory` | سوابق چک پرداختی |
| `PaymentChequeOther` | سایر عملیات چک پرداختی |
| `PaymentDraft` | حواله های پرداخت |
| `PartySettlement` | تسویه طرف حساب |
| `PartySettlementItem` | آیتم های تسویه طرف حساب |
| `PartyAccountSettlement` | تسویه حساب طرف حساب |
| `PartyAccountSettlementItem` | آیتم های تسویه حساب طرف حساب |
| `PosSettlement` | تسویه کارت خوان |
| `PosSettlementReceipt` | رسیدهای تسویه کارت خوان |
| `Reconciliation` | مغایرت گیری بانکی |
| `ReconciliationBankItem` | اقلام بانک در مغایرت گیری |
| `ReconciliationItem` | اقلام سیستم در مغایرت گیری |
| `RefundCheque` | استرداد چک |
| `RefundChequeItem` | آیتم های استرداد چک |

## INV

| SQL Table | Persian Equivalent |
|---|---|
| `Item` | کالاها و خدمات |
| `ItemCategory` | گروه بندی کالاها |
| `ItemUnit` | واحدهای سنجش کالا |
| `Unit` | واحدهای سنجش |
| `Warehouse` | انبارها |
| `WarehouseKeeper` | انباردارها |
| `Stock` | موجودی کالا |
| `ItemStock` | موجودی کالا در انبار |
| `ItemBalance` | مانده کالا |
| `InventoryVoucher` | اسناد ورود و خروج انبار |
| `InventoryVoucherItem` | اقلام سند انبار |
| `InventoryReceipt` | رسید انبار |
| `InventoryReceiptItem` | اقلام رسید انبار |
| `InventoryDelivery` | حواله انبار |
| `InventoryDeliveryItem` | اقلام حواله انبار |
| `Receipt` | رسید انبار |
| `ReceiptItem` | اقلام رسید انبار |
| `Delivery` | حواله انبار |
| `DeliveryItem` | اقلام حواله انبار |
| `Transfer` | انتقال بین انبارها |
| `TransferItem` | اقلام انتقال بین انبارها |
| `Adjustment` | اصلاح موجودی |
| `AdjustmentItem` | اقلام اصلاح موجودی |
| `Pricing` | قیمت گذاری اسناد انبار |
| `PricingItem` | اقلام قیمت گذاری |
| `StockTaking` | انبارگردانی |
| `StockTakingItem` | اقلام انبارگردانی |
| `Tracking` | ردیابی کالا |
| `ItemTracking` | ردیابی کالاها |
| `Scale` | باسکول ها |
| `Weighing` | توزین |
| `WeighingItem` | اقلام توزین |
| `ItemPrice` | قیمت کالا |
| `ItemImage` | تصاویر کالا |

## SLS

| SQL Table | Persian Equivalent |
|---|---|
| `Customer` | مشتریان |
| `CustomerGroup` | گروه مشتریان |
| `SalesArea` | مناطق فروش |
| `SalesOffice` | مراکز فروش |
| `SalesType` | انواع فروش |
| `SalesPerson` | فروشندگان |
| `Marketer` | بازاریاب ها |
| `Visitor` | ویزیتورها |
| `PriceList` | فهرست قیمت |
| `PriceListItem` | اقلام فهرست قیمت |
| `Discount` | تخفیف ها |
| `DiscountItem` | اقلام تخفیف |
| `Quotation` | پیش فاکتورها |
| `QuotationItem` | اقلام پیش فاکتور |
| `Order` | سفارش های فروش |
| `OrderItem` | اقلام سفارش فروش |
| `Invoice` | فاکتورهای فروش |
| `InvoiceItem` | اقلام فاکتور فروش |
| `ReturnedInvoice` | برگشت از فروش |
| `ReturnedInvoiceItem` | اقلام برگشت از فروش |
| `ReturnInvoice` | برگشت فروش |
| `ReturnInvoiceItem` | اقلام برگشت فروش |
| `CommissionCalculation` | محاسبات پورسانت |
| `CommissionCalculationItem` | اقلام محاسبه پورسانت |
| `SalesReport` | گزارش فروش |
| `CustomerBalance` | مانده مشتریان |

## PAY

| SQL Table | Persian Equivalent |
|---|---|
| `Employee` | پرسنل |
| `Personnel` | پرسنل |
| `EmploymentType` | انواع استخدام |
| `EmploymentContract` | قراردادهای استخدام |
| `SalaryRule` | احکام کارگزینی |
| `SalaryItem` | عوامل حقوق و دستمزد |
| `Benefit` | مزایا |
| `Deduction` | کسور |
| `Insurance` | بیمه |
| `Tax` | مالیات حقوق |
| `WorkTime` | کارکرد پرسنل |
| `WorkTimeItem` | اقلام کارکرد |
| `Leave` | مرخصی ها |
| `Mission` | ماموریت ها |
| `Payroll` | محاسبه حقوق |
| `PayrollItem` | اقلام محاسبه حقوق |
| `PaySlip` | فیش حقوقی |
| `Payment` | پرداخت حقوق |
| `Loan` | وام پرسنل |
| `LoanItem` | اقساط وام |

## AST

| SQL Table | Persian Equivalent |
|---|---|
| `Asset` | دارایی ها |
| `AssetGroup` | گروه های دارایی |
| `AssetLocation` | محل های استقرار دارایی |
| `DepreciationMethod` | روش های استهلاک |
| `AssetAcquisition` | تحصیل دارایی |
| `Acquisition` | تحصیل دارایی |
| `Depreciation` | محاسبه استهلاک |
| `DepreciationItem` | اقلام استهلاک |
| `AssetTransfer` | انتقال دارایی |
| `Transfer` | انتقال دارایی |
| `AssetRepair` | تعمیرات دارایی |
| `Repair` | تعمیرات دارایی |
| `AssetDisposal` | خروج دارایی |
| `Disposal` | خروج دارایی |
| `AssetSale` | فروش دارایی |
| `Revaluation` | تجدید ارزیابی دارایی |

## CNT

| SQL Table | Persian Equivalent |
|---|---|
| `Contract` | قراردادها |
| `ContractType` | انواع قرارداد |
| `Project` | پروژه ها |
| `ContractParty` | طرف های قرارداد |
| `Tender` | مناقصه ها |
| `Agreement` | موافقت نامه ها |
| `Guarantee` | ضمانت نامه ها |
| `ProgressStatement` | صورت وضعیت ها |
| `ProgressStatementItem` | اقلام صورت وضعیت |
| `Adjustment` | تعدیل قرارداد |
| `AdjustmentItem` | اقلام تعدیل |
| `ContractReceipt` | دریافت های قرارداد |
| `ContractPayment` | پرداخت های قرارداد |
| `ContractSettlement` | تسویه قرارداد |

## WKO

| SQL Table | Persian Equivalent |
|---|---|
| `Formula` | فرمول های ساخت |
| `FormulaItem` | اقلام فرمول ساخت |
| `BOM` | فرمول مواد |
| `BOMItem` | اقلام فرمول مواد |
| `Routing` | مسیرهای تولید |
| `RoutingItem` | مراحل مسیر تولید |
| `ProductionStage` | مراحل تولید |
| `WorkOrder` | دستور کار تولید |
| `WorkOrderItem` | اقلام دستور کار تولید |
| `ProductionOrder` | سفارش های تولید |
| `ProductionOrderItem` | اقلام سفارش تولید |
| `MaterialIssue` | خروج مواد اولیه |
| `MaterialIssueItem` | اقلام خروج مواد اولیه |
| `ProductReceipt` | ورود محصول تولید شده |
| `ProductReceiptItem` | اقلام ورود محصول تولید شده |
| `ProductionCost` | قیمت تمام شده تولید |
| `ProductionCostItem` | اقلام قیمت تمام شده تولید |

## POS

| SQL Table | Persian Equivalent |
|---|---|
| `Store` | فروشگاه ها |
| `StoreBranch` | شعب فروشگاه |
| `Cashier` | صندوق دارها |
| `CashRegister` | صندوق های فروش |
| `Terminal` | پایانه های فروش |
| `Barcode` | بارکد کالاها |
| `Shift` | شیفت های فروشگاهی |
| `Receipt` | رسیدهای فروشگاهی |
| `ReceiptItem` | اقلام رسید فروشگاهی |
| `Invoice` | فاکتورهای فروشگاهی |
| `InvoiceItem` | اقلام فاکتور فروشگاهی |
| `ReturnInvoice` | برگشت فروشگاهی |
| `ReturnInvoiceItem` | اقلام برگشت فروشگاهی |
| `DailySale` | فروش روزانه |
| `CashierSettlement` | تسویه صندوق دار |

## GNR

| SQL Table | Persian Equivalent |
|---|---|
| `Currency` | ارزها |
| `ExchangeRate` | نرخ ارز |
| `Party` | طرف حساب ها |
| `PartyGroup` | گروه طرف حساب ها |
| `Contact` | اطلاعات تماس |
| `Address` | نشانی ها |
| `Country` | کشورها |
| `Province` | استان ها |
| `City` | شهرها |
| `Location` | مناطق و محل ها |
| `Unit` | واحدهای سنجش |
| `FiscalPeriod` | دوره های مالی |
| `DebitCreditNote` | اعلامیه بدهکار/بستانکار |
| `DebitCreditNoteItem` | آیتم های اعلامیه بدهکار/بستانکار |

## FMK

| SQL Table | Persian Equivalent |
|---|---|
| `FiscalYear` | سال مالی |
| `Company` | شرکت ها |
| `Branch` | شعب |
| `User` | کاربران |
| `Role` | نقش ها |
| `Permission` | دسترسی ها |
| `AccessGroup` | گروه های دسترسی |
| `UserRole` | نقش های کاربر |
| `RolePermission` | دسترسی های نقش |
| `Setting` | تنظیمات سیستم |
| `Numbering` | شماره گذاری اسناد |
| `AuditLog` | سوابق تغییرات |
| `Log` | رخدادهای سیستم |

## MSG

| SQL Table | Persian Equivalent |
|---|---|
| `Message` | پیام ها |
| `Notification` | اعلان ها |
| `Sms` | پیامک ها |
| `SMS` | پیامک ها |
| `Email` | ایمیل ها |
| `Template` | قالب های پیام |
| `MessageTemplate` | قالب های پیام |
| `Inbox` | صندوق ورودی |
| `Outbox` | صندوق خروجی |
| `Queue` | صف ارسال |
| `Delivery` | وضعیت تحویل پیام |

## SCD

| SQL Table | Persian Equivalent |
|---|---|
| `Calendar` | تقویم کاری |
| `Schedule` | برنامه های زمان بندی |
| `Task` | وظایف زمان بندی |
| `Job` | کارهای زمان بندی |
| `Reminder` | یادآورها |
| `RunHistory` | سوابق اجرا |
| `ExecutionLog` | گزارش اجرای زمان بندی |
| `Frequency` | تناوب اجرا |
