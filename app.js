(function () {
  const fullscreenKey = "sepidAI-grid-fullscreen-v1";
  const menuCollapsedKey = "sepidAI-menu-collapsed-v1";
  const moneyFormatter = new Intl.NumberFormat("fa-IR", {
    maximumFractionDigits: 4
  });
  const moduleLabels = {
    acc: ["سیستم حسابداری", "سرفصل حساب ها، حساب های تفصیلی، اسناد حسابداری، گردش حساب ها و گزارش سود و زیان"],
    rpa: ["سیستم دریافت و پرداخت", "وجوه نقد، بانک، صندوق، چک، نقدینگی، دریافت و پرداخت و تعهدات دریافتنی و پرداختنی"],
    inv: ["سیستم انبارداری", "کالا، انبار، موجودی، ورود و خروج کالا، ردیابی و توزین"],
    sls: ["سیستم مشتریان و فروش", "مشتریان، پیش فاکتور، سفارش، فاکتور فروش، برگشت فروش، تخفیف و پورسانت"],
    pty: ["اشخاص", "طرف حساب ها و اطلاعات پایه اشخاص"],
    gnr: ["سیستم عمومی", "اطلاعات پایه مشترک، اشخاص، ارز، مناطق، نشانی، تماس، واحدها و اعلامیه ها"],
    fmk: ["چارچوب و امنیت سیستم", "شرکت، شعبه، سال مالی، کاربران، نقش ها، دسترسی ها، تنظیمات و شماره گذاری"],
    pay: ["سیستم حقوق و دستمزد", "پرسنل، احکام، کارکرد، مرخصی، ماموریت، مالیات، بیمه و پرداخت حقوق"],
    ast: ["سیستم دارایی ثابت", "دارایی ها، گروه دارایی، محل استقرار، تحصیل، استهلاک، انتقال و خروج دارایی"],
    cnt: ["سیستم پیمانکاری و قراردادها", "قرارداد، پروژه، ضمانت نامه، صورت وضعیت، تعدیل، دریافت و پرداخت پیمان"],
    msg: ["سیستم مدیریت پیام", "پیامک، اعلان، قالب پیام، صندوق ورودی و خروجی، صف ارسال و وضعیت تحویل"],
    scd: ["زمان بندی", "برنامه ها و زمان بندی عملیات"],
    wko: ["سیستم تولید", "فرمول ساخت، مواد اولیه، سفارش تولید، مراحل تولید، ورود محصول و قیمت تمام شده"],
    pos: ["سیستم فروشگاهی", "فروشگاه، شعبه، صندوق فروش، صندوق دار، شیفت، رسید فروش، بارکد و عملیات فروشگاهی"]
  };
  const moduleIcons = {
    acc: "ledger",
    rpa: "wallet",
    inv: "boxes",
    sls: "invoice",
    pty: "users",
    gnr: "settings",
    fmk: "shield",
    pay: "payroll",
    ast: "asset",
    cnt: "contract",
    msg: "message",
    scd: "calendar",
    wko: "factory",
    pos: "pos"
  };
  const icons = {
    menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    fullscreen: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4H4v4M16 4h4v4M8 20H4v-4M20 16v4h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    minimize: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4v5H4M15 4v5h5M9 20v-5H4M20 15h-5v5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    export: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 19h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    save: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h12l2 2v12H5zM8 5v6h8M8 19v-5h8v5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
    clear: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    prev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 6-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    next: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    ledger: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h12v16H6zM9 8h6M9 12h6M9 16h4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    wallet: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h15v12H4zM4 7l3-3h12v3M16 13h3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    boxes: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h7v7H4zM13 9h7v7h-7zM8.5 5h7v4h-7z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
    invoice: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h10v16l-2-1-2 1-2-1-2 1-2-1zM9 8h6M9 12h6M9 16h4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    users: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7 1a2.5 2.5 0 1 0 0-5M4 20a5 5 0 0 1 10 0M14 18a4 4 0 0 1 6 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    settings: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-5v3m0 12v3M4.2 6.2l2.1 2.1m11.4 7.4 2.1 2.1M3 12h3m12 0h3M4.2 17.8l2.1-2.1m11.4-7.4 2.1-2.1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
    payroll: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16v10H4zM7 10h4M7 14h2M15 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    asset: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 20V8l7-4 7 4v12M8 20v-7h8v7M9 10h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
    contract: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h8l3 3v13H7zM14 4v4h4M9 12h6M9 16h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    message: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6h14v10H9l-4 4zM8 10h8M8 13h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14v15H5zM8 3v4M16 3v4M5 10h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    factory: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V9l5 4V9l5 4V5h6v15zM7 17h2M12 17h2M17 17h2" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
    pos: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h10v16H7zM9 8h6M9 12h6M10 16h4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };
  const columnLabels = {
    Id: "شناسه",
    Code: "کد",
    Number: "شماره",
    Title: "عنوان",
    Title_En: "عنوان انگلیسی",
    Name: "نام",
    Type: "نوع",
    State: "وضعیت",
    Status: "وضعیت",
    Date: "تاریخ",
    Description: "شرح",
    Description_En: "شرح انگلیسی",
    IsActive: "فعال",
    Version: "نسخه",
    Creator: "ایجاد کننده",
    CreationDate: "تاریخ ایجاد",
    LastModifier: "آخرین ویرایشگر",
    LastModificationDate: "تاریخ آخرین ویرایش",
    FiscalYearRef: "سال مالی",
    CompanyId: "شناسه شرکت",
    CompanyRef: "شرکت",
    CompanyCode: "کد شرکت",
    CompanyTitle: "عنوان شرکت",
    BranchId: "شناسه شعبه",
    BranchRef: "شعبه",
    BranchCode: "کد شعبه",
    BranchTitle: "عنوان شعبه",
    UserId: "شناسه کاربر",
    UserRef: "کاربر",
    UserName: "نام کاربری",
    RoleId: "شناسه نقش",
    RoleRef: "نقش",
    RoleTitle: "عنوان نقش",
    PermissionId: "شناسه دسترسی",
    PermissionRef: "دسترسی",
    AccessGroupId: "شناسه گروه دسترسی",
    AccessGroupRef: "گروه دسترسی",
    SettingId: "شناسه تنظیمات",
    SettingKey: "کلید تنظیمات",
    SettingValue: "مقدار تنظیمات",
    NumberingRef: "شماره گذاری",
    NumberingId: "شناسه شماره گذاری",
    AccountGroupRef: "گروه حساب",
    AccountCode: "کد حساب",
    AccountTitle: "عنوان حساب",
    SLRef: "حساب معین",
    SLId: "شناسه حساب معین",
    DLCode: "کد تفصیلی",
    DLTitle: "عنوان تفصیلی",
    DetailAccountRef: "حساب تفصیلی",
    CostCenterId: "شناسه مرکز هزینه",
    CostCenterCode: "کد مرکز هزینه",
    CostCenterTitle: "عنوان مرکز هزینه",
    LedgerRef: "دفتر حسابداری",
    LedgerId: "شناسه دفتر حسابداری",
    JournalRef: "دفتر روزنامه",
    JournalId: "شناسه دفتر روزنامه",
    VoucherDate: "تاریخ سند",
    VoucherNumber: "شماره سند",
    VoucherState: "وضعیت سند",
    CashFlowRef: "جریان نقدی",
    CashFlowId: "شناسه جریان نقدی",
    FiscalPeriodRef: "دوره مالی",
    FiscalPeriodId: "شناسه دوره مالی",
    PayableAmount: "تعهد پرداختنی",
    ReceivableAmount: "تعهد دریافتنی",
    ReceiptNumber: "شماره دریافت",
    PaymentNumber: "شماره پرداخت",
    ReceiptDate: "تاریخ دریافت",
    PaymentDate: "تاریخ پرداخت",
    CashRef: "صندوق",
    CashId: "شناسه صندوق",
    PettyCashRef: "تنخواه گردان",
    PettyCashId: "شناسه تنخواه گردان",
    PosRef: "کارت خوان",
    PosId: "شناسه کارت خوان",
    StoreId: "شناسه فروشگاه",
    StoreRef: "فروشگاه",
    StoreCode: "کد فروشگاه",
    StoreTitle: "عنوان فروشگاه",
    StoreBranchId: "شناسه شعبه فروشگاه",
    StoreBranchRef: "شعبه فروشگاه",
    CashierId: "شناسه صندوق دار",
    CashierRef: "صندوق دار",
    CashRegisterId: "شناسه صندوق فروش",
    CashRegisterRef: "صندوق فروش",
    ShiftId: "شناسه شیفت",
    ShiftRef: "شیفت",
    TerminalId: "شناسه پایانه فروش",
    TerminalRef: "پایانه فروش",
    Barcode: "بارکد",
    POSReceiptId: "شناسه رسید فروشگاهی",
    POSReceiptRef: "رسید فروشگاهی",
    POSInvoiceId: "شناسه فاکتور فروشگاهی",
    POSInvoiceRef: "فاکتور فروشگاهی",
    ChequeBookRef: "دسته چک",
    ChequeBookId: "شناسه دسته چک",
    ChequeDate: "تاریخ چک",
    DueDate: "تاریخ سررسید",
    BankBillRef: "صورت حساب بانکی",
    BankBillId: "شناسه صورت حساب بانکی",
    ReconciliationRef: "مغایرت گیری بانکی",
    ReconciliationId: "شناسه مغایرت گیری بانکی",
    LiquidityAmount: "مبلغ نقدینگی",
    AccountId: "شناسه حساب",
    AccountRef: "حساب",
    AccountSLRef: "حساب معین",
    ParentAccountRef: "حساب والد",
    DLId: "شناسه تفصیلی",
    DLRef: "تفصیلی",
    DlRef: "تفصیلی",
    VoucherId: "شناسه سند",
    VoucherRef: "سند",
    VoucherItemId: "شناسه آرتیکل",
    RowNumber: "شماره ردیف",
    ReferenceNumber: "شماره عطف",
    SecondaryNumber: "شماره فرعی",
    DailyNumber: "شماره روزانه",
    Debit: "بدهکار",
    Credit: "بستانکار",
    Balance: "مانده",
    BalanceType: "نوع مانده",
    OpeningBalance: "مانده ابتدای دوره",
    CurrencyRef: "ارز",
    CurrencyRate: "نرخ ارز",
    CurrencyDebit: "بدهکار ارزی",
    CurrencyCredit: "بستانکار ارزی",
    TrackingNumber: "شماره پیگیری",
    TrackingDate: "تاریخ پیگیری",
    IssuerSystem: "سیستم صادرکننده",
    IssuerEntityName: "نام موجودیت صادرکننده",
    IssuerEntityRef: "مرجع موجودیت صادرکننده",
    BankId: "شناسه بانک",
    BankRef: "بانک",
    BankBranchRef: "شعبه بانک",
    BankAccountId: "شناسه حساب بانکی",
    BankAccountRef: "حساب بانکی",
    AccountNo: "شماره حساب",
    ChequeNo: "شماره چک",
    Amount: "مبلغ",
    Price: "قیمت",
    Quantity: "تعداد",
    Rate: "نرخ",
    PartyRef: "طرف حساب",
    CustomerPartyRef: "مشتری",
    CustomerId: "شناسه مشتری",
    CustomerRef: "مشتری",
    CustomerCode: "کد مشتری",
    CustomerTitle: "عنوان مشتری",
    CustomerGroupRef: "گروه مشتری",
    SalesAreaRef: "منطقه فروش",
    SalesAreaId: "شناسه منطقه فروش",
    SalesOfficeRef: "مرکز فروش",
    SalesOfficeId: "شناسه مرکز فروش",
    SalesTypeRef: "نوع فروش",
    SalesTypeId: "شناسه نوع فروش",
    SalesPersonRef: "فروشنده",
    SalesPersonId: "شناسه فروشنده",
    MarketerRef: "بازاریاب",
    MarketerId: "شناسه بازاریاب",
    VisitorRef: "ویزیتور",
    VisitorId: "شناسه ویزیتور",
    QuotationRef: "پیش فاکتور",
    QuotationId: "شناسه پیش فاکتور",
    QuotationItemId: "شناسه قلم پیش فاکتور",
    OrderRef: "سفارش فروش",
    OrderId: "شناسه سفارش فروش",
    OrderItemId: "شناسه قلم سفارش فروش",
    SupplierPartyRef: "تامین کننده",
    ItemRef: "کالا/خدمت",
    ItemId: "شناسه کالا/خدمت",
    ItemID: "شناسه کالا/خدمت",
    ItemCode: "کد کالا",
    ItemTitle: "عنوان کالا",
    ItemType: "نوع کالا",
    ItemCategoryRef: "گروه کالا",
    ItemUnitRef: "واحد کالا",
    WarehouseId: "شناسه انبار",
    WarehouseRef: "انبار",
    WarehouseTitle: "عنوان انبار",
    InventoryRef: "انبار",
    InventoryVoucherId: "شناسه سند انبار",
    InventoryVoucherRef: "سند انبار",
    InventoryVoucherItemId: "شناسه قلم سند انبار",
    VoucherType: "نوع سند",
    StockRef: "موجودی",
    StockId: "شناسه موجودی",
    StockTakingRef: "انبارگردانی",
    StockTakingId: "شناسه انبارگردانی",
    StockTakingItemId: "شناسه قلم انبارگردانی",
    MainUnitRef: "واحد اصلی",
    SubUnitRef: "واحد فرعی",
    MajorUnitRef: "واحد اصلی",
    MinorUnitRef: "واحد فرعی",
    UnitId: "شناسه واحد",
    UnitTitle: "عنوان واحد",
    UnitName: "نام واحد",
    Quantity2: "مقدار دوم",
    MainQuantity: "مقدار اصلی",
    SubQuantity: "مقدار فرعی",
    RemainingQuantity: "مقدار باقیمانده",
    InputQuantity: "مقدار ورود",
    OutputQuantity: "مقدار خروج",
    ReceiptQuantity: "مقدار رسید",
    DeliveryQuantity: "مقدار حواله",
    TrackingRef: "ردیابی",
    TrackingId: "شناسه ردیابی",
    TrackingTitle: "عنوان ردیابی",
    BatchNumber: "بچ نامبر",
    FormulaId: "شناسه فرمول ساخت",
    FormulaRef: "فرمول ساخت",
    FormulaCode: "کد فرمول ساخت",
    FormulaTitle: "عنوان فرمول ساخت",
    BOMRef: "فرمول مواد",
    BOMId: "شناسه فرمول مواد",
    WorkOrderRef: "دستور کار تولید",
    WorkOrderId: "شناسه دستور کار تولید",
    ProductionOrderRef: "سفارش تولید",
    ProductionOrderId: "شناسه سفارش تولید",
    ProductionStageRef: "مرحله تولید",
    ProductionStageId: "شناسه مرحله تولید",
    RoutingRef: "مسیر تولید",
    RoutingId: "شناسه مسیر تولید",
    MaterialRef: "مواد اولیه",
    MaterialId: "شناسه مواد اولیه",
    MaterialIssueRef: "خروج مواد",
    MaterialIssueId: "شناسه خروج مواد",
    ProductReceiptRef: "ورود محصول",
    ProductReceiptId: "شناسه ورود محصول",
    ProductionCost: "قیمت تمام شده تولید",
    WastageQuantity: "ضایعات",
    ScrapQuantity: "ضایعات",
    SerialNumber: "سری ساخت",
    ExpirationDate: "تاریخ انقضا",
    ScaleRef: "باسکول",
    ScaleId: "شناسه باسکول",
    GrossWeight: "وزن پر",
    TareWeight: "وزن خالی",
    NetWeight: "وزن خالص",
    WasteWeight: "افت",
    DriverName: "نام راننده",
    VehicleNo: "شماره خودرو",
    CarNo: "شماره خودرو",
    ProductRef: "محصول",
    UnitRef: "واحد",
    CostCenterRef: "مرکز هزینه"
    ,
    FiscalYearId: "شناسه سال مالی",
    StartDate: "تاریخ شروع",
    EndDate: "تاریخ پایان",
    CurrencyId: "شناسه ارز",
    PrecisionCount: "تعداد اعشار",
    ExchangeRate: "نرخ تبدیل",
    PartyId: "شناسه طرف حساب",
    EmployeeId: "شناسه پرسنل",
    EmployeeRef: "پرسنل",
    EmployeeCode: "کد پرسنلی",
    EmployeeNumber: "شماره پرسنلی",
    PersonnelRef: "پرسنل",
    PersonnelId: "شناسه پرسنل",
    PersonnelCode: "کد پرسنلی",
    EmploymentTypeRef: "نوع استخدام",
    EmploymentContractRef: "قرارداد استخدام",
    EmploymentContractId: "شناسه قرارداد استخدام",
    ContractId: "شناسه قرارداد",
    ContractRef: "قرارداد",
    ContractCode: "کد قرارداد",
    ContractTitle: "عنوان قرارداد",
    ContractTypeRef: "نوع قرارداد",
    ContractPartyRef: "طرف قرارداد",
    ProjectId: "شناسه پروژه",
    ProjectRef: "پروژه",
    ProjectCode: "کد پروژه",
    ProjectTitle: "عنوان پروژه",
    TenderRef: "مناقصه",
    TenderId: "شناسه مناقصه",
    AgreementRef: "موافقت نامه",
    AgreementId: "شناسه موافقت نامه",
    GuaranteeRef: "ضمانت نامه",
    GuaranteeId: "شناسه ضمانت نامه",
    ProgressStatementRef: "صورت وضعیت",
    ProgressStatementId: "شناسه صورت وضعیت",
    AdjustmentRef: "تعدیل",
    AdjustmentId: "شناسه تعدیل",
    ContractSettlementRef: "تسویه قرارداد",
    ContractSettlementId: "شناسه تسویه قرارداد",
    PayrollRef: "محاسبه حقوق",
    PayrollId: "شناسه محاسبه حقوق",
    PayrollItemId: "شناسه قلم حقوق",
    SalaryRef: "حقوق",
    SalaryId: "شناسه حقوق",
    SalaryItemId: "شناسه قلم حقوق",
    SalaryRuleRef: "حکم کارگزینی",
    SalaryRuleId: "شناسه حکم کارگزینی",
    SalaryBase: "حقوق پایه",
    Wage: "دستمزد",
    WageAmount: "مبلغ دستمزد",
    WorkTime: "کارکرد",
    WorkDay: "روز کارکرد",
    WorkHour: "ساعت کارکرد",
    OvertimeHour: "ساعت اضافه کار",
    OvertimeAmount: "مبلغ اضافه کار",
    LeaveRef: "مرخصی",
    LeaveId: "شناسه مرخصی",
    MissionRef: "ماموریت",
    MissionId: "شناسه ماموریت",
    BenefitAmount: "مزایا",
    DeductionAmount: "کسور",
    InsuranceAmount: "بیمه",
    TaxAmount: "مالیات",
    NetPay: "خالص پرداختنی",
    PaySlipRef: "فیش حقوقی",
    PaySlipId: "شناسه فیش حقوقی",
    LoanRef: "وام",
    LoanId: "شناسه وام",
    FirstName: "نام",
    LastName: "نام خانوادگی",
    FullName: "نام کامل",
    NationalId: "شناسه ملی",
    EconomicCode: "کد اقتصادی",
    Phone: "تلفن",
    Mobile: "موبایل",
    Email: "ایمیل",
    MessageId: "شناسه پیام",
    MessageRef: "پیام",
    MessageTitle: "عنوان پیام",
    MessageText: "متن پیام",
    NotificationId: "شناسه اعلان",
    NotificationRef: "اعلان",
    SmsId: "شناسه پیامک",
    SmsRef: "پیامک",
    SMSId: "شناسه پیامک",
    SMSRef: "پیامک",
    TemplateId: "شناسه قالب پیام",
    TemplateRef: "قالب پیام",
    QueueId: "شناسه صف ارسال",
    QueueRef: "صف ارسال",
    DeliveryStatus: "وضعیت تحویل",
    SendDate: "تاریخ ارسال",
    Sender: "فرستنده",
    Receiver: "گیرنده",
    Fax: "نمابر",
    PostalCode: "کد پستی",
    Address: "نشانی",
    AddressRef: "نشانی",
    AddressId: "شناسه نشانی",
    ContactRef: "اطلاعات تماس",
    ContactId: "شناسه اطلاعات تماس",
    CountryRef: "کشور",
    CountryId: "شناسه کشور",
    ProvinceRef: "استان",
    ProvinceId: "شناسه استان",
    CityRef: "شهر",
    CityId: "شناسه شهر",
    LocationId: "شناسه محل",
    ParentLocationRef: "محل والد",
    ExchangeRateDate: "تاریخ نرخ ارز",
    BaseCurrencyRef: "ارز پایه",
    DebitCreditNoteRef: "اعلامیه بدهکار/بستانکار",
    DebitCreditNoteNumber: "شماره اعلامیه",
    DebitCreditNoteDate: "تاریخ اعلامیه",
    AssetId: "شناسه دارایی",
    AssetRef: "دارایی",
    AssetCode: "کد دارایی",
    AssetTitle: "عنوان دارایی",
    AssetGroupRef: "گروه دارایی",
    AssetGroupId: "شناسه گروه دارایی",
    AssetLocationRef: "محل استقرار دارایی",
    AssetLocationId: "شناسه محل استقرار دارایی",
    PlaqueNumber: "شماره پلاک",
    AcquisitionDate: "تاریخ تحصیل",
    AcquisitionAmount: "بهای تمام شده",
    DepreciationMethodRef: "روش استهلاک",
    DepreciationMethodId: "شناسه روش استهلاک",
    DepreciationRate: "نرخ استهلاک",
    DepreciationAmount: "مبلغ استهلاک",
    AccumulatedDepreciation: "استهلاک انباشته",
    BookValue: "ارزش دفتری",
    SalvageValue: "ارزش اسقاط",
    UsefulLife: "عمر مفید",
    DisposalDate: "تاریخ خروج",
    DisposalAmount: "مبلغ خروج",
    RevaluationAmount: "مبلغ تجدید ارزیابی",
    DebitCreditNoteId: "شناسه اعلامیه",
    DebitCreditNoteItemId: "شناسه آیتم اعلامیه",
    InvoiceId: "شناسه فاکتور",
    InvoiceRef: "فاکتور",
    InvoiceItemId: "شناسه آیتم فاکتور",
    InvoiceNumber: "شماره فاکتور",
    InvoiceDate: "تاریخ فاکتور",
    ReturnedInvoiceRef: "برگشت فروش",
    ReturnedInvoiceId: "شناسه برگشت فروش",
    ReturnedInvoiceItemId: "شناسه قلم برگشت فروش",
    ReturnInvoiceRef: "برگشت فروش",
    ReturnInvoiceId: "شناسه برگشت فروش",
    ReturnInvoiceItemId: "شناسه قلم برگشت فروش",
    PriceListRef: "فهرست قیمت",
    PriceListId: "شناسه فهرست قیمت",
    PriceListItemId: "شناسه قلم فهرست قیمت",
    DiscountRef: "تخفیف",
    DiscountId: "شناسه تخفیف",
    DiscountItemId: "شناسه قلم تخفیف",
    DiscountPercent: "درصد تخفیف",
    Addition: "اضافات",
    AdditionAmount: "مبلغ اضافات",
    NetAmount: "مبلغ خالص",
    CommissionCalculationId: "شناسه محاسبه پورسانت",
    CommissionCalculationRef: "محاسبه پورسانت",
    CommissionCalculationItemId: "شناسه آیتم محاسبه پورسانت",
    NetPrice: "مبلغ خالص",
    Discount: "تخفیف",
    Tax: "مالیات",
    Duty: "عوارض",
    TotalAmount: "مبلغ کل"
  };
  const tableLabels = {
    "ACC.Account": ["سرفصل حساب ها", "اطلاعات پایه"],
    "ACC.AccountGroup": ["گروه حساب ها", "اطلاعات پایه"],
    "ACC.AccountSL": ["حساب های معین", "اطلاعات پایه"],
    "ACC.DetailAccount": ["حساب های تفصیلی", "اطلاعات پایه"],
    "ACC.CostCenter": ["مراکز هزینه", "اطلاعات پایه"],
    "ACC.Ledger": ["دفتر حسابداری", "اطلاعات پایه"],
    "ACC.Journal": ["دفتر روزنامه", "عملیات"],
    "ACC.CashFlow": ["جریان نقدی", "اطلاعات پایه"],
    "ACC.TrialBalance": ["تراز آزمایشی", "عملیات"],
    "ACC.ProfitLoss": ["سود و زیان", "عملیات"],
    "ACC.AccountTurnover": ["گردش حساب ها", "عملیات"],
    "ACC.CostCenterTurnover": ["گردش هزینه ها به تفکیک مرکز هزینه", "عملیات"],
    "ACC.AccountTopic": ["ارتباط حساب و سرفصل مالیاتی", "اطلاعات پایه"],
    "ACC.DL": ["تفصیلی ها", "اطلاعات پایه"],
    "ACC.Topic": ["سرفصل های مالیاتی", "اطلاعات پایه"],
    "ACC.Voucher": ["اسناد حسابداری", "عملیات"],
    "ACC.VoucherItem": ["آرتیکل های سند", "عملیات"],
    "ACC.GLVoucher": ["اسناد دفتر کل", "عملیات"],
    "ACC.GLVoucherItem": ["آیتم های دفتر کل", "عملیات"],
    "ACC.MergedVoucherReferenceNumber": ["شماره عطف اسناد تجمیعی", "عملیات"],
    "ACC.OpeningOperation": ["عملیات افتتاحیه", "عملیات"],
    "ACC.OpeningOperationItem": ["آیتم های افتتاحیه", "عملیات"],
    "RPA.AccountType": ["نوع حساب خزانه", "اطلاعات پایه"],
    "RPA.Bank": ["بانک ها", "اطلاعات پایه"],
    "RPA.BankBranch": ["شعب بانک", "اطلاعات پایه"],
    "RPA.BankAccount": ["حساب های بانکی", "اطلاعات پایه"],
    "RPA.Cash": ["صندوق ها", "اطلاعات پایه"],
    "RPA.PettyCash": ["تنخواه گردان ها", "اطلاعات پایه"],
    "RPA.Pos": ["دستگاه های کارت خوان", "اطلاعات پایه"],
    "RPA.ChequeBook": ["دسته چک ها", "اطلاعات پایه"],
    "RPA.DocSpecification": ["مشخصات اسناد خزانه", "اطلاعات پایه"],
    "RPA.CashFlow": ["وجوه نقد", "عملیات"],
    "RPA.LiquidityReport": ["گزارش نقدینگی", "عملیات"],
    "RPA.PayableCommitment": ["تعهدات پرداختنی", "عملیات"],
    "RPA.ReceivableCommitment": ["تعهدات دریافتنی", "عملیات"],
    "RPA.ChequeOperation": ["عملیات چک", "عملیات"],
    "RPA.ChequeStatus": ["وضعیت چک", "عملیات"],
    "RPA.BankAccountBalance": ["مانده حساب بانکی", "عملیات"],
    "RPA.CashBalance": ["مانده صندوق", "عملیات"],
    "RPA.PosBalance": ["مانده کارت خوان", "عملیات"],
    "RPA.BankBill": ["صورتحساب بانکی", "عملیات"],
    "RPA.BankBillItem": ["آیتم های صورتحساب بانکی", "عملیات"],
    "RPA.PettyCashBill": ["صورت هزینه تنخواه", "عملیات"],
    "RPA.PettyCashBillItem": ["آیتم های صورت هزینه تنخواه", "عملیات"],
    "RPA.ReceiptHeader": ["دریافت ها", "عملیات"],
    "RPA.ReceiptCheque": ["چک های دریافتی", "عملیات"],
    "RPA.ReceiptChequeBanking": ["واگذاری چک دریافتی", "عملیات"],
    "RPA.ReceiptChequeBankingItem": ["آیتم های واگذاری چک دریافتی", "عملیات"],
    "RPA.ReceiptChequeHistory": ["سوابق چک دریافتی", "عملیات"],
    "RPA.ReceiptDraft": ["حواله های دریافت", "عملیات"],
    "RPA.ReceiptPettyCash": ["دریافت تنخواه", "عملیات"],
    "RPA.ReceiptPos": ["دریافت کارت خوان", "عملیات"],
    "RPA.PaymentHeader": ["پرداخت ها", "عملیات"],
    "RPA.PaymentCheque": ["چک های پرداختی", "عملیات"],
    "RPA.PaymentChequeBanking": ["عملیات بانکی چک پرداختی", "عملیات"],
    "RPA.PaymentChequeBankingItem": ["آیتم های عملیات بانکی چک پرداختی", "عملیات"],
    "RPA.PaymentChequeHistory": ["سوابق چک پرداختی", "عملیات"],
    "RPA.PaymentChequeOther": ["سایر عملیات چک پرداختی", "عملیات"],
    "RPA.PaymentDraft": ["حواله های پرداخت", "عملیات"],
    "RPA.PartySettlement": ["تسویه طرف حساب", "عملیات"],
    "RPA.PartySettlementItem": ["آیتم های تسویه طرف حساب", "عملیات"],
    "RPA.PartyAccountSettlement": ["تسویه حساب طرف حساب", "عملیات"],
    "RPA.PartyAccountSettlementItem": ["آیتم های تسویه حساب طرف حساب", "عملیات"],
    "RPA.PosSettlement": ["تسویه کارت خوان", "عملیات"],
    "RPA.PosSettlementReceipt": ["رسیدهای تسویه کارت خوان", "عملیات"],
    "RPA.Reconciliation": ["مغایرت گیری بانکی", "عملیات"],
    "RPA.ReconciliationBankItem": ["اقلام بانک در مغایرت گیری", "عملیات"],
    "RPA.ReconciliationItem": ["اقلام سیستم در مغایرت گیری", "عملیات"],
    "RPA.RefundCheque": ["استرداد چک", "عملیات"],
    "RPA.RefundChequeItem": ["آیتم های استرداد چک", "عملیات"],
    "INV.Item": ["کالاها و خدمات", "اطلاعات پایه"],
    "INV.ItemCategory": ["گروه بندی کالاها", "اطلاعات پایه"],
    "INV.ItemUnit": ["واحدهای سنجش کالا", "اطلاعات پایه"],
    "INV.Unit": ["واحدهای سنجش", "اطلاعات پایه"],
    "INV.Warehouse": ["انبارها", "اطلاعات پایه"],
    "INV.WarehouseKeeper": ["انباردارها", "اطلاعات پایه"],
    "INV.Stock": ["موجودی کالا", "عملیات"],
    "INV.ItemStock": ["موجودی کالا در انبار", "عملیات"],
    "INV.ItemBalance": ["مانده کالا", "عملیات"],
    "INV.InventoryVoucher": ["اسناد ورود و خروج انبار", "عملیات"],
    "INV.InventoryVoucherItem": ["اقلام سند انبار", "عملیات"],
    "INV.InventoryReceipt": ["رسید انبار", "عملیات"],
    "INV.InventoryReceiptItem": ["اقلام رسید انبار", "عملیات"],
    "INV.InventoryDelivery": ["حواله انبار", "عملیات"],
    "INV.InventoryDeliveryItem": ["اقلام حواله انبار", "عملیات"],
    "INV.Receipt": ["رسید انبار", "عملیات"],
    "INV.ReceiptItem": ["اقلام رسید انبار", "عملیات"],
    "INV.Delivery": ["حواله انبار", "عملیات"],
    "INV.DeliveryItem": ["اقلام حواله انبار", "عملیات"],
    "INV.Transfer": ["انتقال بین انبارها", "عملیات"],
    "INV.TransferItem": ["اقلام انتقال بین انبارها", "عملیات"],
    "INV.Adjustment": ["اصلاح موجودی", "عملیات"],
    "INV.AdjustmentItem": ["اقلام اصلاح موجودی", "عملیات"],
    "INV.Pricing": ["قیمت گذاری اسناد انبار", "عملیات"],
    "INV.PricingItem": ["اقلام قیمت گذاری", "عملیات"],
    "INV.StockTaking": ["انبارگردانی", "عملیات"],
    "INV.StockTakingItem": ["اقلام انبارگردانی", "عملیات"],
    "INV.Tracking": ["ردیابی کالا", "اطلاعات پایه"],
    "INV.ItemTracking": ["ردیابی کالاها", "عملیات"],
    "INV.Scale": ["باسکول ها", "اطلاعات پایه"],
    "INV.Weighing": ["توزین", "عملیات"],
    "INV.WeighingItem": ["اقلام توزین", "عملیات"],
    "INV.ItemPrice": ["قیمت کالا", "اطلاعات پایه"],
    "INV.ItemImage": ["تصاویر کالا", "اطلاعات پایه"],
    "PAY.Employee": ["پرسنل", "اطلاعات پایه"],
    "PAY.Personnel": ["پرسنل", "اطلاعات پایه"],
    "PAY.EmploymentType": ["انواع استخدام", "اطلاعات پایه"],
    "PAY.EmploymentContract": ["قراردادهای استخدام", "اطلاعات پایه"],
    "PAY.SalaryRule": ["احکام کارگزینی", "اطلاعات پایه"],
    "PAY.SalaryItem": ["عوامل حقوق و دستمزد", "اطلاعات پایه"],
    "PAY.Benefit": ["مزایا", "اطلاعات پایه"],
    "PAY.Deduction": ["کسور", "اطلاعات پایه"],
    "PAY.Insurance": ["بیمه", "اطلاعات پایه"],
    "PAY.Tax": ["مالیات حقوق", "اطلاعات پایه"],
    "PAY.WorkTime": ["کارکرد پرسنل", "عملیات"],
    "PAY.WorkTimeItem": ["اقلام کارکرد", "عملیات"],
    "PAY.Leave": ["مرخصی ها", "عملیات"],
    "PAY.Mission": ["ماموریت ها", "عملیات"],
    "PAY.Payroll": ["محاسبه حقوق", "عملیات"],
    "PAY.PayrollItem": ["اقلام محاسبه حقوق", "عملیات"],
    "PAY.PaySlip": ["فیش حقوقی", "عملیات"],
    "PAY.Payment": ["پرداخت حقوق", "عملیات"],
    "PAY.Loan": ["وام پرسنل", "عملیات"],
    "PAY.LoanItem": ["اقساط وام", "عملیات"],
    "AST.Asset": ["دارایی ها", "اطلاعات پایه"],
    "AST.AssetGroup": ["گروه های دارایی", "اطلاعات پایه"],
    "AST.AssetLocation": ["محل های استقرار دارایی", "اطلاعات پایه"],
    "AST.DepreciationMethod": ["روش های استهلاک", "اطلاعات پایه"],
    "AST.AssetAcquisition": ["تحصیل دارایی", "عملیات"],
    "AST.Acquisition": ["تحصیل دارایی", "عملیات"],
    "AST.Depreciation": ["محاسبه استهلاک", "عملیات"],
    "AST.DepreciationItem": ["اقلام استهلاک", "عملیات"],
    "AST.AssetTransfer": ["انتقال دارایی", "عملیات"],
    "AST.Transfer": ["انتقال دارایی", "عملیات"],
    "AST.AssetRepair": ["تعمیرات دارایی", "عملیات"],
    "AST.Repair": ["تعمیرات دارایی", "عملیات"],
    "AST.AssetDisposal": ["خروج دارایی", "عملیات"],
    "AST.Disposal": ["خروج دارایی", "عملیات"],
    "AST.AssetSale": ["فروش دارایی", "عملیات"],
    "AST.Revaluation": ["تجدید ارزیابی دارایی", "عملیات"],
    "CNT.Contract": ["قراردادها", "اطلاعات پایه"],
    "CNT.ContractType": ["انواع قرارداد", "اطلاعات پایه"],
    "CNT.Project": ["پروژه ها", "اطلاعات پایه"],
    "CNT.ContractParty": ["طرف های قرارداد", "اطلاعات پایه"],
    "CNT.Tender": ["مناقصه ها", "عملیات"],
    "CNT.Agreement": ["موافقت نامه ها", "عملیات"],
    "CNT.Guarantee": ["ضمانت نامه ها", "عملیات"],
    "CNT.ProgressStatement": ["صورت وضعیت ها", "عملیات"],
    "CNT.ProgressStatementItem": ["اقلام صورت وضعیت", "عملیات"],
    "CNT.Adjustment": ["تعدیل قرارداد", "عملیات"],
    "CNT.AdjustmentItem": ["اقلام تعدیل", "عملیات"],
    "CNT.ContractReceipt": ["دریافت های قرارداد", "عملیات"],
    "CNT.ContractPayment": ["پرداخت های قرارداد", "عملیات"],
    "CNT.ContractSettlement": ["تسویه قرارداد", "عملیات"],
    "WKO.Formula": ["فرمول های ساخت", "اطلاعات پایه"],
    "WKO.FormulaItem": ["اقلام فرمول ساخت", "اطلاعات پایه"],
    "WKO.BOM": ["فرمول مواد", "اطلاعات پایه"],
    "WKO.BOMItem": ["اقلام فرمول مواد", "اطلاعات پایه"],
    "WKO.Routing": ["مسیرهای تولید", "اطلاعات پایه"],
    "WKO.RoutingItem": ["مراحل مسیر تولید", "اطلاعات پایه"],
    "WKO.ProductionStage": ["مراحل تولید", "اطلاعات پایه"],
    "WKO.WorkOrder": ["دستور کار تولید", "عملیات"],
    "WKO.WorkOrderItem": ["اقلام دستور کار تولید", "عملیات"],
    "WKO.ProductionOrder": ["سفارش های تولید", "عملیات"],
    "WKO.ProductionOrderItem": ["اقلام سفارش تولید", "عملیات"],
    "WKO.MaterialIssue": ["خروج مواد اولیه", "عملیات"],
    "WKO.MaterialIssueItem": ["اقلام خروج مواد اولیه", "عملیات"],
    "WKO.ProductReceipt": ["ورود محصول تولید شده", "عملیات"],
    "WKO.ProductReceiptItem": ["اقلام ورود محصول تولید شده", "عملیات"],
    "WKO.ProductionCost": ["قیمت تمام شده تولید", "عملیات"],
    "WKO.ProductionCostItem": ["اقلام قیمت تمام شده تولید", "عملیات"],
    "POS.Store": ["فروشگاه ها", "اطلاعات پایه"],
    "POS.StoreBranch": ["شعب فروشگاه", "اطلاعات پایه"],
    "POS.Cashier": ["صندوق دارها", "اطلاعات پایه"],
    "POS.CashRegister": ["صندوق های فروش", "اطلاعات پایه"],
    "POS.Terminal": ["پایانه های فروش", "اطلاعات پایه"],
    "POS.Barcode": ["بارکد کالاها", "اطلاعات پایه"],
    "POS.Shift": ["شیفت های فروشگاهی", "عملیات"],
    "POS.Receipt": ["رسیدهای فروشگاهی", "عملیات"],
    "POS.ReceiptItem": ["اقلام رسید فروشگاهی", "عملیات"],
    "POS.Invoice": ["فاکتورهای فروشگاهی", "عملیات"],
    "POS.InvoiceItem": ["اقلام فاکتور فروشگاهی", "عملیات"],
    "POS.ReturnInvoice": ["برگشت فروشگاهی", "عملیات"],
    "POS.ReturnInvoiceItem": ["اقلام برگشت فروشگاهی", "عملیات"],
    "POS.DailySale": ["فروش روزانه", "عملیات"],
    "POS.CashierSettlement": ["تسویه صندوق دار", "عملیات"],
    "FMK.FiscalYear": ["سال مالی", "اطلاعات پایه وابسته"],
    "FMK.Company": ["شرکت ها", "اطلاعات پایه"],
    "FMK.Branch": ["شعب", "اطلاعات پایه"],
    "FMK.User": ["کاربران", "اطلاعات پایه"],
    "FMK.Role": ["نقش ها", "اطلاعات پایه"],
    "FMK.Permission": ["دسترسی ها", "اطلاعات پایه"],
    "FMK.AccessGroup": ["گروه های دسترسی", "اطلاعات پایه"],
    "FMK.UserRole": ["نقش های کاربر", "اطلاعات پایه"],
    "FMK.RolePermission": ["دسترسی های نقش", "اطلاعات پایه"],
    "FMK.Setting": ["تنظیمات سیستم", "اطلاعات پایه"],
    "FMK.Numbering": ["شماره گذاری اسناد", "اطلاعات پایه"],
    "FMK.AuditLog": ["سوابق تغییرات", "عملیات"],
    "FMK.Log": ["رخدادهای سیستم", "عملیات"],
    "MSG.Message": ["پیام ها", "عملیات"],
    "MSG.Notification": ["اعلان ها", "عملیات"],
    "MSG.Sms": ["پیامک ها", "عملیات"],
    "MSG.SMS": ["پیامک ها", "عملیات"],
    "MSG.Email": ["ایمیل ها", "عملیات"],
    "MSG.Template": ["قالب های پیام", "اطلاعات پایه"],
    "MSG.MessageTemplate": ["قالب های پیام", "اطلاعات پایه"],
    "MSG.Inbox": ["صندوق ورودی", "عملیات"],
    "MSG.Outbox": ["صندوق خروجی", "عملیات"],
    "MSG.Queue": ["صف ارسال", "عملیات"],
    "MSG.Delivery": ["وضعیت تحویل پیام", "عملیات"],
    "GNR.Currency": ["ارزها", "اطلاعات پایه وابسته"],
    "GNR.ExchangeRate": ["نرخ ارز", "اطلاعات پایه"],
    "GNR.Party": ["طرف حساب ها", "اطلاعات پایه وابسته"],
    "GNR.PartyGroup": ["گروه طرف حساب ها", "اطلاعات پایه"],
    "GNR.Contact": ["اطلاعات تماس", "اطلاعات پایه"],
    "GNR.Address": ["نشانی ها", "اطلاعات پایه"],
    "GNR.Country": ["کشورها", "اطلاعات پایه"],
    "GNR.Province": ["استان ها", "اطلاعات پایه"],
    "GNR.City": ["شهرها", "اطلاعات پایه"],
    "GNR.Location": ["مناطق و محل ها", "اطلاعات پایه وابسته"],
    "GNR.Unit": ["واحدهای سنجش", "اطلاعات پایه"],
    "GNR.FiscalPeriod": ["دوره های مالی", "اطلاعات پایه"],
    "GNR.DebitCreditNote": ["اعلامیه بدهکار/بستانکار", "عملیات وابسته"],
    "GNR.DebitCreditNoteItem": ["آیتم های اعلامیه بدهکار/بستانکار", "عملیات وابسته"],
    "SLS.Customer": ["مشتریان", "اطلاعات پایه"],
    "SLS.CustomerGroup": ["گروه مشتریان", "اطلاعات پایه"],
    "SLS.SalesArea": ["مناطق فروش", "اطلاعات پایه"],
    "SLS.SalesOffice": ["مراکز فروش", "اطلاعات پایه"],
    "SLS.SalesType": ["انواع فروش", "اطلاعات پایه"],
    "SLS.SalesPerson": ["فروشندگان", "اطلاعات پایه"],
    "SLS.Marketer": ["بازاریاب ها", "اطلاعات پایه"],
    "SLS.Visitor": ["ویزیتورها", "اطلاعات پایه"],
    "SLS.PriceList": ["فهرست قیمت", "اطلاعات پایه"],
    "SLS.PriceListItem": ["اقلام فهرست قیمت", "اطلاعات پایه"],
    "SLS.Discount": ["تخفیف ها", "اطلاعات پایه"],
    "SLS.DiscountItem": ["اقلام تخفیف", "اطلاعات پایه"],
    "SLS.Quotation": ["پیش فاکتورها", "عملیات"],
    "SLS.QuotationItem": ["اقلام پیش فاکتور", "عملیات"],
    "SLS.Order": ["سفارش های فروش", "عملیات"],
    "SLS.OrderItem": ["اقلام سفارش فروش", "عملیات"],
    "SLS.Invoice": ["فاکتورهای فروش", "عملیات"],
    "SLS.InvoiceItem": ["اقلام فاکتور فروش", "عملیات"],
    "SLS.ReturnedInvoice": ["برگشت از فروش", "عملیات"],
    "SLS.ReturnedInvoiceItem": ["اقلام برگشت از فروش", "عملیات"],
    "SLS.ReturnInvoice": ["برگشت فروش", "عملیات"],
    "SLS.ReturnInvoiceItem": ["اقلام برگشت فروش", "عملیات"],
    "SLS.CommissionCalculation": ["محاسبات پورسانت", "عملیات"],
    "SLS.CommissionCalculationItem": ["اقلام محاسبه پورسانت", "عملیات"],
    "SLS.SalesReport": ["گزارش فروش", "عملیات"],
    "SLS.CustomerBalance": ["مانده مشتریان", "عملیات"]
  };

  const state = {
    catalog: [],
    activeModule: "acc",
    activeTableId: "",
    rows: [],
    fields: [],
    primaryKey: [],
    total: 0,
    page: 1,
    pageSize: 100,
    editingRow: null,
    gridFullscreen: localStorage.getItem(fullscreenKey) === "true",
    menuCollapsed: localStorage.getItem(menuCollapsedKey) === "true",
    sort: { field: "", direction: "asc" }
  };

  const el = {
    appShell: document.querySelector(".app-shell"),
    systemMenu: document.getElementById("systemMenu"),
    moduleTabs: document.getElementById("moduleTabs"),
    pageTitle: document.getElementById("pageTitle"),
    searchInput: document.getElementById("searchInput"),
    fieldFilter: document.getElementById("fieldFilter"),
    valueFilter: document.getElementById("valueFilter"),
    addBtn: document.getElementById("addBtn"),
    recordCount: document.getElementById("recordCount"),
    tableHead: document.getElementById("tableHead"),
    tableBody: document.getElementById("tableBody"),
    editorForm: document.getElementById("editorForm"),
    formMode: document.getElementById("formMode"),
    activeTableName: document.getElementById("activeTableName"),
    clearFormBtn: document.getElementById("clearFormBtn"),
    menuToggleBtn: document.getElementById("menuToggleBtn"),
    fullscreenBtn: document.getElementById("fullscreenBtn"),
    exportBtn: document.getElementById("exportBtn"),
    importInput: document.getElementById("importInput"),
    sqlImportBtn: document.getElementById("sqlImportBtn"),
    resetBtn: document.getElementById("resetBtn")
  };

  init();

  async function init() {
    bindEvents();
    setStaticUi();
    await loadSchema();
  }

  function bindEvents() {
    el.searchInput.addEventListener("input", debounce(() => {
      state.page = 1;
      loadRows();
    }, 350));
    el.fieldFilter.addEventListener("change", renderTable);
    el.valueFilter.addEventListener("input", renderTable);
    el.addBtn.addEventListener("click", () => {
      alert("ثبت رکورد جدید برای دیتابیس عملیاتی فعال نشده است. ابتدا مدل کلیدها و مقادیر پیش فرض هر جدول باید مشخص شود.");
    });
    el.clearFormBtn.addEventListener("click", clearForm);
    el.menuToggleBtn.addEventListener("click", toggleMenu);
    el.fullscreenBtn.addEventListener("click", toggleGridFullscreen);
    el.editorForm.addEventListener("submit", saveForm);
    el.exportBtn.addEventListener("click", exportVisibleRows);
    if (el.importInput?.closest("label")) el.importInput.closest("label").style.display = "none";
    if (el.sqlImportBtn) el.sqlImportBtn.style.display = "none";
    if (el.resetBtn) el.resetBtn.style.display = "none";
  }

  function setStaticUi() {
    document.title = "sepidAI | حسابداری و خزانه داری";
    document.querySelector(".brand h1").textContent = "sepidAI";
    document.querySelector(".brand p").textContent = "حسابداری و خزانه داری";
    document.querySelector(".eyebrow").textContent = "اتصال مستقیم به SQL Server: sepidAI_Analysis_New";
    el.searchInput.placeholder = "جستجو در جدول جاری...";
    document.querySelector("label[for='searchInput']").textContent = "جستجو";
    document.querySelector("label[for='fieldFilter']").textContent = "فیلتر ستون";
    document.querySelector("label[for='valueFilter']").textContent = "مقدار فیلتر";
    setButtonLabel(el.addBtn, "plus", "رکورد جدید");
    setButtonLabel(el.clearFormBtn, "clear", "پاک کردن فرم");
    setButtonLabel(el.exportBtn, "export", "خروجی JSON");
    document.getElementById("tableHint").textContent = "مرتب سازی و جستجو سمت سرور انجام می شود؛ فیلتر ستون روی صفحه جاری اعمال می شود.";
    renderMenuCollapsed();
    renderGridFullscreen();
  }

  async function loadSchema() {
    setLoading("در حال خواندن ساختار دیتابیس...");
    state.catalog = sortCatalog(await apiGet("/api/schema"));
    const preferred = state.catalog.find((m) => m.key === "acc") || state.catalog[0];
    state.activeModule = preferred?.key || "";
    state.activeTableId = preferred?.tables?.[0]?.id || "";
    renderMenu();
    renderTabs();
    await loadRows();
  }

  function renderMenu() {
    el.systemMenu.innerHTML = "";
    state.catalog.forEach((module) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `menu-btn${module.key === state.activeModule ? " active" : ""}`;
      btn.innerHTML = `
        <span class="menu-icon">${icons[moduleIcons[module.key] || "settings"]}</span>
        <span class="menu-copy">
          <strong>${escapeHtml(moduleTitle(module))}</strong>
          <span>${escapeHtml(moduleSubtitle(module))} · ${toFaNumber(module.tables.length)} جدول</span>
        </span>`;
      btn.addEventListener("click", async () => {
        state.activeModule = module.key;
        state.activeTableId = module.tables[0]?.id || "";
        state.page = 1;
        state.sort = { field: "", direction: "asc" };
        el.searchInput.value = "";
        el.valueFilter.value = "";
        clearForm();
        renderMenu();
        renderTabs();
        await loadRows();
      });
      el.systemMenu.appendChild(btn);
    });
    scrollActiveMenuIntoView();
  }

  function renderTabs() {
    const module = getActiveModule();
    el.pageTitle.textContent = module ? moduleTitle(module) : "جدول ها";
    el.moduleTabs.innerHTML = "";
    const groups = groupTables(module?.tables || []);
    groups.forEach((group) => {
      const section = document.createElement("div");
      section.className = "tab-section";

      const heading = document.createElement("div");
      heading.className = "tab-section-title";
      heading.textContent = `${group.title} · ${toFaNumber(group.tables.length)} صفحه`;
      section.appendChild(heading);

      const list = document.createElement("div");
      list.className = "tab-list";
      group.tables.forEach((table) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `tab-btn${table.id === state.activeTableId ? " active" : ""}`;
        btn.textContent = `${tableTitle(table)} (${toFaNumber(table.rowCount || 0)})`;
        btn.title = table.id;
        btn.addEventListener("click", async () => {
          state.activeTableId = table.id;
          state.page = 1;
          state.sort = { field: "", direction: "asc" };
          el.searchInput.value = "";
          el.valueFilter.value = "";
          clearForm();
          renderTabs();
          await loadRows();
        });
        list.appendChild(btn);
      });
      section.appendChild(list);
      el.moduleTabs.appendChild(section);
    });
    scrollActiveTabIntoView();
  }

  async function loadRows() {
    if (!state.activeTableId) return;
    const params = new URLSearchParams({
      table: state.activeTableId,
      page: String(state.page),
      pageSize: String(state.pageSize),
      search: el.searchInput.value.trim(),
      sortField: state.sort.field,
      sortDirection: state.sort.direction
    });
    setLoading("در حال خواندن داده ها...");
    const result = await apiGet(`/api/rows?${params.toString()}`);
    state.rows = result.rows || [];
    state.fields = result.fields || [];
    state.primaryKey = result.primaryKey || [];
    state.total = result.total || 0;
    renderTableSelectors();
    renderTable();
    renderForm(null);
  }

  function renderTableSelectors() {
    const table = getActiveTable();
    el.activeTableName.textContent = table ? `${tableTitle(table)} · ${toFaNumber(state.total)} رکورد` : "-";
    el.fieldFilter.innerHTML = `<option value="">همه ستون ها</option>`;
    visibleFields().forEach((field) => {
      const option = document.createElement("option");
      option.value = field.name;
      option.textContent = field.primaryKey ? `${fieldLabel(field)} *` : fieldLabel(field);
      el.fieldFilter.appendChild(option);
    });
  }

  function renderTable() {
    const rows = getVisibleRows();
    const fields = visibleFields();
    el.tableHead.innerHTML = "";
    el.tableBody.innerHTML = "";

    const headRow = document.createElement("tr");
    fields.forEach((field) => {
      const th = document.createElement("th");
      th.className = "sortable";
      th.textContent = fieldLabel(field);
      th.title = `${field.name} / ${field.sqlType}${field.primaryKey ? " / کلید اصلی" : ""}`;
      th.addEventListener("click", async () => {
        if (state.sort.field === field.name) {
          state.sort.direction = state.sort.direction === "asc" ? "desc" : "asc";
        } else {
          state.sort = { field: field.name, direction: "asc" };
        }
        await loadRows();
      });
      if (state.sort.field === field.name) {
        th.dataset.sort = state.sort.direction === "asc" ? " ↑" : " ↓";
      }
      headRow.appendChild(th);
    });
    el.tableHead.appendChild(headRow);

    if (!rows.length) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = Math.max(1, fields.length);
      td.className = "empty-cell";
      td.textContent = "داده ای برای نمایش وجود ندارد.";
      tr.appendChild(td);
      el.tableBody.appendChild(tr);
    } else {
      rows.forEach((row) => {
        const tr = document.createElement("tr");
        tr.addEventListener("click", () => renderForm(row));
        fields.forEach((field) => {
          const td = document.createElement("td");
          td.textContent = formatValue(row[field.name], field);
          tr.appendChild(td);
        });
        el.tableBody.appendChild(tr);
      });
    }

    renderPagination(rows.length);
  }

  function renderPagination(visibleCount) {
    const totalPages = Math.max(1, Math.ceil(state.total / state.pageSize));
    el.recordCount.innerHTML = "";

    const text = document.createElement("span");
    text.textContent = `${toFaNumber(visibleCount)} نمایش داده شده از ${toFaNumber(state.total)} رکورد · صفحه ${toFaNumber(state.page)} از ${toFaNumber(totalPages)}`;
    el.recordCount.appendChild(text);

    const prev = document.createElement("button");
    prev.type = "button";
    prev.className = "secondary-btn";
    setButtonLabel(prev, "prev", "قبلی");
    prev.disabled = state.page <= 1;
    prev.addEventListener("click", async () => {
      state.page = Math.max(1, state.page - 1);
      await loadRows();
    });

    const next = document.createElement("button");
    next.type = "button";
    next.className = "secondary-btn";
    setButtonLabel(next, "next", "بعدی");
    next.disabled = state.page >= totalPages;
    next.addEventListener("click", async () => {
      state.page = Math.min(totalPages, state.page + 1);
      await loadRows();
    });

    el.recordCount.appendChild(prev);
    el.recordCount.appendChild(next);
  }

  function renderForm(row) {
    state.editingRow = row;
    el.editorForm.innerHTML = "";
    if (!row) {
      el.formMode.textContent = "یک ردیف را از جدول انتخاب کنید.";
      return;
    }

    el.formMode.textContent = state.primaryKey.length
      ? "ویرایش رکورد انتخاب شده"
      : "این جدول کلید اصلی ندارد؛ ذخیره غیرفعال است.";

    visibleFields().forEach((field) => {
      const wrapper = document.createElement("label");
      wrapper.className = "form-field";
      const title = document.createElement("span");
      title.textContent = `${fieldLabel(field)}${field.primaryKey ? " *" : ""}`;
      wrapper.appendChild(title);

      const input = document.createElement(field.type === "boolean" ? "select" : "input");
      input.name = field.name;
      input.disabled = field.primaryKey || !state.primaryKey.length;
      if (field.type === "boolean") {
        input.innerHTML = `<option value="true">درست</option><option value="false">نادرست</option><option value="">خالی</option>`;
        input.value = row[field.name] === null || row[field.name] === undefined ? "" : String(Boolean(row[field.name]));
      } else if (isDateField(field)) {
        input.type = "text";
        input.dir = "ltr";
        input.placeholder = "1403/01/31";
        input.dataset.jalaliDate = "true";
        input.value = formatJalaliDate(row[field.name]);
      } else if (isMoneyField(field)) {
        input.type = "text";
        input.dir = "ltr";
        input.inputMode = "decimal";
        input.value = row[field.name] === null || row[field.name] === undefined ? "" : moneyFormatter.format(row[field.name]);
      } else {
        input.type = field.type === "number" ? "number" : "text";
        input.value = row[field.name] ?? "";
      }
      wrapper.appendChild(input);
      el.editorForm.appendChild(wrapper);
    });

    const actions = document.createElement("div");
    actions.className = "form-actions";
    const save = document.createElement("button");
    save.type = "submit";
    save.className = "primary-btn";
    setButtonLabel(save, "save", "ذخیره تغییرات");
    save.disabled = !state.primaryKey.length;
    actions.appendChild(save);
    el.editorForm.appendChild(actions);
  }

  async function saveForm(event) {
    event.preventDefault();
    if (!state.editingRow || !state.primaryKey.length) return;

    const values = {};
    const data = new FormData(el.editorForm);
    state.fields.forEach((field) => {
      if (field.primaryKey || isHiddenField(field)) return;
      let value = data.get(field.name);
      if (field.type === "boolean") value = value === "" ? null : value === "true";
      if (field.type === "number") value = value === "" ? null : parseFormattedNumber(value);
      if (isDateField(field)) value = value ? jalaliInputToSqlDate(value, state.editingRow[field.name]) : null;
      values[field.name] = value;
    });

    const keys = {};
    state.primaryKey.forEach((key) => {
      keys[key] = state.editingRow[key];
    });

    await apiJson(`/api/row?table=${encodeURIComponent(state.activeTableId)}`, "PUT", { keys, values });
    await loadRows();
    el.formMode.textContent = "تغییرات ذخیره شد.";
  }

  function clearForm() {
    state.editingRow = null;
    renderForm(null);
  }

  function toggleMenu() {
    state.menuCollapsed = !state.menuCollapsed;
    localStorage.setItem(menuCollapsedKey, String(state.menuCollapsed));
    renderMenuCollapsed();
  }

  function renderMenuCollapsed() {
    el.appShell.classList.toggle("menu-collapsed", state.menuCollapsed);
    setButtonLabel(el.menuToggleBtn, state.menuCollapsed ? "menu" : "close", state.menuCollapsed ? "باز کردن منو" : "بستن منو");
  }

  function toggleGridFullscreen() {
    state.gridFullscreen = !state.gridFullscreen;
    localStorage.setItem(fullscreenKey, String(state.gridFullscreen));
    renderGridFullscreen();
  }

  function renderGridFullscreen() {
    el.appShell.classList.toggle("grid-fullscreen", state.gridFullscreen);
    setButtonLabel(el.fullscreenBtn, state.gridFullscreen ? "minimize" : "fullscreen", state.gridFullscreen ? "نمای کامل: روشن" : "نمای کامل جدول");
  }

  function setButtonLabel(button, iconName, label) {
    if (!button) return;
    button.innerHTML = `<span class="btn-icon">${icons[iconName] || ""}</span><span>${escapeHtml(label)}</span>`;
    button.setAttribute("aria-label", label);
    button.title = label;
  }

  function scrollActiveMenuIntoView() {
    requestAnimationFrame(() => {
      el.systemMenu.querySelector(".menu-btn.active")?.scrollIntoView({
        block: "nearest",
        inline: "nearest",
        behavior: "smooth"
      });
    });
  }

  function scrollActiveTabIntoView() {
    requestAnimationFrame(() => {
      el.moduleTabs.querySelector(".tab-btn.active")?.scrollIntoView({
        block: "nearest",
        inline: "center",
        behavior: "smooth"
      });
    });
  }

  function exportVisibleRows() {
    const payload = {
      table: state.activeTableId,
      total: state.total,
      exportedRows: getVisibleRows()
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${state.activeTableId || "table"}-page.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function getVisibleRows() {
    const field = el.fieldFilter.value;
    const filter = el.valueFilter.value.trim().toLowerCase();
    if (!filter) return state.rows;
    return state.rows.filter((row) => {
      if (field) return String(row[field] ?? "").toLowerCase().includes(filter);
      return visibleFields().some((f) => String(row[f.name] ?? "").toLowerCase().includes(filter));
    });
  }

  function setLoading(message) {
    el.tableBody.innerHTML = `<tr><td class="empty-cell">${escapeHtml(message)}</td></tr>`;
  }

  function sortCatalog(catalog) {
    const order = new Map([["acc", 0], ["rpa", 1], ["inv", 2], ["sls", 3], ["gnr", 4], ["fmk", 5]]);
    return [...(catalog || [])].sort((a, b) => {
      const left = order.has(a.key) ? order.get(a.key) : 50;
      const right = order.has(b.key) ? order.get(b.key) : 50;
      if (left !== right) return left - right;
      return String(a.key || "").localeCompare(String(b.key || ""));
    });
  }

  function getActiveModule() {
    return state.catalog.find((module) => module.key === state.activeModule);
  }

  function getActiveTable() {
    return getActiveModule()?.tables.find((table) => table.id === state.activeTableId);
  }

  function visibleFields() {
    return state.fields.filter((field) => !isHiddenField(field));
  }

  function isHiddenField(field) {
    const name = field.name || "";
    if (field.primaryKey) return true;
    if (/(^|_)(id)$/i.test(name)) return true;
    if (/(Id|ID)$/.test(name)) return true;
    if (/Ref$/.test(name)) return true;
    if (/^(Version|Creator|CreationDate|LastModifier|LastModificationDate)$/i.test(name)) return true;
    if (/^(Old|Base|Issuer|Merged|RelatedTo|Document|Header|Entity)/i.test(name)) return true;
    if (/rowguid|timestamp|rowversion/i.test(name)) return true;
    return false;
  }

  function moduleTitle(module) {
    return moduleLabels[module.key]?.[0] || module.title || module.schema;
  }

  function moduleSubtitle(module) {
    return moduleLabels[module.key]?.[1] || module.subtitle || "";
  }

  function groupTables(tables) {
    const master = [];
    const operations = [];
    const dependencyMaster = [];
    const dependencyOperations = [];
    const other = [];
    tables.forEach((table) => {
      const group = tableLabels[table.id]?.[1] || inferTableGroup(table.name);
      if (group === "اطلاعات پایه") master.push(table);
      else if (group === "عملیات") operations.push(table);
      else if (group === "اطلاعات پایه وابسته") dependencyMaster.push(table);
      else if (group === "عملیات وابسته") dependencyOperations.push(table);
      else other.push(table);
    });
    return [
      { title: "اطلاعات پایه", tables: master },
      { title: "عملیات", tables: operations },
      { title: "اطلاعات پایه وابسته به حسابداری و خزانه", tables: dependencyMaster },
      { title: "عملیات وابسته به حسابداری و خزانه", tables: dependencyOperations },
      { title: "سایر جدول ها", tables: other }
    ].filter((group) => group.tables.length);
  }

  function inferTableGroup(tableName) {
    if (/Voucher|Operation|Receipt|Payment|Cheque|Settlement|Bill|Balance|Reconciliation|Refund|History|Stock|Inventory|Receipt|Delivery|Transfer|Adjustment|Pricing|Taking|Tracking|Weighing|Turnover|Profit|Loss|Liquidity|Commitment|Journal|Invoice|Order|Quotation|Return|Commission|Report|Payroll|WorkTime|Leave|Mission|PaySlip|Loan|Acquisition|Depreciation|Disposal|Repair|Revaluation|Sale|Tender|Agreement|Guarantee|Statement|WorkOrder|ProductionOrder|MaterialIssue|ProductReceipt|ProductionCost|Shift|DailySale|CashierSettlement|Audit|Log|Message|Notification|Sms|SMS|Email|Inbox|Outbox|Queue|Delivery/i.test(tableName)) {
      return "عملیات";
    }
    if (/Account|Bank|Branch|Cash|Pos|Type|Topic|DL|Specification|Book|Item|Warehouse|Unit|Category|Scale|CostCenter|Ledger|CashFlow|Customer|Sales|Price|Discount|Marketer|Visitor|Person|Area|Office|Employee|Personnel|Employment|Salary|Benefit|Deduction|Insurance|Tax|Asset|Location|Method|Contract|Project|Party|Formula|BOM|Routing|Stage|Material|Product|Store|Cashier|Terminal|Barcode|Register|Currency|Exchange|Contact|Address|Country|Province|City|FiscalPeriod|Company|User|Role|Permission|Access|Setting|Numbering|Template/i.test(tableName)) {
      return "اطلاعات پایه";
    }
    return "سایر";
  }

  function tableTitle(table) {
    if (tableLabels[table.id]) return tableLabels[table.id][0];
    return splitColumnName(table.name || table.title || table.id);
  }

  function fieldLabel(field) {
    const name = field.name || field.label || "";
    if (columnLabels[name]) return columnLabels[name];

    let label = splitColumnName(name);
    label = label.replace(/\bRef\b/g, "مرجع");
    label = label.replace(/\bID\b/g, "شناسه");
    label = label.replace(/\bId\b/g, "شناسه");
    label = label.replace(/\bNo\b/g, "شماره");
    label = label.replace(/\bDate\b/g, "تاریخ");
    label = label.replace(/\bAmount\b/g, "مبلغ");
    label = label.replace(/\bPrice\b/g, "قیمت");
    label = label.replace(/\bQuantity\b/g, "تعداد");
    label = label.replace(/\bTitle\b/g, "عنوان");
    label = label.replace(/\bCode\b/g, "کد");
    label = label.replace(/\bType\b/g, "نوع");
    label = label.replace(/\bState\b/g, "وضعیت");
    label = label.replace(/\bStatus\b/g, "وضعیت");
    label = label.replace(/\bIs\b/g, "آیا");
    label = label.replace(/\bHas\b/g, "دارای");
    label = label.replace(/\bBase\b/g, "مبنا");
    label = label.replace(/\bParent\b/g, "والد");
    label = label.replace(/\bCost Center\b/g, "مرکز هزینه");
    label = label.replace(/\bDetail Account\b/g, "حساب تفصیلی");
    label = label.replace(/\bTrial Balance\b/g, "تراز آزمایشی");
    label = label.replace(/\bProfit Loss\b/g, "سود و زیان");
    label = label.replace(/\bCash Flow\b/g, "جریان نقدی");
    label = label.replace(/\bPayable Commitment\b/g, "تعهد پرداختنی");
    label = label.replace(/\bReceivable Commitment\b/g, "تعهد دریافتنی");
    label = label.replace(/\bBank Bill\b/g, "صورت حساب بانکی");
    label = label.replace(/\bCheque Book\b/g, "دسته چک");
    label = label.replace(/\bPetty Cash\b/g, "تنخواه گردان");
    label = label.replace(/\bStock Taking\b/g, "انبارگردانی");
    label = label.replace(/\bInventory Voucher\b/g, "سند انبار");
    label = label.replace(/\bInventory Receipt\b/g, "رسید انبار");
    label = label.replace(/\bInventory Delivery\b/g, "حواله انبار");
    label = label.replace(/\bCustomer Group\b/g, "گروه مشتری");
    label = label.replace(/\bSales Area\b/g, "منطقه فروش");
    label = label.replace(/\bSales Office\b/g, "مرکز فروش");
    label = label.replace(/\bSales Person\b/g, "فروشنده");
    label = label.replace(/\bPrice List\b/g, "فهرست قیمت");
    label = label.replace(/\bReturned Invoice\b/g, "برگشت فروش");
    label = label.replace(/\bReturn Invoice\b/g, "برگشت فروش");
    label = label.replace(/\bCommission Calculation\b/g, "محاسبه پورسانت");
    label = label.replace(/\bEmployment Contract\b/g, "قرارداد استخدام");
    label = label.replace(/\bEmployment Type\b/g, "نوع استخدام");
    label = label.replace(/\bSalary Rule\b/g, "حکم کارگزینی");
    label = label.replace(/\bSalary Item\b/g, "عامل حقوق");
    label = label.replace(/\bWork Time\b/g, "کارکرد");
    label = label.replace(/\bPay Slip\b/g, "فیش حقوقی");
    label = label.replace(/\bAsset Group\b/g, "گروه دارایی");
    label = label.replace(/\bAsset Location\b/g, "محل استقرار دارایی");
    label = label.replace(/\bDepreciation Method\b/g, "روش استهلاک");
    label = label.replace(/\bBook Value\b/g, "ارزش دفتری");
    label = label.replace(/\bSalvage Value\b/g, "ارزش اسقاط");
    label = label.replace(/\bUseful Life\b/g, "عمر مفید");
    label = label.replace(/\bContract Party\b/g, "طرف قرارداد");
    label = label.replace(/\bContract Type\b/g, "نوع قرارداد");
    label = label.replace(/\bProgress Statement\b/g, "صورت وضعیت");
    label = label.replace(/\bContract Settlement\b/g, "تسویه قرارداد");
    label = label.replace(/\bWork Order\b/g, "دستور کار تولید");
    label = label.replace(/\bProduction Order\b/g, "سفارش تولید");
    label = label.replace(/\bProduction Stage\b/g, "مرحله تولید");
    label = label.replace(/\bMaterial Issue\b/g, "خروج مواد");
    label = label.replace(/\bProduct Receipt\b/g, "ورود محصول");
    label = label.replace(/\bProduction Cost\b/g, "قیمت تمام شده تولید");
    label = label.replace(/\bStore Branch\b/g, "شعبه فروشگاه");
    label = label.replace(/\bCash Register\b/g, "صندوق فروش");
    label = label.replace(/\bDaily Sale\b/g, "فروش روزانه");
    label = label.replace(/\bCashier Settlement\b/g, "تسویه صندوق دار");
    label = label.replace(/\bExchange Rate\b/g, "نرخ ارز");
    label = label.replace(/\bDebit Credit Note\b/g, "اعلامیه بدهکار/بستانکار");
    label = label.replace(/\bFiscal Period\b/g, "دوره مالی");
    label = label.replace(/\bAccess Group\b/g, "گروه دسترسی");
    label = label.replace(/\bAudit Log\b/g, "سوابق تغییرات");
    label = label.replace(/\bUser Role\b/g, "نقش کاربر");
    label = label.replace(/\bRole Permission\b/g, "دسترسی نقش");
    label = label.replace(/\bMessage Template\b/g, "قالب پیام");
    label = label.replace(/\bDelivery Status\b/g, "وضعیت تحویل");
    label = label.replace(/\bAccount\b/g, "حساب");
    label = label.replace(/\bLedger\b/g, "دفتر حسابداری");
    label = label.replace(/\bJournal\b/g, "دفتر روزنامه");
    label = label.replace(/\bBank\b/g, "بانک");
    label = label.replace(/\bCash\b/g, "صندوق");
    label = label.replace(/\bCheque\b/g, "چک");
    label = label.replace(/\bPayment\b/g, "پرداخت");
    label = label.replace(/\bReceipt\b/g, "دریافت");
    label = label.replace(/\bCommitment\b/g, "تعهد");
    label = label.replace(/\bLiquidity\b/g, "نقدینگی");
    label = label.replace(/\bVoucher\b/g, "سند");
    label = label.replace(/\bItem\b/g, "کالا");
    label = label.replace(/\bWarehouse\b/g, "انبار");
    label = label.replace(/\bInventory\b/g, "انبارداری");
    label = label.replace(/\bStock\b/g, "موجودی");
    label = label.replace(/\bDelivery\b/g, "حواله");
    label = label.replace(/\bTransfer\b/g, "انتقال");
    label = label.replace(/\bTracking\b/g, "ردیابی");
    label = label.replace(/\bWeighing\b/g, "توزین");
    label = label.replace(/\bWeight\b/g, "وزن");
    label = label.replace(/\bScale\b/g, "باسکول");
    label = label.replace(/\bParty\b/g, "شخص");
    label = label.replace(/\bCustomer\b/g, "مشتری");
    label = label.replace(/\bSales\b/g, "فروش");
    label = label.replace(/\bQuotation\b/g, "پیش فاکتور");
    label = label.replace(/\bOrder\b/g, "سفارش");
    label = label.replace(/\bInvoice\b/g, "فاکتور");
    label = label.replace(/\bReturn\b/g, "برگشت");
    label = label.replace(/\bDiscount\b/g, "تخفیف");
    label = label.replace(/\bCommission\b/g, "پورسانت");
    label = label.replace(/\bMarketer\b/g, "بازاریاب");
    label = label.replace(/\bVisitor\b/g, "ویزیتور");
    label = label.replace(/\bEmployee\b/g, "پرسنل");
    label = label.replace(/\bPersonnel\b/g, "پرسنل");
    label = label.replace(/\bEmployment\b/g, "استخدام");
    label = label.replace(/\bPayroll\b/g, "محاسبه حقوق");
    label = label.replace(/\bSalary\b/g, "حقوق");
    label = label.replace(/\bWage\b/g, "دستمزد");
    label = label.replace(/\bBenefit\b/g, "مزایا");
    label = label.replace(/\bDeduction\b/g, "کسور");
    label = label.replace(/\bInsurance\b/g, "بیمه");
    label = label.replace(/\bLeave\b/g, "مرخصی");
    label = label.replace(/\bMission\b/g, "ماموریت");
    label = label.replace(/\bLoan\b/g, "وام");
    label = label.replace(/\bAsset\b/g, "دارایی");
    label = label.replace(/\bAcquisition\b/g, "تحصیل");
    label = label.replace(/\bDepreciation\b/g, "استهلاک");
    label = label.replace(/\bDisposal\b/g, "خروج");
    label = label.replace(/\bRepair\b/g, "تعمیرات");
    label = label.replace(/\bRevaluation\b/g, "تجدید ارزیابی");
    label = label.replace(/\bPlaque\b/g, "پلاک");
    label = label.replace(/\bContract\b/g, "قرارداد");
    label = label.replace(/\bProject\b/g, "پروژه");
    label = label.replace(/\bTender\b/g, "مناقصه");
    label = label.replace(/\bAgreement\b/g, "موافقت نامه");
    label = label.replace(/\bGuarantee\b/g, "ضمانت نامه");
    label = label.replace(/\bStatement\b/g, "صورت وضعیت");
    label = label.replace(/\bFormula\b/g, "فرمول ساخت");
    label = label.replace(/\bBOM\b/g, "فرمول مواد");
    label = label.replace(/\bRouting\b/g, "مسیر تولید");
    label = label.replace(/\bStage\b/g, "مرحله");
    label = label.replace(/\bMaterial\b/g, "مواد اولیه");
    label = label.replace(/\bProduction\b/g, "تولید");
    label = label.replace(/\bWastage\b/g, "ضایعات");
    label = label.replace(/\bScrap\b/g, "ضایعات");
    label = label.replace(/\bStore\b/g, "فروشگاه");
    label = label.replace(/\bCashier\b/g, "صندوق دار");
    label = label.replace(/\bRegister\b/g, "صندوق فروش");
    label = label.replace(/\bShift\b/g, "شیفت");
    label = label.replace(/\bTerminal\b/g, "پایانه فروش");
    label = label.replace(/\bBarcode\b/g, "بارکد");
    label = label.replace(/\bContact\b/g, "اطلاعات تماس");
    label = label.replace(/\bAddress\b/g, "نشانی");
    label = label.replace(/\bCountry\b/g, "کشور");
    label = label.replace(/\bProvince\b/g, "استان");
    label = label.replace(/\bCity\b/g, "شهر");
    label = label.replace(/\bExchange\b/g, "تبدیل");
    label = label.replace(/\bCompany\b/g, "شرکت");
    label = label.replace(/\bUser\b/g, "کاربر");
    label = label.replace(/\bRole\b/g, "نقش");
    label = label.replace(/\bPermission\b/g, "دسترسی");
    label = label.replace(/\bAccess\b/g, "دسترسی");
    label = label.replace(/\bSetting\b/g, "تنظیمات");
    label = label.replace(/\bNumbering\b/g, "شماره گذاری");
    label = label.replace(/\bMessage\b/g, "پیام");
    label = label.replace(/\bNotification\b/g, "اعلان");
    label = label.replace(/\bSms\b/g, "پیامک");
    label = label.replace(/\bSMS\b/g, "پیامک");
    label = label.replace(/\bTemplate\b/g, "قالب");
    label = label.replace(/\bInbox\b/g, "صندوق ورودی");
    label = label.replace(/\bOutbox\b/g, "صندوق خروجی");
    label = label.replace(/\bQueue\b/g, "صف");
    label = label.replace(/\bSender\b/g, "فرستنده");
    label = label.replace(/\bReceiver\b/g, "گیرنده");
    label = label.replace(/\bProduct\b/g, "محصول");
    label = label.replace(/\bCurrency\b/g, "ارز");
    label = label.replace(/\bFiscalYear\b/g, "سال مالی");
    return label || name;
  }

  function splitColumnName(name) {
    return String(name)
      .replace(/_/g, " ")
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .replace(/\s+/g, " ")
      .trim();
  }

  async function apiGet(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  }

  async function apiJson(url, method, body) {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  }

  function debounce(fn, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }

  function formatValue(value, field = {}) {
    if (value === null || value === undefined) return "";
    if (typeof value === "boolean") return value ? "درست" : "نادرست";
    if (isDateField(field)) return formatJalaliDate(value);
    if (typeof value === "number") {
      return isMoneyField(field) ? moneyFormatter.format(value) : toFaNumber(value);
    }
    return String(value);
  }

  function toFaNumber(value) {
    return new Intl.NumberFormat("fa-IR").format(value);
  }

  function isDateField(field) {
    const name = field.name || "";
    return /date/i.test(name) || /date|datetime|smalldatetime|datetime2/i.test(field.sqlType || "");
  }

  function isMoneyField(field) {
    const name = field.name || "";
    return /Amount|Balance|Debit|Credit|Price|Cost|Fee|Tax|Duty|Discount|NetPrice|Rate/i.test(name)
      || /money|decimal|numeric/i.test(field.sqlType || "");
  }

  function formatJalaliDate(value) {
    const date = toDate(value);
    if (!date) return "";
    const parts = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(date);
    const y = parts.find((p) => p.type === "year")?.value || "";
    const m = parts.find((p) => p.type === "month")?.value || "";
    const d = parts.find((p) => p.type === "day")?.value || "";
    return `${y}/${m}/${d}`;
  }

  function toDate(value) {
    if (!value) return null;
    if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
    const date = new Date(String(value));
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function jalaliInputToSqlDate(input, fallback) {
    const normalized = normalizeDigits(String(input || "").trim());
    const match = normalized.match(/^(\d{4})[/-](\d{1,2})[/-](\d{1,2})$/);
    if (!match) return fallback;
    const gy = jalaliToGregorian(Number(match[1]), Number(match[2]), Number(match[3]));
    return `${gy.gy}-${String(gy.gm).padStart(2, "0")}-${String(gy.gd).padStart(2, "0")}T00:00:00`;
  }

  function normalizeDigits(value) {
    const fa = "۰۱۲۳۴۵۶۷۸۹";
    const ar = "٠١٢٣٤٥٦٧٨٩";
    return value.replace(/[۰-۹٠-٩]/g, (digit) => {
      const faIndex = fa.indexOf(digit);
      if (faIndex >= 0) return String(faIndex);
      return String(ar.indexOf(digit));
    });
  }

  function parseFormattedNumber(value) {
    const normalized = normalizeDigits(String(value || ""))
      .replace(/[,٬،\s]/g, "");
    return normalized === "" ? null : Number(normalized);
  }

  function jalaliToGregorian(jy, jm, jd) {
    jy += 1595;
    let days = -355668 + (365 * jy) + (Math.floor(jy / 33) * 8) + Math.floor(((jy % 33) + 3) / 4) + jd;
    if (jm < 7) {
      days += (jm - 1) * 31;
    } else {
      days += ((jm - 7) * 30) + 186;
    }
    let gy = 400 * Math.floor(days / 146097);
    days %= 146097;
    if (days > 36524) {
      gy += 100 * Math.floor(--days / 36524);
      days %= 36524;
      if (days >= 365) days++;
    }
    gy += 4 * Math.floor(days / 1461);
    days %= 1461;
    if (days > 365) {
      gy += Math.floor((days - 1) / 365);
      days = (days - 1) % 365;
    }
    const gd = days + 1;
    const salA = [0, 31, isGregorianLeap(gy) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let gm = 0;
    let day = gd;
    for (gm = 1; gm <= 12 && day > salA[gm]; gm++) day -= salA[gm];
    return { gy, gm, gd: day };
  }

  function isGregorianLeap(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();



