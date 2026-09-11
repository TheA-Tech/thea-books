const pageTitle = document.getElementById("pageTitle");
const content = document.getElementById("content");

let transactions =
    JSON.parse(localStorage.getItem("theaBooksTransactions")) || [];

let invoices =
    JSON.parse(localStorage.getItem("theaBooksInvoices")) || [];

let customers =
    JSON.parse(localStorage.getItem("theaBooksCustomers")) || [];

function saveCustomers() {
    localStorage.setItem(
        "theaBooksCustomers",
        JSON.stringify(customers)
    );
}

function openCustomerForm() {

    pageTitle.innerText = "Add Customer";

    content.innerHTML = `
        <div class="panel">

            <h2>New Customer</h2>

            <form onsubmit="addCustomer(event)">

                <label>Customer Name</label>
                <input
                    type="text"
                    id="customerName"
                    placeholder="Enter customer name"
                    required
                >

                <label>Phone</label>
                <input
                    type="text"
                    id="customerPhone"
                    placeholder="03XXXXXXXXX"
                >

                <label>Email</label>
                <input
                    type="email"
                    id="customerEmail"
                    placeholder="customer@email.com"
                >

                <label>Address</label>
                <input
                    type="text"
                    id="customerAddress"
                    placeholder="Enter address"
                >

                <div class="form-buttons">

                    <button type="submit" class="new-btn">
                        Save Customer
                    </button>

                    <button
                        type="button"
                        class="cancel-btn"
                        onclick="showPage('customers')"
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>
    `;
}

function addCustomer(event) {

    event.preventDefault();

    const name =
        document.getElementById("customerName").value.trim();

    const phone =
        document.getElementById("customerPhone").value.trim();

    const email =
        document.getElementById("customerEmail").value.trim();

    const address =
        document.getElementById("customerAddress").value.trim();

    if (!name) {
        alert("Customer name is required.");
        return;
    }

    customers.push({
        id: Date.now(),
        name: name,
        phone: phone,
        email: email,
        address: address
    });

    saveCustomers();

    alert("Customer saved successfully!");

    showPage("customers");
}


/* =========================
   SAVE DATA
========================= */

function saveTransactions() {
    localStorage.setItem(
        "theaBooksTransactions",
        JSON.stringify(transactions)
    );
}

function saveInvoices() {
    localStorage.setItem(
        "theaBooksInvoices",
        JSON.stringify(invoices)
    );
}


/* =========================
   FORMAT MONEY
========================= */

function formatMoney(amount) {
    return "Rs. " + Number(amount).toLocaleString("en-PK");
}


/* =========================
   INVOICE NUMBER
========================= */

function generateInvoiceNumber() {
    return "INV-" + String(invoices.length + 1).padStart(4, "0");
}


/* =========================
   DASHBOARD
========================= */

function showDashboard() {

    pageTitle.innerText = "Dashboard";

    const invoiceSales = invoices.reduce(
        (sum, invoice) => sum + Number(invoice.total),
        0
    );

    const transactionSales = transactions
        .filter(t => t.type === "sale")
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalSales = invoiceSales + transactionSales;

    const totalExpenses = transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const receivables = invoices
        .filter(invoice => invoice.status === "unpaid")
        .reduce((sum, invoice) => sum + Number(invoice.total), 0);

    const netProfit = totalSales - totalExpenses;

    const recentInvoices = invoices
        .slice()
        .reverse()
        .slice(0, 5);

    content.innerHTML = `

        <div class="cards">

            <div class="card">
                <p>Total Sales</p>
                <h2>${formatMoney(totalSales)}</h2>
            </div>

            <div class="card">
                <p>Total Expenses</p>
                <h2>${formatMoney(totalExpenses)}</h2>
            </div>

            <div class="card">
                <p>Net Profit</p>
                <h2>${formatMoney(netProfit)}</h2>
            </div>

            <div class="card">
                <p>Receivables</p>
                <h2>${formatMoney(receivables)}</h2>
            </div>

        </div>


        <div class="panel">

            <h2>Recent Invoices</h2>

            ${
                recentInvoices.length === 0
                    ? `<p>No invoices yet.</p>`
                    : recentInvoices.map(invoice => `

                        <div class="transaction-row">

                            <div>
                                <strong>
                                    ${invoice.invoiceNumber}
                                </strong>

                                <small>
                                    ${invoice.customer} • ${invoice.date}
                                </small>
                            </div>

                            <strong>
                                ${formatMoney(invoice.total)}
                            </strong>

                        </div>

                    `).join("")
            }

        </div>


        <div class="panel">

            <h2>Recent Transactions</h2>

            ${
                transactions.length === 0
                    ? `<p>No transactions yet.</p>`
                    : transactions
                        .slice()
                        .reverse()
                        .slice(0, 5)
                        .map(t => `

                            <div class="transaction-row">

                                <div>
                                    <strong>
                                        ${t.description}
                                    </strong>

                                    <small>
                                        ${t.date} • ${t.type}
                                    </small>
                                </div>

                                <strong>
                                    ${formatMoney(t.amount)}
                                </strong>

                            </div>

                        `).join("")
            }

        </div>
    `;
}


/* =========================
   NEW TRANSACTION
========================= */

function openTransactionForm() {

    pageTitle.innerText = "New Transaction";

    content.innerHTML = `

        <div class="panel">

            <h2>Add Transaction</h2>

            <form onsubmit="addTransaction(event)">

                <label>Transaction Type</label>

                <select id="transactionType" required>
                    <option value="">Select Type</option>
                    <option value="sale">Sale / Income</option>
                    <option value="expense">Expense</option>
                </select>


                <label>Date</label>

                <input
                    type="date"
                    id="transactionDate"
                    required
                >


                <label>Description</label>

                <input
                    type="text"
                    id="transactionDescription"
                    placeholder="Enter description"
                    required
                >


                <label>Amount</label>

                <input
                    type="number"
                    id="transactionAmount"
                    placeholder="Enter amount"
                    min="0"
                    step="0.01"
                    required
                >


                <div class="form-buttons">

                    <button type="submit" class="new-btn">
                        Save Transaction
                    </button>

                    <button
                        type="button"
                        class="cancel-btn"
                        onclick="showPage('dashboard')"
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>
    `;

    document.getElementById("transactionDate").value =
        new Date().toISOString().split("T")[0];
}


/* =========================
   ADD TRANSACTION
========================= */

function addTransaction(event) {

    event.preventDefault();

    const type =
        document.getElementById("transactionType").value;

    const date =
        document.getElementById("transactionDate").value;

    const description =
        document.getElementById("transactionDescription").value.trim();

    const amount =
        Number(document.getElementById("transactionAmount").value);

    if (!type || !date || !description || amount <= 0) {
        alert("Please enter valid transaction details.");
        return;
    }

    transactions.push({

        id: Date.now(),

        type: type,

        date: date,

        description: description,

        amount: amount

    });

    saveTransactions();

    alert("Transaction saved successfully!");

    showPage("dashboard");
}


/* =========================
   SALES PAGE
========================= */

function showSales() {

    pageTitle.innerText = "Sales";

    content.innerHTML = `

        <div class="panel">

            <h2>Sales</h2>

            <p>
                Create and manage customer invoices.
            </p>

            <button
                class="new-btn"
                onclick="openInvoiceForm()"
            >
                + Create Invoice
            </button>

        </div>


        <div class="panel">

            <h2>Invoices</h2>

            ${
                invoices.length === 0
                    ? `<p>No invoices yet.</p>`
                    : invoices
                        .slice()
                        .reverse()
                        .map(invoice => `

                            <div class="transaction-row">

                                <div>

                                    <strong>
                                        ${invoice.invoiceNumber}
                                    </strong>

                                    <small>
                                        Customer: ${invoice.customer}
                                        • ${invoice.date}
                                        • ${invoice.status}
                                    </small>

                                </div>

                                <strong>
                                    ${formatMoney(invoice.total)}
                                </strong>

                            </div>

                        `).join("")
            }

        </div>
    `;
}


/* =========================
   CREATE INVOICE
========================= */

function openInvoiceForm() {

    pageTitle.innerText = "Create Invoice";

    content.innerHTML = `

        <div class="panel">

            <h2>New Sales Invoice</h2>

            <form onsubmit="createInvoice(event)">

                <label>Customer</label>

                <select id="invoiceCustomer" required>

                    <option value="">
                        Select Customer
                    </option>

                    ${
                        customers.length === 0
                            ? `<option value="" disabled>
                                No customers added yet.
                               </option>`
                            : customers.map(customer => `
                                <option value="${customer.id}">
                                    ${customer.name}
                                </option>
                            `).join("")
                    }

                </select>


                <label>Invoice Date</label>

                <input
                    type="date"
                    id="invoiceDate"
                    required
                >


                <label>Product / Service</label>

                <input
                    type="text"
                    id="invoiceProduct"
                    placeholder="Enter product or service"
                    required
                >


                <label>Quantity</label>

                <input
                    type="number"
                    id="invoiceQuantity"
                    value="1"
                    min="1"
                    step="1"
                    required
                >


                <label>Rate</label>

                <input
                    type="number"
                    id="invoiceRate"
                    placeholder="Enter rate"
                    min="0"
                    step="0.01"
                    required
                >


                <label>Discount</label>

                <input
                    type="number"
                    id="invoiceDiscount"
                    value="0"
                    min="0"
                    step="0.01"
                    placeholder="Enter discount"
                >


                <label>Tax (%)</label>

                <input
                    type="number"
                    id="invoiceTax"
                    value="0"
                    min="0"
                    step="0.01"
                    placeholder="Enter tax percentage"
                >


                <label>Payment Status</label>

                <select id="invoiceStatus" required>

                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>

                </select>


                <div class="panel invoice-summary">

                    <h2>Invoice Summary</h2>

                    <p>
                        Subtotal:
                        <strong id="invoiceSubtotal">Rs. 0</strong>
                    </p>

                    <p>
                        Discount:
                        <strong id="invoiceDiscountDisplay">Rs. 0</strong>
                    </p>

                    <p>
                        Tax:
                        <strong id="invoiceTaxDisplay">Rs. 0</strong>
                    </p>

                    <p>
                        Total:
                        <strong id="invoiceTotalDisplay">Rs. 0</strong>
                    </p>

                </div>


                <div class="form-buttons">

                    <button
                        type="submit"
                        class="new-btn"
                    >
                        Save Invoice
                    </button>

                    <button
                        type="button"
                        class="cancel-btn"
                        onclick="showPage('sales')"
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>
    `;

    document.getElementById("invoiceDate").value =
        new Date().toISOString().split("T")[0];


    function updateInvoiceTotal() {

        const quantity =
            Number(document.getElementById("invoiceQuantity").value) || 0;

        const rate =
            Number(document.getElementById("invoiceRate").value) || 0;

        const discount =
            Number(document.getElementById("invoiceDiscount").value) || 0;

        const taxPercent =
            Number(document.getElementById("invoiceTax").value) || 0;

        const subtotal = quantity * rate;

        const afterDiscount =
            Math.max(0, subtotal - discount);

        const tax =
            afterDiscount * (taxPercent / 100);

        const total =
            afterDiscount + tax;

        document.getElementById("invoiceSubtotal").innerText =
            formatMoney(subtotal);

        document.getElementById("invoiceDiscountDisplay").innerText =
            formatMoney(discount);

        document.getElementById("invoiceTaxDisplay").innerText =
            formatMoney(tax);

        document.getElementById("invoiceTotalDisplay").innerText =
            formatMoney(total);
    }


    document.getElementById("invoiceQuantity")
        .addEventListener("input", updateInvoiceTotal);

    document.getElementById("invoiceRate")
        .addEventListener("input", updateInvoiceTotal);

    document.getElementById("invoiceDiscount")
        .addEventListener("input", updateInvoiceTotal);

    document.getElementById("invoiceTax")
        .addEventListener("input", updateInvoiceTotal);

    updateInvoiceTotal();
}


/* =========================
   SAVE INVOICE
========================= */

function createInvoice(event) {

    event.preventDefault();

    const customerId =
        document.getElementById("invoiceCustomer").value;

    const date =
        document.getElementById("invoiceDate").value;

    const product =
        document.getElementById("invoiceProduct").value.trim();

    const quantity =
        Number(document.getElementById("invoiceQuantity").value);

    const rate =
        Number(document.getElementById("invoiceRate").value);

    const discount =
        Number(document.getElementById("invoiceDiscount").value) || 0;

    const taxPercent =
        Number(document.getElementById("invoiceTax").value) || 0;

    const status =
        document.getElementById("invoiceStatus").value;


    const selectedCustomer = customers.find(
        customer =>
            String(customer.id) === String(customerId)
    );


    if (
        !selectedCustomer ||
        !date ||
        !product ||
        quantity <= 0 ||
        rate <= 0 ||
        discount < 0 ||
        taxPercent < 0
    ) {

        alert("Please enter valid invoice details.");

        return;
    }


    const subtotal =
        quantity * rate;


    const validDiscount =
        Math.min(discount, subtotal);


    const afterDiscount =
        subtotal - validDiscount;


    const taxAmount =
        afterDiscount * (taxPercent / 100);


    const total =
        afterDiscount + taxAmount;


    const invoice = {

        id: Date.now(),

        invoiceNumber:
            generateInvoiceNumber(),

        customerId:
            selectedCustomer.id,

        customer:
            selectedCustomer.name,

        date:
            date,

        product:
            product,

        quantity:
            quantity,

        rate:
            rate,

        subtotal:
            subtotal,

        discount:
            validDiscount,

        taxPercent:
            taxPercent,

        taxAmount:
            taxAmount,

        total:
            total,

        status:
            status
    };


    invoices.push(invoice);

    saveInvoices();


    alert(
        "Invoice " +
        invoice.invoiceNumber +
        " created successfully!"
    );


    showPage("sales");
}
/* =========================
   PURCHASES
========================= */

function showPurchases() {

    pageTitle.innerText = "Purchases";

    content.innerHTML = `

        <div class="panel">

            <h2>Purchases</h2>

            <p>
                Manage vendors, bills and purchase payments.
            </p>

            <button class="new-btn">
                + New Bill
            </button>

        </div>

        <div class="panel">

            <h2>Purchase Records</h2>

            <p>No purchase records yet.</p>

        </div>
    `;
}


/* =========================
   EXPENSES
========================= */

function showExpenses() {

    pageTitle.innerText = "Expenses";

    const expenses =
        transactions.filter(t => t.type === "expense");

    content.innerHTML = `

        <div class="panel">

            <h2>Expenses</h2>

            <p>
                Record and manage business expenses.
            </p>

            <button
                class="new-btn"
                onclick="openExpenseForm()"
            >
                + Record Expense
            </button>

        </div>


        <div class="panel">

            <h2>Expense Records</h2>

            ${
                expenses.length === 0
                    ? `<p>No expenses recorded yet.</p>`
                    : expenses
                        .slice()
                        .reverse()
                        .map(t => `

                            <div class="transaction-row">

                                <div>
                                    <strong>
                                        ${t.description}
                                    </strong>

                                    <small>
                                        ${t.date}
                                    </small>
                                </div>

                                <strong>
                                    ${formatMoney(t.amount)}
                                </strong>

                            </div>

                        `).join("")
            }

        </div>
    `;
}


/* =========================
   EXPENSE FORM
========================= */

function openExpenseForm() {

    pageTitle.innerText = "Record Expense";

    content.innerHTML = `

        <div class="panel">

            <h2>New Expense</h2>

            <form onsubmit="saveExpense(event)">

                <label>Date</label>

                <input
                    type="date"
                    id="expenseDate"
                    required
                >


                <label>Expense Description</label>

                <input
                    type="text"
                    id="expenseDescription"
                    placeholder="e.g. Electricity bill"
                    required
                >


                <label>Amount</label>

                <input
                    type="number"
                    id="expenseAmount"
                    placeholder="Enter amount"
                    min="0"
                    step="0.01"
                    required
                >


                <div class="form-buttons">

                    <button
                        type="submit"
                        class="new-btn"
                    >
                        Save Expense
                    </button>

                    <button
                        type="button"
                        class="cancel-btn"
                        onclick="showPage('expenses')"
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>
    `;

    document.getElementById("expenseDate").value =
        new Date().toISOString().split("T")[0];
}


/* =========================
   SAVE EXPENSE
========================= */

function saveExpense(event) {

    event.preventDefault();

    const date =
        document.getElementById("expenseDate").value;

    const description =
        document.getElementById("expenseDescription").value.trim();

    const amount =
        Number(document.getElementById("expenseAmount").value);

    if (!date || !description || amount <= 0) {

        alert("Please enter valid expense details.");

        return;
    }

    transactions.push({

        id: Date.now(),

        type: "expense",

        date: date,

        description: description,

        amount: amount

    });

    saveTransactions();

    alert("Expense saved successfully!");

    showPage("expenses");
}


/* =========================
   CUSTOMERS
========================= */

function showCustomers() {

    pageTitle.innerText = "Customers";

    // Link old invoices to existing customers using name
    // This is only for old invoices that do not have customerId.
    let dataChanged = false;

    invoices.forEach(invoice => {

        if (!invoice.customerId && invoice.customer) {

            const matchingCustomer = customers.find(
                customer =>
                    String(customer.name).trim().toLowerCase() ===
                    String(invoice.customer).trim().toLowerCase()
            );

            if (matchingCustomer) {
                invoice.customerId = matchingCustomer.id;
                dataChanged = true;
            }
        }
    });

    if (dataChanged) {
        saveInvoices();
    }

    content.innerHTML = `

        <div class="panel">

            <h2>Customers</h2>

            <button
                class="new-btn"
                onclick="openCustomerForm()"
            >
                + Add Customer
            </button>

        </div>

        <div class="panel">

            <h2>Customer List</h2>

            ${
                customers.length === 0
                    ? `<p>No customers added yet.</p>`
                    : customers
                        .slice()
                        .reverse()
                        .map(customer => {

                            const customerInvoices =
                                invoices.filter(
                                    invoice =>
                                        String(invoice.customerId) ===
                                        String(customer.id)
                                );

                            const totalSales =
                                customerInvoices.reduce(
                                    (sum, invoice) =>
                                        sum + Number(invoice.total),
                                    0
                                );

                            const paidAmount =
                                customerInvoices
                                    .filter(
                                        invoice =>
                                            invoice.status === "paid"
                                    )
                                    .reduce(
                                        (sum, invoice) =>
                                            sum + Number(invoice.total),
                                        0
                                    );

                            const receivable =
                                totalSales - paidAmount;

                            return `

                                <div class="transaction-row">

                                    <div>

                                        <strong>
                                            ${customer.name}
                                        </strong>

                                        <small>
                                            ${customer.phone || "No phone"}
                                            ${customer.email ? " • " + customer.email : ""}
                                        </small>

                                        <small>
                                            Invoices: ${customerInvoices.length}
                                            • Sales: ${formatMoney(totalSales)}
                                            • Receivable: ${formatMoney(receivable)}
                                        </small>

                                    </div>

                                    <strong>
                                        ${formatMoney(receivable)}
                                    </strong>

                                </div>

                            `;

                        })
                        .join("")
            }

        </div>
    `;
}
/* =========================
   VENDORS
========================= */

function showVendors() {

    pageTitle.innerText = "Vendors";

    content.innerHTML = `

        <div class="panel">

            <h2>Vendors</h2>

            <button class="new-btn">
                + Add Vendor
            </button>

        </div>

        <div class="panel">

            <h2>Vendor List</h2>

            <p>No vendors added yet.</p>

        </div>
    `;
}


/* =========================
   INVENTORY
========================= */

function showInventory() {

    pageTitle.innerText = "Inventory";

    content.innerHTML = `

        <div class="cards">

            <div class="card">
                <p>Total Products</p>
                <h2>0</h2>
            </div>

            <div class="card">
                <p>Stock Value</p>
                <h2>Rs. 0</h2>
            </div>

        </div>

        <div class="panel">

            <h2>Inventory</h2>

            <button class="new-btn">
                + Add Product
            </button>

            <p>No products added yet.</p>

        </div>
    `;
}


/* =========================
   ACCOUNTING
========================= */

function showAccounting() {

    pageTitle.innerText = "Accounting";

    content.innerHTML = `

        <div class="panel">

            <h2>Accounting</h2>

            <button class="new-btn">
                + Journal Entry
            </button>

        </div>

        <div class="panel">

            <h2>Accounting Tools</h2>

            <p>Chart of Accounts</p>
            <p>General Ledger</p>
            <p>Trial Balance</p>

        </div>
    `;
}


/* =========================
   REPORTS
========================= */

function showReports() {

    pageTitle.innerText = "Reports";

    content.innerHTML = `

        <div class="panel">

            <h2>Financial Reports</h2>

            <p>Profit & Loss</p>
            <p>Balance Sheet</p>
            <p>Cash Flow Statement</p>
            <p>Trial Balance</p>
            <p>Accounts Receivable Aging</p>
            <p>Accounts Payable Aging</p>

        </div>
    `;
}


/* =========================
   PAGE NAVIGATION
========================= */

function showPage(page) {

    localStorage.setItem("theaBooksCurrentPage", page);

    if (page === "dashboard") {
        showDashboard();
    }

    else if (page === "sales") {
        showSales();
    }

    else if (page === "purchases") {
        showPurchases();
    }

    else if (page === "expenses") {
        showExpenses();
    }

    else if (page === "customers") {
        showCustomers();
    }

    else if (page === "vendors") {
        showVendors();
    }

    else if (page === "inventory") {
        showInventory();
    }

    else if (page === "accounting") {
        showAccounting();
    }

    else if (page === "reports") {
        showReports();
    }
}

/* =========================
   LOAD DASHBOARD
========================= */

const savedPage =
    localStorage.getItem("theaBooksCurrentPage") || "dashboard";

showPage(savedPage);
/* =========================
   MOBILE MENU
========================= */

function toggleMobileMenu() {

    const navigation = document.getElementById("mainNavigation");

    navigation.classList.toggle("mobile-open");
}
