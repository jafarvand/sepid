(function () {
  const fullscreenKey = "sepidar-grid-fullscreen-v1";
  const moduleLabels = {
    acc: ["حسابداری", "حساب ها، تفصیلی ها، اسناد و آرتیکل ها"],
    rpa: ["خزانه داری", "بانک، صندوق، چک، دریافت، پرداخت و تسویه"],
    inv: ["انبار و کالا", "کالا، انبار، موجودی و گردش کالا"],
    sls: ["فروش", "مشتری، سفارش، فاکتور و برگشت فروش"],
    pty: ["اشخاص", "طرف حساب ها و اطلاعات پایه اشخاص"],
    gnr: ["عمومی", "اطلاعات پایه و تنظیمات مشترک"],
    fmk: ["چارچوب سیستم", "کاربران، نقش ها، تنظیمات و زیرساخت"],
    pay: ["حقوق و دستمزد", "پرسنل، احکام، کارکرد و پرداخت"],
    ast: ["دارایی ثابت", "دارایی ها، استهلاک و عملیات دارایی"],
    cnt: ["قراردادها", "قراردادها و عملیات مرتبط"],
    msg: ["پیام ها", "پیام ها و اعلان های سیستم"],
    scd: ["زمان بندی", "برنامه ها و زمان بندی عملیات"],
    wko: ["تولید", "فرمول، سفارش و عملیات تولید"],
    pos: ["فروشگاهی", "اطلاعات و عملیات فروشگاهی"]
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
    SupplierPartyRef: "تامین کننده",
    ItemRef: "کالا/خدمت",
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
    FirstName: "نام",
    LastName: "نام خانوادگی",
    FullName: "نام کامل",
    NationalId: "شناسه ملی",
    EconomicCode: "کد اقتصادی",
    Phone: "تلفن",
    Mobile: "موبایل",
    Address: "نشانی",
    LocationId: "شناسه محل",
    ParentLocationRef: "محل والد",
    DebitCreditNoteId: "شناسه اعلامیه",
    DebitCreditNoteItemId: "شناسه آیتم اعلامیه",
    InvoiceId: "شناسه فاکتور",
    InvoiceRef: "فاکتور",
    InvoiceItemId: "شناسه آیتم فاکتور",
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
    "FMK.FiscalYear": ["سال مالی", "اطلاعات پایه وابسته"],
    "GNR.Currency": ["ارزها", "اطلاعات پایه وابسته"],
    "GNR.Party": ["طرف حساب ها", "اطلاعات پایه وابسته"],
    "GNR.Location": ["مناطق و محل ها", "اطلاعات پایه وابسته"],
    "GNR.DebitCreditNote": ["اعلامیه بدهکار/بستانکار", "عملیات وابسته"],
    "GNR.DebitCreditNoteItem": ["آیتم های اعلامیه بدهکار/بستانکار", "عملیات وابسته"],
    "SLS.Invoice": ["فاکتورهای فروش", "عملیات وابسته"],
    "SLS.InvoiceItem": ["آیتم های فاکتور فروش", "عملیات وابسته"],
    "SLS.CommissionCalculation": ["محاسبات پورسانت", "عملیات وابسته"],
    "SLS.CommissionCalculationItem": ["آیتم های محاسبه پورسانت", "عملیات وابسته"]
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
    el.fullscreenBtn.addEventListener("click", toggleGridFullscreen);
    el.editorForm.addEventListener("submit", saveForm);
    el.exportBtn.addEventListener("click", exportVisibleRows);
    if (el.importInput?.closest("label")) el.importInput.closest("label").style.display = "none";
    if (el.sqlImportBtn) el.sqlImportBtn.style.display = "none";
    if (el.resetBtn) el.resetBtn.style.display = "none";
  }

  function setStaticUi() {
    document.title = "سپیدار | حسابداری و خزانه داری";
    document.querySelector(".brand h1").textContent = "سپیدار";
    document.querySelector(".brand p").textContent = "حسابداری و خزانه داری";
    document.querySelector(".eyebrow").textContent = "اتصال مستقیم به SQL Server: Sepidar_Analysis_New";
    el.searchInput.placeholder = "جستجو در جدول جاری...";
    document.querySelector("label[for='searchInput']").textContent = "جستجو";
    document.querySelector("label[for='fieldFilter']").textContent = "فیلتر ستون";
    document.querySelector("label[for='valueFilter']").textContent = "مقدار فیلتر";
    el.addBtn.textContent = "رکورد جدید";
    document.getElementById("tableHint").textContent = "مرتب سازی و جستجو سمت سرور انجام می شود؛ فیلتر ستون روی صفحه جاری اعمال می شود.";
    renderGridFullscreen();
  }

  async function loadSchema() {
    setLoading("در حال خواندن ساختار دیتابیس...");
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
      btn.innerHTML = `<strong>${escapeHtml(moduleTitle(module))}</strong><span>${escapeHtml(moduleSubtitle(module))} · ${toFaNumber(module.tables.length)} جدول</span>`;
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
    state.fields.forEach((field) => {
      const option = document.createElement("option");
      option.value = field.name;
      option.textContent = field.primaryKey ? `${fieldLabel(field)} *` : fieldLabel(field);
      el.fieldFilter.appendChild(option);
    });
  }

  function renderTable() {
    const rows = getVisibleRows();
    el.tableHead.innerHTML = "";
    el.tableBody.innerHTML = "";

    const headRow = document.createElement("tr");
    state.fields.forEach((field) => {
      const th = document.createElement("th");
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
      td.colSpan = Math.max(1, state.fields.length);
      td.className = "empty-cell";
      td.textContent = "داده ای برای نمایش وجود ندارد.";
      tr.appendChild(td);
      el.tableBody.appendChild(tr);
    } else {
      rows.forEach((row) => {
        const tr = document.createElement("tr");
        tr.addEventListener("click", () => renderForm(row));
        state.fields.forEach((field) => {
          const td = document.createElement("td");
          td.textContent = formatValue(row[field.name]);
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
    prev.textContent = "قبلی";
    prev.disabled = state.page <= 1;
    prev.addEventListener("click", async () => {
      state.page = Math.max(1, state.page - 1);
      await loadRows();
    });

    const next = document.createElement("button");
    next.type = "button";
    next.className = "secondary-btn";
    next.textContent = "بعدی";
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

    state.fields.forEach((field) => {
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
    save.textContent = "ذخیره تغییرات";
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
      if (field.primaryKey) return;
      let value = data.get(field.name);
      if (field.type === "boolean") value = value === "" ? null : value === "true";
      if (field.type === "number") value = value === "" ? null : Number(value);
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

  function toggleGridFullscreen() {
    state.gridFullscreen = !state.gridFullscreen;
    localStorage.setItem(fullscreenKey, String(state.gridFullscreen));
    renderGridFullscreen();
  }

  function renderGridFullscreen() {
    el.appShell.classList.toggle("grid-fullscreen", state.gridFullscreen);
    el.fullscreenBtn.textContent = state.gridFullscreen ? "نمای کامل: روشن" : "نمای کامل جدول";
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
      return state.fields.some((f) => String(row[f.name] ?? "").toLowerCase().includes(filter));
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
    if (/Voucher|Operation|Receipt|Payment|Cheque|Settlement|Bill|Balance|Reconciliation|Refund|History/i.test(tableName)) {
      return "عملیات";
    }
    if (/Account|Bank|Branch|Cash|Pos|Type|Topic|DL|Specification|Book/i.test(tableName)) {
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
    label = label.replace(/\bAccount\b/g, "حساب");
    label = label.replace(/\bBank\b/g, "بانک");
    label = label.replace(/\bCheque\b/g, "چک");
    label = label.replace(/\bVoucher\b/g, "سند");
    label = label.replace(/\bItem\b/g, "آیتم");
    label = label.replace(/\bParty\b/g, "شخص");
    label = label.replace(/\bCustomer\b/g, "مشتری");
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

  function formatValue(value) {
    if (value === null || value === undefined) return "";
    if (typeof value === "boolean") return value ? "درست" : "نادرست";
    return String(value);
  }

  function toFaNumber(value) {
    return new Intl.NumberFormat("fa-IR").format(value);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();
