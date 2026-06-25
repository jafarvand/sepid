(function () {
  const fullscreenKey = "sepidAI-grid-fullscreen-v1";
  const menuCollapsedKey = "sepidAI-menu-collapsed-v1";
  const moneyFormatter = new Intl.NumberFormat("fa-IR", {
    maximumFractionDigits: 4
  });
  const moduleLabels = {
    acc: ["Ø­Ø³Ø§Ø¨Ø¯Ø§Ø±ÛŒ", "Ø­Ø³Ø§Ø¨ Ù‡Ø§ØŒ ØªÙØµÛŒÙ„ÛŒ Ù‡Ø§ØŒ Ø§Ø³Ù†Ø§Ø¯ Ùˆ Ø¢Ø±ØªÛŒÚ©Ù„ Ù‡Ø§"],
    rpa: ["Ø®Ø²Ø§Ù†Ù‡ Ø¯Ø§Ø±ÛŒ", "Ø¨Ø§Ù†Ú©ØŒ ØµÙ†Ø¯ÙˆÙ‚ØŒ Ú†Ú©ØŒ Ø¯Ø±ÛŒØ§ÙØªØŒ Ù¾Ø±Ø¯Ø§Ø®Øª Ùˆ ØªØ³ÙˆÛŒÙ‡"],
    inv: ["Ø§Ù†Ø¨Ø§Ø± Ùˆ Ú©Ø§Ù„Ø§", "Ú©Ø§Ù„Ø§ØŒ Ø§Ù†Ø¨Ø§Ø±ØŒ Ù…ÙˆØ¬ÙˆØ¯ÛŒ Ùˆ Ú¯Ø±Ø¯Ø´ Ú©Ø§Ù„Ø§"],
    sls: ["ÙØ±ÙˆØ´", "Ù…Ø´ØªØ±ÛŒØŒ Ø³ÙØ§Ø±Ø´ØŒ ÙØ§Ú©ØªÙˆØ± Ùˆ Ø¨Ø±Ú¯Ø´Øª ÙØ±ÙˆØ´"],
    pty: ["Ø§Ø´Ø®Ø§Øµ", "Ø·Ø±Ù Ø­Ø³Ø§Ø¨ Ù‡Ø§ Ùˆ Ø§Ø·Ù„Ø§Ø¹Ø§Øª Ù¾Ø§ÛŒÙ‡ Ø§Ø´Ø®Ø§Øµ"],
    gnr: ["Ø¹Ù…ÙˆÙ…ÛŒ", "Ø§Ø·Ù„Ø§Ø¹Ø§Øª Ù¾Ø§ÛŒÙ‡ Ùˆ ØªÙ†Ø¸ÛŒÙ…Ø§Øª Ù…Ø´ØªØ±Ú©"],
    fmk: ["Ú†Ø§Ø±Ú†ÙˆØ¨ Ø³ÛŒØ³ØªÙ…", "Ú©Ø§Ø±Ø¨Ø±Ø§Ù†ØŒ Ù†Ù‚Ø´ Ù‡Ø§ØŒ ØªÙ†Ø¸ÛŒÙ…Ø§Øª Ùˆ Ø²ÛŒØ±Ø³Ø§Ø®Øª"],
    pay: ["Ø­Ù‚ÙˆÙ‚ Ùˆ Ø¯Ø³ØªÙ…Ø²Ø¯", "Ù¾Ø±Ø³Ù†Ù„ØŒ Ø§Ø­Ú©Ø§Ù…ØŒ Ú©Ø§Ø±Ú©Ø±Ø¯ Ùˆ Ù¾Ø±Ø¯Ø§Ø®Øª"],
    ast: ["Ø¯Ø§Ø±Ø§ÛŒÛŒ Ø«Ø§Ø¨Øª", "Ø¯Ø§Ø±Ø§ÛŒÛŒ Ù‡Ø§ØŒ Ø§Ø³ØªÙ‡Ù„Ø§Ú© Ùˆ Ø¹Ù…Ù„ÛŒØ§Øª Ø¯Ø§Ø±Ø§ÛŒÛŒ"],
    cnt: ["Ù‚Ø±Ø§Ø±Ø¯Ø§Ø¯Ù‡Ø§", "Ù‚Ø±Ø§Ø±Ø¯Ø§Ø¯Ù‡Ø§ Ùˆ Ø¹Ù…Ù„ÛŒØ§Øª Ù…Ø±ØªØ¨Ø·"],
    msg: ["Ù¾ÛŒØ§Ù… Ù‡Ø§", "Ù¾ÛŒØ§Ù… Ù‡Ø§ Ùˆ Ø§Ø¹Ù„Ø§Ù† Ù‡Ø§ÛŒ Ø³ÛŒØ³ØªÙ…"],
    scd: ["Ø²Ù…Ø§Ù† Ø¨Ù†Ø¯ÛŒ", "Ø¨Ø±Ù†Ø§Ù…Ù‡ Ù‡Ø§ Ùˆ Ø²Ù…Ø§Ù† Ø¨Ù†Ø¯ÛŒ Ø¹Ù…Ù„ÛŒØ§Øª"],
    wko: ["ØªÙˆÙ„ÛŒØ¯", "ÙØ±Ù…ÙˆÙ„ØŒ Ø³ÙØ§Ø±Ø´ Ùˆ Ø¹Ù…Ù„ÛŒØ§Øª ØªÙˆÙ„ÛŒØ¯"],
    pos: ["ÙØ±ÙˆØ´Ú¯Ø§Ù‡ÛŒ", "Ø§Ø·Ù„Ø§Ø¹Ø§Øª Ùˆ Ø¹Ù…Ù„ÛŒØ§Øª ÙØ±ÙˆØ´Ú¯Ø§Ù‡ÛŒ"]
  };
  const columnLabels = {
    Id: "Ø´Ù†Ø§Ø³Ù‡",
    Code: "Ú©Ø¯",
    Number: "Ø´Ù…Ø§Ø±Ù‡",
    Title: "Ø¹Ù†ÙˆØ§Ù†",
    Title_En: "Ø¹Ù†ÙˆØ§Ù† Ø§Ù†Ú¯Ù„ÛŒØ³ÛŒ",
    Name: "Ù†Ø§Ù…",
    Type: "Ù†ÙˆØ¹",
    State: "ÙˆØ¶Ø¹ÛŒØª",
    Status: "ÙˆØ¶Ø¹ÛŒØª",
    Date: "ØªØ§Ø±ÛŒØ®",
    Description: "Ø´Ø±Ø­",
    Description_En: "Ø´Ø±Ø­ Ø§Ù†Ú¯Ù„ÛŒØ³ÛŒ",
    IsActive: "ÙØ¹Ø§Ù„",
    Version: "Ù†Ø³Ø®Ù‡",
    Creator: "Ø§ÛŒØ¬Ø§Ø¯ Ú©Ù†Ù†Ø¯Ù‡",
    CreationDate: "ØªØ§Ø±ÛŒØ® Ø§ÛŒØ¬Ø§Ø¯",
    LastModifier: "Ø¢Ø®Ø±ÛŒÙ† ÙˆÛŒØ±Ø§ÛŒØ´Ú¯Ø±",
    LastModificationDate: "ØªØ§Ø±ÛŒØ® Ø¢Ø®Ø±ÛŒÙ† ÙˆÛŒØ±Ø§ÛŒØ´",
    FiscalYearRef: "Ø³Ø§Ù„ Ù…Ø§Ù„ÛŒ",
    AccountId: "Ø´Ù†Ø§Ø³Ù‡ Ø­Ø³Ø§Ø¨",
    AccountRef: "Ø­Ø³Ø§Ø¨",
    AccountSLRef: "Ø­Ø³Ø§Ø¨ Ù…Ø¹ÛŒÙ†",
    ParentAccountRef: "Ø­Ø³Ø§Ø¨ ÙˆØ§Ù„Ø¯",
    DLId: "Ø´Ù†Ø§Ø³Ù‡ ØªÙØµÛŒÙ„ÛŒ",
    DLRef: "ØªÙØµÛŒÙ„ÛŒ",
    DlRef: "ØªÙØµÛŒÙ„ÛŒ",
    VoucherId: "Ø´Ù†Ø§Ø³Ù‡ Ø³Ù†Ø¯",
    VoucherRef: "Ø³Ù†Ø¯",
    VoucherItemId: "Ø´Ù†Ø§Ø³Ù‡ Ø¢Ø±ØªÛŒÚ©Ù„",
    RowNumber: "Ø´Ù…Ø§Ø±Ù‡ Ø±Ø¯ÛŒÙ",
    ReferenceNumber: "Ø´Ù…Ø§Ø±Ù‡ Ø¹Ø·Ù",
    SecondaryNumber: "Ø´Ù…Ø§Ø±Ù‡ ÙØ±Ø¹ÛŒ",
    DailyNumber: "Ø´Ù…Ø§Ø±Ù‡ Ø±ÙˆØ²Ø§Ù†Ù‡",
    Debit: "Ø¨Ø¯Ù‡Ú©Ø§Ø±",
    Credit: "Ø¨Ø³ØªØ§Ù†Ú©Ø§Ø±",
    Balance: "Ù…Ø§Ù†Ø¯Ù‡",
    BalanceType: "Ù†ÙˆØ¹ Ù…Ø§Ù†Ø¯Ù‡",
    OpeningBalance: "Ù…Ø§Ù†Ø¯Ù‡ Ø§Ø¨ØªØ¯Ø§ÛŒ Ø¯ÙˆØ±Ù‡",
    CurrencyRef: "Ø§Ø±Ø²",
    CurrencyRate: "Ù†Ø±Ø® Ø§Ø±Ø²",
    CurrencyDebit: "Ø¨Ø¯Ù‡Ú©Ø§Ø± Ø§Ø±Ø²ÛŒ",
    CurrencyCredit: "Ø¨Ø³ØªØ§Ù†Ú©Ø§Ø± Ø§Ø±Ø²ÛŒ",
    TrackingNumber: "Ø´Ù…Ø§Ø±Ù‡ Ù¾ÛŒÚ¯ÛŒØ±ÛŒ",
    TrackingDate: "ØªØ§Ø±ÛŒØ® Ù¾ÛŒÚ¯ÛŒØ±ÛŒ",
    IssuerSystem: "Ø³ÛŒØ³ØªÙ… ØµØ§Ø¯Ø±Ú©Ù†Ù†Ø¯Ù‡",
    IssuerEntityName: "Ù†Ø§Ù… Ù…ÙˆØ¬ÙˆØ¯ÛŒØª ØµØ§Ø¯Ø±Ú©Ù†Ù†Ø¯Ù‡",
    IssuerEntityRef: "Ù…Ø±Ø¬Ø¹ Ù…ÙˆØ¬ÙˆØ¯ÛŒØª ØµØ§Ø¯Ø±Ú©Ù†Ù†Ø¯Ù‡",
    BankId: "Ø´Ù†Ø§Ø³Ù‡ Ø¨Ø§Ù†Ú©",
    BankRef: "Ø¨Ø§Ù†Ú©",
    BankBranchRef: "Ø´Ø¹Ø¨Ù‡ Ø¨Ø§Ù†Ú©",
    BankAccountId: "Ø´Ù†Ø§Ø³Ù‡ Ø­Ø³Ø§Ø¨ Ø¨Ø§Ù†Ú©ÛŒ",
    BankAccountRef: "Ø­Ø³Ø§Ø¨ Ø¨Ø§Ù†Ú©ÛŒ",
    AccountNo: "Ø´Ù…Ø§Ø±Ù‡ Ø­Ø³Ø§Ø¨",
    ChequeNo: "Ø´Ù…Ø§Ø±Ù‡ Ú†Ú©",
    Amount: "Ù…Ø¨Ù„Øº",
    Price: "Ù‚ÛŒÙ…Øª",
    Quantity: "ØªØ¹Ø¯Ø§Ø¯",
    Rate: "Ù†Ø±Ø®",
    PartyRef: "Ø·Ø±Ù Ø­Ø³Ø§Ø¨",
    CustomerPartyRef: "Ù…Ø´ØªØ±ÛŒ",
    SupplierPartyRef: "ØªØ§Ù…ÛŒÙ† Ú©Ù†Ù†Ø¯Ù‡",
    ItemRef: "Ú©Ø§Ù„Ø§/Ø®Ø¯Ù…Øª",
    ProductRef: "Ù…Ø­ØµÙˆÙ„",
    UnitRef: "ÙˆØ§Ø­Ø¯",
    CostCenterRef: "Ù…Ø±Ú©Ø² Ù‡Ø²ÛŒÙ†Ù‡"
    ,
    FiscalYearId: "Ø´Ù†Ø§Ø³Ù‡ Ø³Ø§Ù„ Ù…Ø§Ù„ÛŒ",
    StartDate: "ØªØ§Ø±ÛŒØ® Ø´Ø±ÙˆØ¹",
    EndDate: "ØªØ§Ø±ÛŒØ® Ù¾Ø§ÛŒØ§Ù†",
    CurrencyId: "Ø´Ù†Ø§Ø³Ù‡ Ø§Ø±Ø²",
    PrecisionCount: "ØªØ¹Ø¯Ø§Ø¯ Ø§Ø¹Ø´Ø§Ø±",
    ExchangeRate: "Ù†Ø±Ø® ØªØ¨Ø¯ÛŒÙ„",
    PartyId: "Ø´Ù†Ø§Ø³Ù‡ Ø·Ø±Ù Ø­Ø³Ø§Ø¨",
    FirstName: "Ù†Ø§Ù…",
    LastName: "Ù†Ø§Ù… Ø®Ø§Ù†ÙˆØ§Ø¯Ú¯ÛŒ",
    FullName: "Ù†Ø§Ù… Ú©Ø§Ù…Ù„",
    NationalId: "Ø´Ù†Ø§Ø³Ù‡ Ù…Ù„ÛŒ",
    EconomicCode: "Ú©Ø¯ Ø§Ù‚ØªØµØ§Ø¯ÛŒ",
    Phone: "ØªÙ„ÙÙ†",
    Mobile: "Ù…ÙˆØ¨Ø§ÛŒÙ„",
    Address: "Ù†Ø´Ø§Ù†ÛŒ",
    LocationId: "Ø´Ù†Ø§Ø³Ù‡ Ù…Ø­Ù„",
    ParentLocationRef: "Ù…Ø­Ù„ ÙˆØ§Ù„Ø¯",
    DebitCreditNoteId: "Ø´Ù†Ø§Ø³Ù‡ Ø§Ø¹Ù„Ø§Ù…ÛŒÙ‡",
    DebitCreditNoteItemId: "Ø´Ù†Ø§Ø³Ù‡ Ø¢ÛŒØªÙ… Ø§Ø¹Ù„Ø§Ù…ÛŒÙ‡",
    InvoiceId: "Ø´Ù†Ø§Ø³Ù‡ ÙØ§Ú©ØªÙˆØ±",
    InvoiceRef: "ÙØ§Ú©ØªÙˆØ±",
    InvoiceItemId: "Ø´Ù†Ø§Ø³Ù‡ Ø¢ÛŒØªÙ… ÙØ§Ú©ØªÙˆØ±",
    CommissionCalculationId: "Ø´Ù†Ø§Ø³Ù‡ Ù…Ø­Ø§Ø³Ø¨Ù‡ Ù¾ÙˆØ±Ø³Ø§Ù†Øª",
    CommissionCalculationRef: "Ù…Ø­Ø§Ø³Ø¨Ù‡ Ù¾ÙˆØ±Ø³Ø§Ù†Øª",
    CommissionCalculationItemId: "Ø´Ù†Ø§Ø³Ù‡ Ø¢ÛŒØªÙ… Ù…Ø­Ø§Ø³Ø¨Ù‡ Ù¾ÙˆØ±Ø³Ø§Ù†Øª",
    NetPrice: "Ù…Ø¨Ù„Øº Ø®Ø§Ù„Øµ",
    Discount: "ØªØ®ÙÛŒÙ",
    Tax: "Ù…Ø§Ù„ÛŒØ§Øª",
    Duty: "Ø¹ÙˆØ§Ø±Ø¶",
    TotalAmount: "Ù…Ø¨Ù„Øº Ú©Ù„"
  };
  const tableLabels = {
    "ACC.Account": ["Ø³Ø±ÙØµÙ„ Ø­Ø³Ø§Ø¨ Ù‡Ø§", "Ø§Ø·Ù„Ø§Ø¹Ø§Øª Ù¾Ø§ÛŒÙ‡"],
    "ACC.AccountTopic": ["Ø§Ø±ØªØ¨Ø§Ø· Ø­Ø³Ø§Ø¨ Ùˆ Ø³Ø±ÙØµÙ„ Ù…Ø§Ù„ÛŒØ§ØªÛŒ", "Ø§Ø·Ù„Ø§Ø¹Ø§Øª Ù¾Ø§ÛŒÙ‡"],
    "ACC.DL": ["ØªÙØµÛŒÙ„ÛŒ Ù‡Ø§", "Ø§Ø·Ù„Ø§Ø¹Ø§Øª Ù¾Ø§ÛŒÙ‡"],
    "ACC.Topic": ["Ø³Ø±ÙØµÙ„ Ù‡Ø§ÛŒ Ù…Ø§Ù„ÛŒØ§ØªÛŒ", "Ø§Ø·Ù„Ø§Ø¹Ø§Øª Ù¾Ø§ÛŒÙ‡"],
    "ACC.Voucher": ["Ø§Ø³Ù†Ø§Ø¯ Ø­Ø³Ø§Ø¨Ø¯Ø§Ø±ÛŒ", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "ACC.VoucherItem": ["Ø¢Ø±ØªÛŒÚ©Ù„ Ù‡Ø§ÛŒ Ø³Ù†Ø¯", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "ACC.GLVoucher": ["Ø§Ø³Ù†Ø§Ø¯ Ø¯ÙØªØ± Ú©Ù„", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "ACC.GLVoucherItem": ["Ø¢ÛŒØªÙ… Ù‡Ø§ÛŒ Ø¯ÙØªØ± Ú©Ù„", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "ACC.MergedVoucherReferenceNumber": ["Ø´Ù…Ø§Ø±Ù‡ Ø¹Ø·Ù Ø§Ø³Ù†Ø§Ø¯ ØªØ¬Ù…ÛŒØ¹ÛŒ", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "ACC.OpeningOperation": ["Ø¹Ù…Ù„ÛŒØ§Øª Ø§ÙØªØªØ§Ø­ÛŒÙ‡", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "ACC.OpeningOperationItem": ["Ø¢ÛŒØªÙ… Ù‡Ø§ÛŒ Ø§ÙØªØªØ§Ø­ÛŒÙ‡", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "RPA.AccountType": ["Ù†ÙˆØ¹ Ø­Ø³Ø§Ø¨ Ø®Ø²Ø§Ù†Ù‡", "Ø§Ø·Ù„Ø§Ø¹Ø§Øª Ù¾Ø§ÛŒÙ‡"],
    "RPA.Bank": ["Ø¨Ø§Ù†Ú© Ù‡Ø§", "Ø§Ø·Ù„Ø§Ø¹Ø§Øª Ù¾Ø§ÛŒÙ‡"],
    "RPA.BankBranch": ["Ø´Ø¹Ø¨ Ø¨Ø§Ù†Ú©", "Ø§Ø·Ù„Ø§Ø¹Ø§Øª Ù¾Ø§ÛŒÙ‡"],
    "RPA.BankAccount": ["Ø­Ø³Ø§Ø¨ Ù‡Ø§ÛŒ Ø¨Ø§Ù†Ú©ÛŒ", "Ø§Ø·Ù„Ø§Ø¹Ø§Øª Ù¾Ø§ÛŒÙ‡"],
    "RPA.Cash": ["ØµÙ†Ø¯ÙˆÙ‚ Ù‡Ø§", "Ø§Ø·Ù„Ø§Ø¹Ø§Øª Ù¾Ø§ÛŒÙ‡"],
    "RPA.PettyCash": ["ØªÙ†Ø®ÙˆØ§Ù‡ Ú¯Ø±Ø¯Ø§Ù† Ù‡Ø§", "Ø§Ø·Ù„Ø§Ø¹Ø§Øª Ù¾Ø§ÛŒÙ‡"],
    "RPA.Pos": ["Ø¯Ø³ØªÚ¯Ø§Ù‡ Ù‡Ø§ÛŒ Ú©Ø§Ø±Øª Ø®ÙˆØ§Ù†", "Ø§Ø·Ù„Ø§Ø¹Ø§Øª Ù¾Ø§ÛŒÙ‡"],
    "RPA.ChequeBook": ["Ø¯Ø³ØªÙ‡ Ú†Ú© Ù‡Ø§", "Ø§Ø·Ù„Ø§Ø¹Ø§Øª Ù¾Ø§ÛŒÙ‡"],
    "RPA.DocSpecification": ["Ù…Ø´Ø®ØµØ§Øª Ø§Ø³Ù†Ø§Ø¯ Ø®Ø²Ø§Ù†Ù‡", "Ø§Ø·Ù„Ø§Ø¹Ø§Øª Ù¾Ø§ÛŒÙ‡"],
    "RPA.BankAccountBalance": ["Ù…Ø§Ù†Ø¯Ù‡ Ø­Ø³Ø§Ø¨ Ø¨Ø§Ù†Ú©ÛŒ", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "RPA.CashBalance": ["Ù…Ø§Ù†Ø¯Ù‡ ØµÙ†Ø¯ÙˆÙ‚", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "RPA.PosBalance": ["Ù…Ø§Ù†Ø¯Ù‡ Ú©Ø§Ø±Øª Ø®ÙˆØ§Ù†", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "RPA.BankBill": ["ØµÙˆØ±ØªØ­Ø³Ø§Ø¨ Ø¨Ø§Ù†Ú©ÛŒ", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "RPA.BankBillItem": ["Ø¢ÛŒØªÙ… Ù‡Ø§ÛŒ ØµÙˆØ±ØªØ­Ø³Ø§Ø¨ Ø¨Ø§Ù†Ú©ÛŒ", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "RPA.PettyCashBill": ["ØµÙˆØ±Øª Ù‡Ø²ÛŒÙ†Ù‡ ØªÙ†Ø®ÙˆØ§Ù‡", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "RPA.PettyCashBillItem": ["Ø¢ÛŒØªÙ… Ù‡Ø§ÛŒ ØµÙˆØ±Øª Ù‡Ø²ÛŒÙ†Ù‡ ØªÙ†Ø®ÙˆØ§Ù‡", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "RPA.ReceiptHeader": ["Ø¯Ø±ÛŒØ§ÙØª Ù‡Ø§", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "RPA.ReceiptCheque": ["Ú†Ú© Ù‡Ø§ÛŒ Ø¯Ø±ÛŒØ§ÙØªÛŒ", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "RPA.ReceiptChequeBanking": ["ÙˆØ§Ú¯Ø°Ø§Ø±ÛŒ Ú†Ú© Ø¯Ø±ÛŒØ§ÙØªÛŒ", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "RPA.ReceiptChequeBankingItem": ["Ø¢ÛŒØªÙ… Ù‡Ø§ÛŒ ÙˆØ§Ú¯Ø°Ø§Ø±ÛŒ Ú†Ú© Ø¯Ø±ÛŒØ§ÙØªÛŒ", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "RPA.ReceiptChequeHistory": ["Ø³ÙˆØ§Ø¨Ù‚ Ú†Ú© Ø¯Ø±ÛŒØ§ÙØªÛŒ", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "RPA.ReceiptDraft": ["Ø­ÙˆØ§Ù„Ù‡ Ù‡Ø§ÛŒ Ø¯Ø±ÛŒØ§ÙØª", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "RPA.ReceiptPettyCash": ["Ø¯Ø±ÛŒØ§ÙØª ØªÙ†Ø®ÙˆØ§Ù‡", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "RPA.ReceiptPos": ["Ø¯Ø±ÛŒØ§ÙØª Ú©Ø§Ø±Øª Ø®ÙˆØ§Ù†", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "RPA.PaymentHeader": ["Ù¾Ø±Ø¯Ø§Ø®Øª Ù‡Ø§", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "RPA.PaymentCheque": ["Ú†Ú© Ù‡Ø§ÛŒ Ù¾Ø±Ø¯Ø§Ø®ØªÛŒ", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "RPA.PaymentChequeBanking": ["Ø¹Ù…Ù„ÛŒØ§Øª Ø¨Ø§Ù†Ú©ÛŒ Ú†Ú© Ù¾Ø±Ø¯Ø§Ø®ØªÛŒ", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "RPA.PaymentChequeBankingItem": ["Ø¢ÛŒØªÙ… Ù‡Ø§ÛŒ Ø¹Ù…Ù„ÛŒØ§Øª Ø¨Ø§Ù†Ú©ÛŒ Ú†Ú© Ù¾Ø±Ø¯Ø§Ø®ØªÛŒ", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "RPA.PaymentChequeHistory": ["Ø³ÙˆØ§Ø¨Ù‚ Ú†Ú© Ù¾Ø±Ø¯Ø§Ø®ØªÛŒ", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "RPA.PaymentChequeOther": ["Ø³Ø§ÛŒØ± Ø¹Ù…Ù„ÛŒØ§Øª Ú†Ú© Ù¾Ø±Ø¯Ø§Ø®ØªÛŒ", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "RPA.PaymentDraft": ["Ø­ÙˆØ§Ù„Ù‡ Ù‡Ø§ÛŒ Ù¾Ø±Ø¯Ø§Ø®Øª", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "RPA.PartySettlement": ["ØªØ³ÙˆÛŒÙ‡ Ø·Ø±Ù Ø­Ø³Ø§Ø¨", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "RPA.PartySettlementItem": ["Ø¢ÛŒØªÙ… Ù‡Ø§ÛŒ ØªØ³ÙˆÛŒÙ‡ Ø·Ø±Ù Ø­Ø³Ø§Ø¨", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "RPA.PartyAccountSettlement": ["ØªØ³ÙˆÛŒÙ‡ Ø­Ø³Ø§Ø¨ Ø·Ø±Ù Ø­Ø³Ø§Ø¨", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "RPA.PartyAccountSettlementItem": ["Ø¢ÛŒØªÙ… Ù‡Ø§ÛŒ ØªØ³ÙˆÛŒÙ‡ Ø­Ø³Ø§Ø¨ Ø·Ø±Ù Ø­Ø³Ø§Ø¨", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "RPA.PosSettlement": ["ØªØ³ÙˆÛŒÙ‡ Ú©Ø§Ø±Øª Ø®ÙˆØ§Ù†", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "RPA.PosSettlementReceipt": ["Ø±Ø³ÛŒØ¯Ù‡Ø§ÛŒ ØªØ³ÙˆÛŒÙ‡ Ú©Ø§Ø±Øª Ø®ÙˆØ§Ù†", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "RPA.Reconciliation": ["Ù…ØºØ§ÛŒØ±Øª Ú¯ÛŒØ±ÛŒ Ø¨Ø§Ù†Ú©ÛŒ", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "RPA.ReconciliationBankItem": ["Ø§Ù‚Ù„Ø§Ù… Ø¨Ø§Ù†Ú© Ø¯Ø± Ù…ØºØ§ÛŒØ±Øª Ú¯ÛŒØ±ÛŒ", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "RPA.ReconciliationItem": ["Ø§Ù‚Ù„Ø§Ù… Ø³ÛŒØ³ØªÙ… Ø¯Ø± Ù…ØºØ§ÛŒØ±Øª Ú¯ÛŒØ±ÛŒ", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "RPA.RefundCheque": ["Ø§Ø³ØªØ±Ø¯Ø§Ø¯ Ú†Ú©", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "RPA.RefundChequeItem": ["Ø¢ÛŒØªÙ… Ù‡Ø§ÛŒ Ø§Ø³ØªØ±Ø¯Ø§Ø¯ Ú†Ú©", "Ø¹Ù…Ù„ÛŒØ§Øª"],
    "FMK.FiscalYear": ["Ø³Ø§Ù„ Ù…Ø§Ù„ÛŒ", "Ø§Ø·Ù„Ø§Ø¹Ø§Øª Ù¾Ø§ÛŒÙ‡ ÙˆØ§Ø¨Ø³ØªÙ‡"],
    "GNR.Currency": ["Ø§Ø±Ø²Ù‡Ø§", "Ø§Ø·Ù„Ø§Ø¹Ø§Øª Ù¾Ø§ÛŒÙ‡ ÙˆØ§Ø¨Ø³ØªÙ‡"],
    "GNR.Party": ["Ø·Ø±Ù Ø­Ø³Ø§Ø¨ Ù‡Ø§", "Ø§Ø·Ù„Ø§Ø¹Ø§Øª Ù¾Ø§ÛŒÙ‡ ÙˆØ§Ø¨Ø³ØªÙ‡"],
    "GNR.Location": ["Ù…Ù†Ø§Ø·Ù‚ Ùˆ Ù…Ø­Ù„ Ù‡Ø§", "Ø§Ø·Ù„Ø§Ø¹Ø§Øª Ù¾Ø§ÛŒÙ‡ ÙˆØ§Ø¨Ø³ØªÙ‡"],
    "GNR.DebitCreditNote": ["Ø§Ø¹Ù„Ø§Ù…ÛŒÙ‡ Ø¨Ø¯Ù‡Ú©Ø§Ø±/Ø¨Ø³ØªØ§Ù†Ú©Ø§Ø±", "Ø¹Ù…Ù„ÛŒØ§Øª ÙˆØ§Ø¨Ø³ØªÙ‡"],
    "GNR.DebitCreditNoteItem": ["Ø¢ÛŒØªÙ… Ù‡Ø§ÛŒ Ø§Ø¹Ù„Ø§Ù…ÛŒÙ‡ Ø¨Ø¯Ù‡Ú©Ø§Ø±/Ø¨Ø³ØªØ§Ù†Ú©Ø§Ø±", "Ø¹Ù…Ù„ÛŒØ§Øª ÙˆØ§Ø¨Ø³ØªÙ‡"],
    "SLS.Invoice": ["ÙØ§Ú©ØªÙˆØ±Ù‡Ø§ÛŒ ÙØ±ÙˆØ´", "Ø¹Ù…Ù„ÛŒØ§Øª ÙˆØ§Ø¨Ø³ØªÙ‡"],
    "SLS.InvoiceItem": ["Ø¢ÛŒØªÙ… Ù‡Ø§ÛŒ ÙØ§Ú©ØªÙˆØ± ÙØ±ÙˆØ´", "Ø¹Ù…Ù„ÛŒØ§Øª ÙˆØ§Ø¨Ø³ØªÙ‡"],
    "SLS.CommissionCalculation": ["Ù…Ø­Ø§Ø³Ø¨Ø§Øª Ù¾ÙˆØ±Ø³Ø§Ù†Øª", "Ø¹Ù…Ù„ÛŒØ§Øª ÙˆØ§Ø¨Ø³ØªÙ‡"],
    "SLS.CommissionCalculationItem": ["Ø¢ÛŒØªÙ… Ù‡Ø§ÛŒ Ù…Ø­Ø§Ø³Ø¨Ù‡ Ù¾ÙˆØ±Ø³Ø§Ù†Øª", "Ø¹Ù…Ù„ÛŒØ§Øª ÙˆØ§Ø¨Ø³ØªÙ‡"]
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
      alert("Ø«Ø¨Øª Ø±Ú©ÙˆØ±Ø¯ Ø¬Ø¯ÛŒØ¯ Ø¨Ø±Ø§ÛŒ Ø¯ÛŒØªØ§Ø¨ÛŒØ³ Ø¹Ù…Ù„ÛŒØ§ØªÛŒ ÙØ¹Ø§Ù„ Ù†Ø´Ø¯Ù‡ Ø§Ø³Øª. Ø§Ø¨ØªØ¯Ø§ Ù…Ø¯Ù„ Ú©Ù„ÛŒØ¯Ù‡Ø§ Ùˆ Ù…Ù‚Ø§Ø¯ÛŒØ± Ù¾ÛŒØ´ ÙØ±Ø¶ Ù‡Ø± Ø¬Ø¯ÙˆÙ„ Ø¨Ø§ÛŒØ¯ Ù…Ø´Ø®Øµ Ø´ÙˆØ¯.");
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
    document.title = "Ø³Ù¾ÛŒØ¯Ø§Ø± | Ø­Ø³Ø§Ø¨Ø¯Ø§Ø±ÛŒ Ùˆ Ø®Ø²Ø§Ù†Ù‡ Ø¯Ø§Ø±ÛŒ";
    document.querySelector(".brand h1").textContent = "Ø³Ù¾ÛŒØ¯Ø§Ø±";
    document.querySelector(".brand p").textContent = "Ø­Ø³Ø§Ø¨Ø¯Ø§Ø±ÛŒ Ùˆ Ø®Ø²Ø§Ù†Ù‡ Ø¯Ø§Ø±ÛŒ";
    document.querySelector(".eyebrow").textContent = "Ø§ØªØµØ§Ù„ Ù…Ø³ØªÙ‚ÛŒÙ… Ø¨Ù‡ SQL Server: sepidAI_Analysis_New";
    el.searchInput.placeholder = "Ø¬Ø³ØªØ¬Ùˆ Ø¯Ø± Ø¬Ø¯ÙˆÙ„ Ø¬Ø§Ø±ÛŒ...";
    document.querySelector("label[for='searchInput']").textContent = "Ø¬Ø³ØªØ¬Ùˆ";
    document.querySelector("label[for='fieldFilter']").textContent = "ÙÛŒÙ„ØªØ± Ø³ØªÙˆÙ†";
    document.querySelector("label[for='valueFilter']").textContent = "Ù…Ù‚Ø¯Ø§Ø± ÙÛŒÙ„ØªØ±";
    el.addBtn.textContent = "Ø±Ú©ÙˆØ±Ø¯ Ø¬Ø¯ÛŒØ¯";
    document.getElementById("tableHint").textContent = "Ù…Ø±ØªØ¨ Ø³Ø§Ø²ÛŒ Ùˆ Ø¬Ø³ØªØ¬Ùˆ Ø³Ù…Øª Ø³Ø±ÙˆØ± Ø§Ù†Ø¬Ø§Ù… Ù…ÛŒ Ø´ÙˆØ¯Ø› ÙÛŒÙ„ØªØ± Ø³ØªÙˆÙ† Ø±ÙˆÛŒ ØµÙØ­Ù‡ Ø¬Ø§Ø±ÛŒ Ø§Ø¹Ù…Ø§Ù„ Ù…ÛŒ Ø´ÙˆØ¯.";
    renderMenuCollapsed();
    renderGridFullscreen();
  }

  async function loadSchema() {
    setLoading("Ø¯Ø± Ø­Ø§Ù„ Ø®ÙˆØ§Ù†Ø¯Ù† Ø³Ø§Ø®ØªØ§Ø± Ø¯ÛŒØªØ§Ø¨ÛŒØ³...");
    state.catalog = await apiGet("/api/schema");
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
      btn.innerHTML = `<strong>${escapeHtml(moduleTitle(module))}</strong><span>${escapeHtml(moduleSubtitle(module))} Â· ${toFaNumber(module.tables.length)} Ø¬Ø¯ÙˆÙ„</span>`;
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
  }

  function renderTabs() {
    const module = getActiveModule();
    el.pageTitle.textContent = module ? moduleTitle(module) : "Ø¬Ø¯ÙˆÙ„ Ù‡Ø§";
    el.moduleTabs.innerHTML = "";
    const groups = groupTables(module?.tables || []);
    groups.forEach((group) => {
      const section = document.createElement("div");
      section.className = "tab-section";

      const heading = document.createElement("div");
      heading.className = "tab-section-title";
      heading.textContent = `${group.title} Â· ${toFaNumber(group.tables.length)} ØµÙØ­Ù‡`;
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
    setLoading("Ø¯Ø± Ø­Ø§Ù„ Ø®ÙˆØ§Ù†Ø¯Ù† Ø¯Ø§Ø¯Ù‡ Ù‡Ø§...");
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
    el.activeTableName.textContent = table ? `${tableTitle(table)} Â· ${toFaNumber(state.total)} Ø±Ú©ÙˆØ±Ø¯` : "-";
    el.fieldFilter.innerHTML = `<option value="">Ù‡Ù…Ù‡ Ø³ØªÙˆÙ† Ù‡Ø§</option>`;
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
      th.textContent = fieldLabel(field);
      th.title = `${field.name} / ${field.sqlType}${field.primaryKey ? " / Ú©Ù„ÛŒØ¯ Ø§ØµÙ„ÛŒ" : ""}`;
      th.addEventListener("click", async () => {
        if (state.sort.field === field.name) {
          state.sort.direction = state.sort.direction === "asc" ? "desc" : "asc";
        } else {
          state.sort = { field: field.name, direction: "asc" };
        }
        await loadRows();
      });
      if (state.sort.field === field.name) {
        th.dataset.sort = state.sort.direction === "asc" ? " â†‘" : " â†“";
      }
      headRow.appendChild(th);
    });
    el.tableHead.appendChild(headRow);

    if (!rows.length) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = Math.max(1, fields.length);
      td.className = "empty-cell";
      td.textContent = "Ø¯Ø§Ø¯Ù‡ Ø§ÛŒ Ø¨Ø±Ø§ÛŒ Ù†Ù…Ø§ÛŒØ´ ÙˆØ¬ÙˆØ¯ Ù†Ø¯Ø§Ø±Ø¯.";
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
    text.textContent = `${toFaNumber(visibleCount)} Ù†Ù…Ø§ÛŒØ´ Ø¯Ø§Ø¯Ù‡ Ø´Ø¯Ù‡ Ø§Ø² ${toFaNumber(state.total)} Ø±Ú©ÙˆØ±Ø¯ Â· ØµÙØ­Ù‡ ${toFaNumber(state.page)} Ø§Ø² ${toFaNumber(totalPages)}`;
    el.recordCount.appendChild(text);

    const prev = document.createElement("button");
    prev.type = "button";
    prev.className = "secondary-btn";
    prev.textContent = "Ù‚Ø¨Ù„ÛŒ";
    prev.disabled = state.page <= 1;
    prev.addEventListener("click", async () => {
      state.page = Math.max(1, state.page - 1);
      await loadRows();
    });

    const next = document.createElement("button");
    next.type = "button";
    next.className = "secondary-btn";
    next.textContent = "Ø¨Ø¹Ø¯ÛŒ";
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
      el.formMode.textContent = "ÛŒÚ© Ø±Ø¯ÛŒÙ Ø±Ø§ Ø§Ø² Ø¬Ø¯ÙˆÙ„ Ø§Ù†ØªØ®Ø§Ø¨ Ú©Ù†ÛŒØ¯.";
      return;
    }

    el.formMode.textContent = state.primaryKey.length
      ? "ÙˆÛŒØ±Ø§ÛŒØ´ Ø±Ú©ÙˆØ±Ø¯ Ø§Ù†ØªØ®Ø§Ø¨ Ø´Ø¯Ù‡"
      : "Ø§ÛŒÙ† Ø¬Ø¯ÙˆÙ„ Ú©Ù„ÛŒØ¯ Ø§ØµÙ„ÛŒ Ù†Ø¯Ø§Ø±Ø¯Ø› Ø°Ø®ÛŒØ±Ù‡ ØºÛŒØ±ÙØ¹Ø§Ù„ Ø§Ø³Øª.";

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
        input.innerHTML = `<option value="true">Ø¯Ø±Ø³Øª</option><option value="false">Ù†Ø§Ø¯Ø±Ø³Øª</option><option value="">Ø®Ø§Ù„ÛŒ</option>`;
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
    save.textContent = "Ø°Ø®ÛŒØ±Ù‡ ØªØºÛŒÛŒØ±Ø§Øª";
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
    el.formMode.textContent = "ØªØºÛŒÛŒØ±Ø§Øª Ø°Ø®ÛŒØ±Ù‡ Ø´Ø¯.";
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
    el.menuToggleBtn.textContent = state.menuCollapsed ? "Ø¨Ø§Ø² Ú©Ø±Ø¯Ù† Ù…Ù†Ùˆ" : "Ø¨Ø³ØªÙ† Ù…Ù†Ùˆ";
  }

  function toggleGridFullscreen() {
    state.gridFullscreen = !state.gridFullscreen;
    localStorage.setItem(fullscreenKey, String(state.gridFullscreen));
    renderGridFullscreen();
  }

  function renderGridFullscreen() {
    el.appShell.classList.toggle("grid-fullscreen", state.gridFullscreen);
    el.fullscreenBtn.textContent = state.gridFullscreen ? "Ù†Ù…Ø§ÛŒ Ú©Ø§Ù…Ù„: Ø±ÙˆØ´Ù†" : "Ù†Ù…Ø§ÛŒ Ú©Ø§Ù…Ù„ Ø¬Ø¯ÙˆÙ„";
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
      if (group === "Ø§Ø·Ù„Ø§Ø¹Ø§Øª Ù¾Ø§ÛŒÙ‡") master.push(table);
      else if (group === "Ø¹Ù…Ù„ÛŒØ§Øª") operations.push(table);
      else if (group === "Ø§Ø·Ù„Ø§Ø¹Ø§Øª Ù¾Ø§ÛŒÙ‡ ÙˆØ§Ø¨Ø³ØªÙ‡") dependencyMaster.push(table);
      else if (group === "Ø¹Ù…Ù„ÛŒØ§Øª ÙˆØ§Ø¨Ø³ØªÙ‡") dependencyOperations.push(table);
      else other.push(table);
    });
    return [
      { title: "Ø§Ø·Ù„Ø§Ø¹Ø§Øª Ù¾Ø§ÛŒÙ‡", tables: master },
      { title: "Ø¹Ù…Ù„ÛŒØ§Øª", tables: operations },
      { title: "Ø§Ø·Ù„Ø§Ø¹Ø§Øª Ù¾Ø§ÛŒÙ‡ ÙˆØ§Ø¨Ø³ØªÙ‡ Ø¨Ù‡ Ø­Ø³Ø§Ø¨Ø¯Ø§Ø±ÛŒ Ùˆ Ø®Ø²Ø§Ù†Ù‡", tables: dependencyMaster },
      { title: "Ø¹Ù…Ù„ÛŒØ§Øª ÙˆØ§Ø¨Ø³ØªÙ‡ Ø¨Ù‡ Ø­Ø³Ø§Ø¨Ø¯Ø§Ø±ÛŒ Ùˆ Ø®Ø²Ø§Ù†Ù‡", tables: dependencyOperations },
      { title: "Ø³Ø§ÛŒØ± Ø¬Ø¯ÙˆÙ„ Ù‡Ø§", tables: other }
    ].filter((group) => group.tables.length);
  }

  function inferTableGroup(tableName) {
    if (/Voucher|Operation|Receipt|Payment|Cheque|Settlement|Bill|Balance|Reconciliation|Refund|History/i.test(tableName)) {
      return "Ø¹Ù…Ù„ÛŒØ§Øª";
    }
    if (/Account|Bank|Branch|Cash|Pos|Type|Topic|DL|Specification|Book/i.test(tableName)) {
      return "Ø§Ø·Ù„Ø§Ø¹Ø§Øª Ù¾Ø§ÛŒÙ‡";
    }
    return "Ø³Ø§ÛŒØ±";
  }

  function tableTitle(table) {
    if (tableLabels[table.id]) return tableLabels[table.id][0];
    return splitColumnName(table.name || table.title || table.id);
  }

  function fieldLabel(field) {
    const name = field.name || field.label || "";
    if (columnLabels[name]) return columnLabels[name];

    let label = splitColumnName(name);
    label = label.replace(/\bRef\b/g, "Ù…Ø±Ø¬Ø¹");
    label = label.replace(/\bID\b/g, "Ø´Ù†Ø§Ø³Ù‡");
    label = label.replace(/\bId\b/g, "Ø´Ù†Ø§Ø³Ù‡");
    label = label.replace(/\bNo\b/g, "Ø´Ù…Ø§Ø±Ù‡");
    label = label.replace(/\bDate\b/g, "ØªØ§Ø±ÛŒØ®");
    label = label.replace(/\bAmount\b/g, "Ù…Ø¨Ù„Øº");
    label = label.replace(/\bPrice\b/g, "Ù‚ÛŒÙ…Øª");
    label = label.replace(/\bQuantity\b/g, "ØªØ¹Ø¯Ø§Ø¯");
    label = label.replace(/\bTitle\b/g, "Ø¹Ù†ÙˆØ§Ù†");
    label = label.replace(/\bCode\b/g, "Ú©Ø¯");
    label = label.replace(/\bType\b/g, "Ù†ÙˆØ¹");
    label = label.replace(/\bState\b/g, "ÙˆØ¶Ø¹ÛŒØª");
    label = label.replace(/\bStatus\b/g, "ÙˆØ¶Ø¹ÛŒØª");
    label = label.replace(/\bIs\b/g, "Ø¢ÛŒØ§");
    label = label.replace(/\bHas\b/g, "Ø¯Ø§Ø±Ø§ÛŒ");
    label = label.replace(/\bBase\b/g, "Ù…Ø¨Ù†Ø§");
    label = label.replace(/\bParent\b/g, "ÙˆØ§Ù„Ø¯");
    label = label.replace(/\bAccount\b/g, "Ø­Ø³Ø§Ø¨");
    label = label.replace(/\bBank\b/g, "Ø¨Ø§Ù†Ú©");
    label = label.replace(/\bCheque\b/g, "Ú†Ú©");
    label = label.replace(/\bVoucher\b/g, "Ø³Ù†Ø¯");
    label = label.replace(/\bItem\b/g, "Ø¢ÛŒØªÙ…");
    label = label.replace(/\bParty\b/g, "Ø´Ø®Øµ");
    label = label.replace(/\bCustomer\b/g, "Ù…Ø´ØªØ±ÛŒ");
    label = label.replace(/\bProduct\b/g, "Ù…Ø­ØµÙˆÙ„");
    label = label.replace(/\bCurrency\b/g, "Ø§Ø±Ø²");
    label = label.replace(/\bFiscalYear\b/g, "Ø³Ø§Ù„ Ù…Ø§Ù„ÛŒ");
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
    if (typeof value === "boolean") return value ? "Ø¯Ø±Ø³Øª" : "Ù†Ø§Ø¯Ø±Ø³Øª";
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
    const fa = "Û°Û±Û²Û³Û´ÛµÛ¶Û·Û¸Û¹";
    const ar = "Ù Ù¡Ù¢Ù£Ù¤Ù¥Ù¦Ù§Ù¨Ù©";
    return value.replace(/[Û°-Û¹Ù -Ù©]/g, (digit) => {
      const faIndex = fa.indexOf(digit);
      if (faIndex >= 0) return String(faIndex);
      return String(ar.indexOf(digit));
    });
  }

  function parseFormattedNumber(value) {
    const normalized = normalizeDigits(String(value || ""))
      .replace(/[,Ù¬ØŒ\s]/g, "");
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



