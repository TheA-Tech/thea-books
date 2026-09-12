const pageTitle = document.getElementById("pageTitle");
const content = document.getElementById("content");

let products =
    JSON.parse(localStorage.getItem("theaBooksProducts")) || [];

function saveProducts() {
    localStorage.setItem(
        "theaBooksProducts",
        JSON.stringify(products)
    );
}
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
   MODERN ERP DASHBOARD
========================= */

function showDashboard() {

    pageTitle.innerText = "Dashboard";


    /* =========================
       BASIC CALCULATIONS
    ========================= */

    const invoiceSales = invoices.reduce(
        (sum, invoice) =>
            sum + Number(invoice.total || 0),
        0
    );


    const transactionSales = transactions
        .filter(t => t.type === "sale")
        .reduce(
            (sum, t) =>
                sum + Number(t.amount || 0),
            0
        );


    const totalSales = invoiceSales;


    const totalExpenses = transactions
        .filter(t => t.type === "expense")
        .reduce(
            (sum, t) =>
                sum + Number(t.amount || 0),
            0
        );


const totalPurchases = purchases.reduce(
        (sum, purchase) =>
            sum + Number(purchase.amount || 0),
        0
    );


const payables = purchases
        .filter(purchase => purchase.status === "unpaid")
        .reduce(
            (sum, purchase) =>
                sum + Number(purchase.amount || 0),
            0
        );


const receivables = invoices
        .filter(invoice => invoice.status === "unpaid")
        .reduce(
            (sum, invoice) =>
                sum + Number(invoice.total || 0),
            0
        );


    const paidSales = invoices
        .filter(invoice => invoice.status === "paid")
        .reduce(
            (sum, invoice) =>
                sum + Number(invoice.total || 0),
            0
        );


    const netProfit =
        totalSales - totalExpenses;


    const totalProducts =
        products.length;


    const stockValue = products.reduce(
        (sum, product) =>
            sum +
            (
                Number(product.stock || 0) *
                Number(product.cost || 0)
            ),
        0
    );


    /* =========================
       RECENT INVOICES
    ========================= */

    const recentInvoices = invoices
        .slice()
        .reverse()
        .slice(0, 5);


    /* =========================
       RECENT TRANSACTIONS
    ========================= */

    const recentTransactions = transactions
        .slice()
        .reverse()
        .slice(0, 5);


    /* =========================
       DASHBOARD
    ========================= */

   content.innerHTML = `

<!-- =========================
     QUICKBOOKS STYLE HEADER
========================= -->

<div style="
    background:linear-gradient(135deg,#0f4c81,#176b9f);
    color:white;
    border-radius:16px;
    padding:25px 28px;
    margin-bottom:22px;
    box-shadow:0 8px 25px rgba(15,76,129,.15);
">

    <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:20px;
        flex-wrap:wrap;
    ">

        <div>

            <div style="
                font-size:13px;
                opacity:.85;
                margin-bottom:6px;
            ">
                BUSINESS OVERVIEW
            </div>

            <h2 style="
                margin:0 0 7px 0;
                font-size:25px;
            ">
                Welcome to THEA Books 👋
            </h2>

            <p style="
                margin:0;
                font-size:13px;
                opacity:.88;
            ">
                Manage your sales, expenses and business finances from one place.
            </p>

        </div>


        <div style="
            display:flex;
            align-items:center;
            gap:10px;
            flex-wrap:wrap;
        ">

            <div style="
                background:rgba(255,255,255,.14);
                border:1px solid rgba(255,255,255,.18);
                padding:10px 15px;
                border-radius:10px;
                font-size:12px;
                font-weight:600;
            ">
                📅 ${new Date().toLocaleDateString("en-PK")}
            </div>

            <button
                onclick="openInvoiceForm()"
                style="
                    border:none;
                    background:white;
                    color:#0f4c81;
                    padding:11px 17px;
                    border-radius:9px;
                    font-weight:700;
                    cursor:pointer;
                "
            >
                + New Invoice
            </button>

        </div>

    </div>

</div>


<!-- =========================
     KPI CARDS
========================= -->

<div class="cards">

    <div class="card" style="
        border-top:4px solid #0f766e;
    ">

        <div style="
            display:flex;
            justify-content:space-between;
            align-items:center;
        ">

            <h3>💰 Total Sales</h3>

            <span style="
                background:#e6fffa;
                padding:8px;
                border-radius:9px;
            ">
                ↑
            </span>

        </div>

        <p style="color:#0f766e;">
            ${formatMoney(totalSales)}
        </p>

        <small style="color:#64748b;">
            Total invoice sales
        </small>

    </div>


    <div class="card" style="
        border-top:4px solid #d97706;
    ">

        <div style="
            display:flex;
            justify-content:space-between;
            align-items:center;
        ">

            <h3>🛒 Purchases</h3>

            <span style="
                background:#fff7ed;
                padding:8px;
                border-radius:9px;
            ">
                ↓
            </span>

        </div>

        <p style="color:#d97706;">
            ${formatMoney(totalPurchases)}
        </p>

        <small style="color:#64748b;">
            Purchase bills
        </small>

    </div>


    <div class="card" style="
        border-top:4px solid #dc2626;
    ">

        <div style="
            display:flex;
            justify-content:space-between;
            align-items:center;
        ">

            <h3>💸 Expenses</h3>

            <span style="
                background:#fef2f2;
                padding:8px;
                border-radius:9px;
            ">
                $
            </span>

        </div>

        <p style="color:#dc2626;">
            ${formatMoney(totalExpenses)}
        </p>

        <small style="color:#64748b;">
            Business expenses
        </small>

    </div>


    <div class="card" style="
        border-top:4px solid #059669;
    ">

        <div style="
            display:flex;
            justify-content:space-between;
            align-items:center;
        ">

            <h3>📈 Net Profit</h3>

            <span style="
                background:#ecfdf5;
                padding:8px;
                border-radius:9px;
            ">
                ✓
            </span>

        </div>

        <p style="color:#059669;">
            ${formatMoney(netProfit)}
        </p>

        <small style="color:#64748b;">
            Sales − Expenses
        </small>

    </div>


   <div class="card" onclick="showPage('receivables')" style="
    border-top:4px solid #7c3aed;
    cursor:pointer;
">

        <div style="
            display:flex;
            justify-content:space-between;
            align-items:center;
        ">

            <h3>🧾 Receivables</h3>

            <span style="
                background:#f5f3ff;
                padding:8px;
                border-radius:9px;
            ">
                →
            </span>

        </div>

        <p style="color:#7c3aed;">
            ${formatMoney(receivables)}
        </p>

        <small style="color:#64748b;">
            Unpaid invoices
        </small>

    </div>


    <div class="card" onclick="showPage('payables')" style="
    border-top:4px solid #b91c1c;
    cursor:pointer;
">

        <div style="
            display:flex;
            justify-content:space-between;
            align-items:center;
        ">

            <h3>📋 Payables</h3>

            <span style="
                background:#fef2f2;
                padding:8px;
                border-radius:9px;
            ">
                !
            </span>

        </div>

        <p style="color:#b91c1c;">
            ${formatMoney(payables)}
        </p>

        <small style="color:#64748b;">
            Unpaid vendor bills
        </small>

    </div>

</div>


<!-- =========================
     QUICK ACTIONS
========================= -->

<div class="dashboard-section" style="
    margin-top:22px;
">

    <div style="margin-bottom:17px;">

        <h3 style="margin:0 0 5px 0;">
            Quick Actions
        </h3>

        <p style="
            margin:0;
            color:#718096;
            font-size:12px;
        ">
            Quickly access your most-used business tasks.
        </p>

    </div>


    <div style="
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(190px,1fr));
        gap:14px;
    ">

        <div
            onclick="openInvoiceForm()"
            style="
                padding:18px;
                border:1px solid #dbe4ec;
                border-radius:12px;
                cursor:pointer;
                background:white;
                transition:.2s;
            "
        >

            <div style="
                width:42px;
                height:42px;
                display:flex;
                align-items:center;
                justify-content:center;
                background:#eaf4fb;
                border-radius:11px;
                font-size:20px;
                margin-bottom:11px;
            ">
                🧾
            </div>

            <strong>Create Invoice</strong>

            <div style="
                color:#718096;
                font-size:12px;
                margin-top:5px;
            ">
                Create a new sales invoice
            </div>

        </div>


        <div
            onclick="openCustomerForm()"
            style="
                padding:18px;
                border:1px solid #dbe4ec;
                border-radius:12px;
                cursor:pointer;
                background:white;
            "
        >

            <div style="
                width:42px;
                height:42px;
                display:flex;
                align-items:center;
                justify-content:center;
                background:#f3edff;
                border-radius:11px;
                font-size:20px;
                margin-bottom:11px;
            ">
                👥
            </div>

            <strong>Add Customer</strong>

            <div style="
                color:#718096;
                font-size:12px;
                margin-top:5px;
            ">
                Create customer account
            </div>

        </div>


        <div
            onclick="openExpenseForm()"
            style="
                padding:18px;
                border:1px solid #dbe4ec;
                border-radius:12px;
                cursor:pointer;
                background:white;
            "
        >

            <div style="
                width:42px;
                height:42px;
                display:flex;
                align-items:center;
                justify-content:center;
                background:#fff1f2;
                border-radius:11px;
                font-size:20px;
                margin-bottom:11px;
            ">
                💸
            </div>

            <strong>Record Expense</strong>

            <div style="
                color:#718096;
                font-size:12px;
                margin-top:5px;
            ">
                Add a business expense
            </div>

        </div>


        <div
            onclick="openProductForm()"
            style="
                padding:18px;
                border:1px solid #dbe4ec;
                border-radius:12px;
                cursor:pointer;
                background:white;
            "
        >

            <div style="
                width:42px;
                height:42px;
                display:flex;
                align-items:center;
                justify-content:center;
                background:#fff7ed;
                border-radius:11px;
                font-size:20px;
                margin-bottom:11px;
            ">
                📦
            </div>

            <strong>Add Product</strong>

            <div style="
                color:#718096;
                font-size:12px;
                margin-top:5px;
            ">
                Add inventory item
            </div>

        </div>

    </div>

</div>


<!-- =========================
     FINANCIAL OVERVIEW
========================= -->

<div class="dashboard-grid" style="margin-top:22px;">


    <div class="chart-container">

        <div style="
            display:flex;
            justify-content:space-between;
            align-items:flex-start;
            margin-bottom:20px;
        ">

            <div>

                <h3 style="margin:0 0 5px 0;">
                    📊 Financial Overview
                </h3>

                <p style="
                    color:#718096;
                    font-size:12px;
                    margin:0;
                ">
                    Sales vs Expenses
                </p>

            </div>

            <span style="
                background:#eef5fa;
                color:#175b87;
                padding:7px 10px;
                border-radius:8px;
                font-size:11px;
                font-weight:700;
            ">
                Overview
            </span>

        </div>


        <div style="
            display:flex;
            align-items:flex-end;
            justify-content:center;
            gap:55px;
            height:205px;
            border-bottom:1px solid #e2e8f0;
            padding:0 20px;
        ">

            <div style="
                display:flex;
                flex-direction:column;
                align-items:center;
                justify-content:flex-end;
                height:100%;
            ">

                <strong style="
                    font-size:12px;
                    color:#0f766e;
                    margin-bottom:7px;
                ">
                    ${formatMoney(totalSales)}
                </strong>

                <div style="
                    width:70px;
                    height:${Math.max(
                        30,
                        totalSales > 0
                            ? Math.min(
                                145,
                                (totalSales /
                                Math.max(
                                    totalSales,
                                    totalExpenses,
                                    1
                                )) * 145
                            )
                            : 30
                    )}px;
                    background:linear-gradient(
                        180deg,
                        #14b8a6,
                        #0f766e
                    );
                    border-radius:10px 10px 2px 2px;
                "></div>

                <small style="
                    margin-top:9px;
                    color:#64748b;
                    font-weight:600;
                ">
                    Sales
                </small>

            </div>


            <div style="
                display:flex;
                flex-direction:column;
                align-items:center;
                justify-content:flex-end;
                height:100%;
            ">

                <strong style="
                    font-size:12px;
                    color:#d97706;
                    margin-bottom:7px;
                ">
                    ${formatMoney(totalExpenses)}
                </strong>

                <div style="
                    width:70px;
                    height:${Math.max(
                        30,
                        totalExpenses > 0
                            ? Math.min(
                                145,
                                (totalExpenses /
                                Math.max(
                                    totalSales,
                                    totalExpenses,
                                    1
                                )) * 145
                            )
                            : 30
                    )}px;
                    background:linear-gradient(
                        180deg,
                        #f59e0b,
                        #d97706
                    );
                    border-radius:10px 10px 2px 2px;
                "></div>

                <small style="
                    margin-top:9px;
                    color:#64748b;
                    font-weight:600;
                ">
                    Expenses
                </small>

            </div>

        </div>

    </div>


    <!-- BUSINESS SUMMARY -->

    <div class="chart-container">

        <h3 style="margin:0 0 5px 0;">
            💳 Business Summary
        </h3>

        <p style="
            color:#718096;
            font-size:12px;
            margin:0 0 18px 0;
        ">
            Current financial position
        </p>


        <div style="
            display:flex;
            flex-direction:column;
            gap:10px;
        ">

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                padding:13px;
                background:#f0fdf4;
                border-radius:10px;
            ">

                <span>Paid Sales</span>

                <strong style="color:#059669;">
                    ${formatMoney(paidSales)}
                </strong>

            </div>


            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                padding:13px;
                background:#f5f3ff;
                border-radius:10px;
            ">

                <span>Receivables</span>

                <strong style="color:#7c3aed;">
                    ${formatMoney(receivables)}
                </strong>

            </div>


            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                padding:13px;
                background:#eff6ff;
                border-radius:10px;
            ">

                <span>Net Profit</span>

                <strong style="color:#175b87;">
                    ${formatMoney(netProfit)}
                </strong>

            </div>


            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                padding:13px;
                background:#fff7ed;
                border-radius:10px;
            ">

                <span>Inventory Value</span>

                <strong style="color:#b45309;">
                    ${formatMoney(stockValue)}
                </strong>

            </div>

        </div>

    </div>

</div>


<!-- =========================
     BUSINESS COUNTS
========================= -->

<div class="cards" style="margin-top:22px;">

    <div class="card">

        <h3>📦 Products</h3>

        <p>${totalProducts}</p>

        <small style="color:#718096;">
            Inventory items
        </small>

    </div>


    <div class="card">

        <h3>🧾 Invoices</h3>

        <p>${invoices.length}</p>

        <small style="color:#718096;">
            Sales invoices
        </small>

    </div>


    <div class="card">

        <h3>👥 Customers</h3>

        <p>${customers.length}</p>

        <small style="color:#718096;">
            Customer accounts
        </small>

    </div>


    <div class="card">

        <h3>💳 Transactions</h3>

        <p>${transactions.length}</p>

        <small style="color:#718096;">
            Recorded transactions
        </small>

    </div>

</div>


<!-- =========================
     RECENT INVOICES
========================= -->

<div class="dashboard-section" style="
    margin-top:22px;
    background:#ffffff;
    border:1px solid #e2e8f0;
    border-radius:12px;
    padding:20px;
">

    <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:18px;
    ">

        <div>

            <h3 style="
                margin:0 0 5px 0;
                font-size:18px;
                color:#1a202c;
            ">
                🧾 Recent Invoices
            </h3>

            <p style="
                margin:0;
                color:#718096;
                font-size:12px;
            ">
                Your latest sales invoices
            </p>

        </div>

        <button
            class="action-btn"
            onclick="showPage('sales')"
            style="
                padding:8px 14px;
                border-radius:7px;
                font-size:12px;
            "
        >
            View All →
        </button>

    </div>


    ${
        recentInvoices.length === 0

            ? `

                <div class="empty-state" style="
                    padding:35px 20px;
                    text-align:center;
                    background:#f8fafc;
                    border-radius:10px;
                ">

                    <div style="
                        font-size:32px;
                        margin-bottom:8px;
                    ">
                        🧾
                    </div>

                    <h3 style="
                        margin:0 0 6px 0;
                    ">
                        No invoices yet
                    </h3>

                    <p style="
                        margin:0;
                        color:#718096;
                        font-size:13px;
                    ">
                        Create your first invoice to see it here.
                    </p>

                </div>

            `

            : `

                <div class="table-container">

                    <table style="
                        width:100%;
                        border-collapse:collapse;
                    ">

                        <thead>

                            <tr>

                                <th style="
                                    text-align:left;
                                    padding:12px;
                                ">
                                    Invoice
                                </th>

                                <th style="
                                    text-align:left;
                                    padding:12px;
                                ">
                                    Customer
                                </th>

                                <th style="
                                    text-align:left;
                                    padding:12px;
                                ">
                                    Date
                                </th>

                                <th style="
                                    text-align:left;
                                    padding:12px;
                                ">
                                    Status
                                </th>

                                <th style="
                                    text-align:right;
                                    padding:12px;
                                ">
                                    Amount
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            ${recentInvoices.map(invoice => `

                                <tr>

                                    <td style="
                                        padding:13px 12px;
                                        font-weight:600;
                                    ">
                                        ${invoice.invoiceNumber}
                                    </td>


                                    <td style="
                                        padding:13px 12px;
                                    ">
                                        ${invoice.customer}
                                    </td>


                                    <td style="
                                        padding:13px 12px;
                                        color:#718096;
                                    ">
                                        ${invoice.date}
                                    </td>


                                    <td style="
                                        padding:13px 12px;
                                    ">

                                        <span class="badge ${
                                            invoice.status === "paid"
                                                ? "badge-paid"
                                                : "badge-unpaid"
                                        }">

                                            ${
                                                invoice.status === "paid"
                                                    ? "Paid"
                                                    : "Unpaid"
                                            }

                                        </span>

                                    </td>


                                    <td style="
                                        padding:13px 12px;
                                        text-align:right;
                                        font-weight:600;
                                    ">
                                        ${formatMoney(invoice.total)}
                                    </td>

                                </tr>

                            `).join("")}

                        </tbody>

                    </table>

                </div>

            `
    }

</div>


<!-- =========================
     RECENT TRANSACTIONS
========================= -->

<div class="dashboard-section" style="
    margin-top:22px;
    background:#ffffff;
    border:1px solid #e2e8f0;
    border-radius:12px;
    padding:20px;
">

    <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:18px;
    ">

        <div>

            <h3 style="
                margin:0 0 5px 0;
                font-size:18px;
                color:#1a202c;
            ">
                💳 Recent Transactions
            </h3>

            <p style="
                margin:0;
                color:#718096;
                font-size:12px;
            ">
                Latest business transactions
            </p>

        </div>

        <button
            class="action-btn"
            onclick="openTransactionForm()"
            style="
                padding:8px 14px;
                border-radius:7px;
                font-size:12px;
            "
        >
            + Transaction
        </button>

    </div>


    ${
        recentTransactions.length === 0

            ? `

                <div class="empty-state" style="
                    padding:35px 20px;
                    text-align:center;
                    background:#f8fafc;
                    border-radius:10px;
                ">

                    <div style="
                        font-size:32px;
                        margin-bottom:8px;
                    ">
                        💳
                    </div>

                    <h3 style="
                        margin:0 0 6px 0;
                    ">
                        No transactions yet
                    </h3>

                    <p style="
                        margin:0;
                        color:#718096;
                        font-size:13px;
                    ">
                        Your recent business transactions will appear here.
                    </p>

                </div>

            `

            : `

                <div class="table-container">

                    <table style="
                        width:100%;
                        border-collapse:collapse;
                    ">

                        <thead>

                            <tr>

                                <th style="
                                    text-align:left;
                                    padding:12px;
                                ">
                                    Description
                                </th>

                                <th style="
                                    text-align:left;
                                    padding:12px;
                                ">
                                    Date
                                </th>

                                <th style="
                                    text-align:left;
                                    padding:12px;
                                ">
                                    Type
                                </th>

                                <th style="
                                    text-align:right;
                                    padding:12px;
                                ">
                                    Amount
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            ${recentTransactions.map(t => `

                                <tr>

                                    <td style="
                                        padding:13px 12px;
                                        font-weight:600;
                                    ">
                                        ${t.description}
                                    </td>


                                    <td style="
                                        padding:13px 12px;
                                        color:#718096;
                                    ">
                                        ${t.date}
                                    </td>


                                    <td style="
                                        padding:13px 12px;
                                    ">

                                        <span class="badge ${
                                            t.type === "sale"
                                                ? "badge-paid"
                                                : "badge-unpaid"
                                        }">

                                            ${
                                                t.type === "sale"
                                                    ? "Income"
                                                    : "Expense"
                                            }

                                        </span>

                                    </td>


                                    <td style="
                                        padding:13px 12px;
                                        text-align:right;
                                        font-weight:600;
                                    ">
                                        ${formatMoney(t.amount)}
                                    </td>

                                </tr>

                            `).join("")}

                        </tbody>

                    </table>

                </div>

            `
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
   CREATE PROFESSIONAL INVOICE
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
                                No customers added yet
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


                <label>Invoice Items</label>

                <div id="invoiceItems">

                    <div class="invoice-item"
                         style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr auto;gap:8px;margin-bottom:10px;">

                        <input
                            type="text"
                            class="item-product"
                            placeholder="Product / Service"
                            required
                        >

                        <input
                            type="number"
                            class="item-quantity"
                            value="1"
                            min="1"
                            step="1"
                            oninput="calculateInvoiceTotals()"
                            required
                        >

                        <input
                            type="number"
                            class="item-rate"
                            placeholder="Rate"
                            min="0"
                            step="0.01"
                            oninput="calculateInvoiceTotals()"
                            required
                        >

                        <input
                            type="text"
                            class="item-amount"
                            value="Rs. 0"
                            readonly
                        >

                        <button
                            type="button"
                            class="cancel-btn"
                            onclick="removeInvoiceItem(this)"
                        >
                            ×
                        </button>

                    </div>

                </div>


                <button
                    type="button"
                    class="new-btn"
                    onclick="addInvoiceItem()"
                >
                    + Add Item
                </button>


                <label>Discount</label>

                <input
                    type="number"
                    id="invoiceDiscount"
                    value="0"
                    min="0"
                    step="0.01"
                    oninput="calculateInvoiceTotals()"
                >


                <label>Tax (%)</label>

                <input
                    type="number"
                    id="invoiceTax"
                    value="0"
                    min="0"
                    step="0.01"
                    oninput="calculateInvoiceTotals()"
                >


                <div class="panel"
                     style="margin-top:15px;padding:15px;">

                    <p>
                        <strong>Subtotal:</strong>
                        <span id="invoiceSubtotal">
                            Rs. 0
                        </span>
                    </p>

                    <p>
                        <strong>Discount:</strong>
                        <span id="invoiceDiscountDisplay">
                            Rs. 0
                        </span>
                    </p>

                    <p>
                        <strong>Tax:</strong>
                        <span id="invoiceTaxDisplay">
                            Rs. 0
                        </span>
                    </p>

                    <h2>
                        Grand Total:
                        <span id="invoiceGrandTotal">
                            Rs. 0
                        </span>
                    </h2>

                </div>


                <label>Payment Status</label>

                <select id="invoiceStatus" required>

                    <option value="paid">
                        Paid
                    </option>

                    <option value="unpaid">
                        Unpaid
                    </option>

                </select>


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

    calculateInvoiceTotals();
}


/* =========================
   ADD INVOICE ITEM
========================= */

function addInvoiceItem() {

    const itemsContainer =
        document.getElementById("invoiceItems");

    const item = document.createElement("div");

    item.className = "invoice-item";

    item.style.display = "grid";
    item.style.gridTemplateColumns =
        "2fr 1fr 1fr 1fr auto";
    item.style.gap = "8px";
    item.style.marginBottom = "10px";

    item.innerHTML = `

        <input
            type="text"
            class="item-product"
            placeholder="Product / Service"
            required
        >

        <input
            type="number"
            class="item-quantity"
            value="1"
            min="1"
            step="1"
            oninput="calculateInvoiceTotals()"
            required
        >

        <input
            type="number"
            class="item-rate"
            placeholder="Rate"
            min="0"
            step="0.01"
            oninput="calculateInvoiceTotals()"
            required
        >

        <input
            type="text"
            class="item-amount"
            value="Rs. 0"
            readonly
        >

        <button
            type="button"
            class="cancel-btn"
            onclick="removeInvoiceItem(this)"
        >
            ×
        </button>
    `;

    itemsContainer.appendChild(item);

    calculateInvoiceTotals();
}


/* =========================
   REMOVE INVOICE ITEM
========================= */

function removeInvoiceItem(button) {

    const items =
        document.querySelectorAll(".invoice-item");

    if (items.length <= 1) {

        alert("Invoice must contain at least one item.");

        return;
    }

    button.parentElement.remove();

    calculateInvoiceTotals();
}


/* =========================
   CALCULATE INVOICE TOTALS
========================= */

function calculateInvoiceTotals() {

    const items =
        document.querySelectorAll(".invoice-item");

    let subtotal = 0;

    items.forEach(item => {

        const quantity =
            Number(
                item.querySelector(".item-quantity").value
            ) || 0;

        const rate =
            Number(
                item.querySelector(".item-rate").value
            ) || 0;

        const amount = quantity * rate;

        subtotal += amount;

        item.querySelector(".item-amount").value =
            formatMoney(amount);
    });


    const discount =
        Number(
            document.getElementById("invoiceDiscount")?.value
        ) || 0;


    const taxPercent =
        Number(
            document.getElementById("invoiceTax")?.value
        ) || 0;


    const afterDiscount =
        Math.max(0, subtotal - discount);


    const taxAmount =
        afterDiscount * (taxPercent / 100);


    const grandTotal =
        afterDiscount + taxAmount;


    document.getElementById("invoiceSubtotal").innerText =
        formatMoney(subtotal);


    document.getElementById("invoiceDiscountDisplay").innerText =
        formatMoney(discount);


    document.getElementById("invoiceTaxDisplay").innerText =
        formatMoney(taxAmount);


    document.getElementById("invoiceGrandTotal").innerText =
        formatMoney(grandTotal);


    return {
        subtotal: subtotal,
        discount: discount,
        taxPercent: taxPercent,
        taxAmount: taxAmount,
        grandTotal: grandTotal
    };
}


/* =========================
   CALCULATE INVOICE TOTAL
========================= */

function calculateInvoiceTotal() {

    const quantity =
        Number(document.getElementById("invoiceQuantity").value) || 0;

    const rate =
        Number(document.getElementById("invoiceRate").value) || 0;

    const total = quantity * rate;

    document.getElementById("invoiceTotal").value =
        formatMoney(total);
}

/* =========================
   SAVE PROFESSIONAL INVOICE
========================= */

function createInvoice(event) {

    event.preventDefault();


    const customerId =
        document.getElementById("invoiceCustomer").value;


    const date =
        document.getElementById("invoiceDate").value;


    const status =
        document.getElementById("invoiceStatus").value;


    const selectedCustomer =
        customers.find(
            customer =>
                String(customer.id) ===
                String(customerId)
        );


    if (!selectedCustomer || !date) {

        alert("Please select customer and invoice date.");

        return;
    }


    const itemElements =
        document.querySelectorAll(".invoice-item");


    const items = [];


    itemElements.forEach(item => {

        const product =
            item.querySelector(".item-product")
                .value
                .trim();


        const quantity =
            Number(
                item.querySelector(".item-quantity").value
            );


        const rate =
            Number(
                item.querySelector(".item-rate").value
            );


        if (product && quantity > 0 && rate > 0) {

            items.push({

                product: product,

                quantity: quantity,

                rate: rate,

                amount: quantity * rate

            });

        }

    });


    if (items.length === 0) {

        alert("Please add at least one valid invoice item.");

        return;
    }


    const totals =
        calculateInvoiceTotals();


    if (totals.grandTotal <= 0) {

        alert("Invoice total must be greater than zero.");

        return;
    }


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

        items:
            items,

        subtotal:
            totals.subtotal,

        discount:
            totals.discount,

        taxPercent:
            totals.taxPercent,

        taxAmount:
            totals.taxAmount,

        total:
            totals.grandTotal,

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
/* =========================================
   THEA BOOKS ERP MODULES
========================================= */

let vendors =
    JSON.parse(localStorage.getItem("theaBooksVendors")) || [];

let purchases =
    JSON.parse(localStorage.getItem("theaBooksPurchases")) || [];

let companyAccount =
    JSON.parse(localStorage.getItem("theaBooksCompany")) || {
        name: "",
        owner: "",
        phone: "",
        email: "",
        address: "",
        currency: "PKR"
    };


function saveVendors() {
    localStorage.setItem(
        "theaBooksVendors",
        JSON.stringify(vendors)
    );
}


function savePurchases() {
    localStorage.setItem(
        "theaBooksPurchases",
        JSON.stringify(purchases)
    );
}


function saveCompanyAccount() {
    localStorage.setItem(
        "theaBooksCompany",
        JSON.stringify(companyAccount)
    );
}


/* =========================
   COMPANY ACCOUNT
========================= */

function showCompanyAccount() {

    pageTitle.innerText = "Company Account";

    content.innerHTML = `

        <div class="panel">

            <h2>🏢 Company Account</h2>

            <p>
                Manage your company information.
            </p>

            <form onsubmit="saveCompany(event)">

                <label>Company Name</label>

                <input
                    type="text"
                    id="companyName"
                    value="${companyAccount.name || ""}"
                    placeholder="Company Name"
                    required
                >

                <label>Owner / Manager</label>

                <input
                    type="text"
                    id="companyOwner"
                    value="${companyAccount.owner || ""}"
                    placeholder="Owner Name"
                >

                <label>Phone</label>

                <input
                    type="text"
                    id="companyPhone"
                    value="${companyAccount.phone || ""}"
                    placeholder="03XXXXXXXXX"
                >

                <label>Email</label>

                <input
                    type="email"
                    id="companyEmail"
                    value="${companyAccount.email || ""}"
                    placeholder="company@email.com"
                >

                <label>Address</label>

                <input
                    type="text"
                    id="companyAddress"
                    value="${companyAccount.address || ""}"
                    placeholder="Business Address"
                >

                <label>Currency</label>

                <select id="companyCurrency">

                    <option value="PKR"
                        ${companyAccount.currency === "PKR" ? "selected" : ""}>
                        PKR - Pakistani Rupee
                    </option>

                    <option value="USD"
                        ${companyAccount.currency === "USD" ? "selected" : ""}>
                        USD - US Dollar
                    </option>

                    <option value="AED"
                        ${companyAccount.currency === "AED" ? "selected" : ""}>
                        AED - UAE Dirham
                    </option>

                </select>

                <div class="form-buttons">

                    <button
                        type="submit"
                        class="new-btn">
                        Save Company
                    </button>

                    <button
                        type="button"
                        class="cancel-btn"
                        onclick="showPage('dashboard')">
                        Cancel
                    </button>

                </div>

            </form>

        </div>
    `;
}


function saveCompany(event) {

    event.preventDefault();

    companyAccount = {

        name:
            document.getElementById("companyName").value.trim(),

        owner:
            document.getElementById("companyOwner").value.trim(),

        phone:
            document.getElementById("companyPhone").value.trim(),

        email:
            document.getElementById("companyEmail").value.trim(),

        address:
            document.getElementById("companyAddress").value.trim(),

        currency:
            document.getElementById("companyCurrency").value
    };

    saveCompanyAccount();

    alert("Company account saved successfully!");

    showPage("dashboard");
}


/* =========================
   VENDORS
========================= */

function openVendorForm() {

    pageTitle.innerText = "Add Vendor";

    content.innerHTML = `

        <div class="panel">

            <h2>🏢 New Vendor</h2>

            <form onsubmit="addVendor(event)">

                <label>Vendor Name</label>

                <input
                    type="text"
                    id="vendorName"
                    placeholder="Vendor Name"
                    required
                >

                <label>Phone</label>

                <input
                    type="text"
                    id="vendorPhone"
                    placeholder="03XXXXXXXXX"
                >

                <label>Email</label>

                <input
                    type="email"
                    id="vendorEmail"
                    placeholder="vendor@email.com"
                >

                <label>Address</label>

                <input
                    type="text"
                    id="vendorAddress"
                    placeholder="Vendor Address"
                >

                <div class="form-buttons">

                    <button
                        type="submit"
                        class="new-btn">
                        Save Vendor
                    </button>

                    <button
                        type="button"
                        class="cancel-btn"
                        onclick="showPage('vendors')">
                        Cancel
                    </button>

                </div>

            </form>

        </div>
    `;
}


function addVendor(event) {

    event.preventDefault();

    const name =
        document.getElementById("vendorName").value.trim();

    const phone =
        document.getElementById("vendorPhone").value.trim();

    const email =
        document.getElementById("vendorEmail").value.trim();

    const address =
        document.getElementById("vendorAddress").value.trim();

    if (!name) {

        alert("Vendor name is required.");

        return;
    }

    vendors.push({

        id: Date.now(),

        name: name,

        phone: phone,

        email: email,

        address: address

    });

    saveVendors();

    alert("Vendor saved successfully!");

    showPage("vendors");
}


/* =========================
   PURCHASE BILL
========================= */

function openPurchaseForm() {

    pageTitle.innerText = "New Purchase";

    content.innerHTML = `

        <div class="panel">

            <h2>🛒 New Purchase Bill</h2>

            <form onsubmit="savePurchase(event)">

                <label>Vendor</label>

                <select id="purchaseVendor" required>

                    <option value="">
                        Select Vendor
                    </option>

                    ${
                        vendors.map(vendor => `
                            <option value="${vendor.id}">
                                ${vendor.name}
                            </option>
                        `).join("")
                    }

                </select>

                <label>Date</label>

                <input
                    type="date"
                    id="purchaseDate"
                    required
                >

                <label>Description</label>

                <input
                    type="text"
                    id="purchaseDescription"
                    placeholder="Purchase Description"
                    required
                >

                <label>Amount</label>

                <input
                    type="number"
                    id="purchaseAmount"
                    placeholder="Amount"
                    min="0"
                    step="0.01"
                    required
                >

                <label>Payment Status</label>

                <select id="purchaseStatus">

                    <option value="paid">
                        Paid
                    </option>

                    <option value="unpaid">
                        Unpaid
                    </option>

                </select>

                <div class="form-buttons">

                    <button
                        type="submit"
                        class="new-btn">
                        Save Purchase
                    </button>

                    <button
                        type="button"
                        class="cancel-btn"
                        onclick="showPage('purchases')">
                        Cancel
                    </button>

                </div>

            </form>

        </div>
    `;

    document.getElementById("purchaseDate").value =
        new Date().toISOString().split("T")[0];
}


function savePurchase(event) {

    event.preventDefault();

    const vendorId =
        document.getElementById("purchaseVendor").value;

    const date =
        document.getElementById("purchaseDate").value;

    const description =
        document
            .getElementById("purchaseDescription")
            .value.trim();

    const amount =
        Number(
            document.getElementById("purchaseAmount").value
        );

    const status =
        document.getElementById("purchaseStatus").value;

    const vendor =
        vendors.find(
            v => String(v.id) === String(vendorId)
        );

    if (!vendor || !date || !description || amount <= 0) {

        alert("Please enter valid purchase details.");

        return;
    }

    purchases.push({

        id: Date.now(),

        vendorId: vendor.id,

        vendor: vendor.name,

        date: date,

        description: description,

        amount: amount,

        status: status

    });

    savePurchases();

    alert("Purchase saved successfully!");

    showPage("purchases");
}


/* =========================
   ACCOUNTING
========================= */

function showAccounting() {

    pageTitle.innerText = "Accounting";

    const sales =
        invoices.reduce(
            (sum, invoice) =>
                sum + Number(invoice.total || 0),
            0
        );

    const expenses =
        transactions
            .filter(t => t.type === "expense")
            .reduce(
                (sum, t) =>
                    sum + Number(t.amount || 0),
                0
            );

    const purchaseTotal =
        purchases.reduce(
            (sum, purchase) =>
                sum + Number(purchase.amount || 0),
            0
        );

    const netPosition =
        sales - expenses - purchaseTotal;

    content.innerHTML = `

        <div class="dashboard-section">

            <h2>📚 Accounting Overview</h2>

            <p>
                Business financial position
            </p>

        </div>

        <div class="cards">

            <div class="card">
                <h3>💰 Sales</h3>
                <p>${formatMoney(sales)}</p>
            </div>

            <div class="card">
                <h3>💸 Expenses</h3>
                <p>${formatMoney(expenses)}</p>
            </div>

            <div class="card">
                <h3>🛒 Purchases</h3>
                <p>${formatMoney(purchaseTotal)}</p>
            </div>

            <div class="card">
                <h3>📈 Net Position</h3>
                <p>${formatMoney(netPosition)}</p>
            </div>

        </div>

        <div class="panel">

            <h2>Accounting Tools</h2>

            <div class="quick-actions">

                <div
                    class="quick-action"
                    onclick="showReports()">

                    <div class="quick-action-icon">
                        📊
                    </div>

                    <strong>
                        Financial Reports
                    </strong>

                    <span>
                        View financial reports
                    </span>

                </div>

                <div
                    class="quick-action"
                    onclick="showPage('sales')">

                    <div class="quick-action-icon">
                        🧾
                    </div>

                    <strong>
                        Sales
                    </strong>

                    <span>
                        Manage invoices
                    </span>

                </div>

                <div
                    class="quick-action"
                    onclick="showPage('purchases')">

                    <div class="quick-action-icon">
                        🛒
                    </div>

                    <strong>
                        Purchases
                    </strong>

                    <span>
                        Manage bills
                    </span>

                </div>

                <div
                    class="quick-action"
                    onclick="showPage('expenses')">

                    <div class="quick-action-icon">
                        💸
                    </div>

                    <strong>
                        Expenses
                    </strong>

                    <span>
                        Manage expenses
                    </span>

                </div>

            </div>

        </div>
    `;
}


/* =========================
   RECEIVABLES
========================= */

function showReceivables() {

    pageTitle.innerText = "Accounts Receivable";

    const unpaid =
        invoices.filter(
            invoice =>
                invoice.status === "unpaid"
        );

    const total =
        unpaid.reduce(
            (sum, invoice) =>
                sum + Number(invoice.total || 0),
            0
        );

    content.innerHTML = `

        <div class="cards">

            <div class="card">

                <h3>🧾 Unpaid Invoices</h3>

                <p>
                    ${unpaid.length}
                </p>

            </div>

            <div class="card">

                <h3>💰 Total Receivable</h3>

                <p>
                    ${formatMoney(total)}
                </p>

            </div>

        </div>

        <div class="panel">

            <h2>Accounts Receivable</h2>

            ${
                unpaid.length === 0

                    ? `
                        <div class="empty-state">
                            <h3>No outstanding invoices</h3>
                            <p>
                                All customer invoices are paid.
                            </p>
                        </div>
                    `

                    :

                    unpaid.map(invoice => `

                        <div class="transaction-row">

                            <div>

                                <strong>
                                    ${invoice.invoiceNumber}
                                </strong>

                                <small>
                                    ${invoice.customer}
                                    • ${invoice.date}
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
   PAYABLES
========================= */

function showPayables() {

    pageTitle.innerText = "Accounts Payable";

    const unpaid =
        purchases.filter(
            purchase =>
                purchase.status === "unpaid"
        );

    const total =
        unpaid.reduce(
            (sum, purchase) =>
                sum + Number(purchase.amount || 0),
            0
        );

    content.innerHTML = `

        <div class="cards">

            <div class="card">

                <h3>🛒 Unpaid Bills</h3>

                <p>
                    ${unpaid.length}
                </p>

            </div>

            <div class="card">

                <h3>💰 Total Payable</h3>

                <p>
                    ${formatMoney(total)}
                </p>

            </div>

        </div>

        <div class="panel">

            <h2>Accounts Payable</h2>

            ${
                unpaid.length === 0

                    ? `
                        <div class="empty-state">
                            <h3>No outstanding bills</h3>
                            <p>
                                All vendor bills are paid.
                            </p>
                        </div>
                    `

                    :

                    unpaid.map(purchase => `

                        <div class="transaction-row">

                            <div>

                                <strong>
                                    ${purchase.vendor}
                                </strong>

                                <small>
                                    ${purchase.description}
                                    • ${purchase.date}
                                </small>

                            </div>

                            <strong>
                                ${formatMoney(purchase.amount)}
                            </strong>

                        </div>

                    `).join("")
            }

        </div>
    `;
}
/* =========================
   PURCHASES
========================= */

function showPurchases() {

    pageTitle.innerText = "Purchases";

    const totalPurchases =
        purchases.reduce(
            (sum, purchase) =>
                sum + Number(purchase.amount || 0),
            0
        );

    content.innerHTML = `

        <div class="cards">

            <div class="card">
                <h3>🛒 Total Purchases</h3>
                <p>${formatMoney(totalPurchases)}</p>
            </div>

            <div class="card">
                <h3>📄 Purchase Bills</h3>
                <p>${purchases.length}</p>
            </div>

        </div>

        <div class="panel">

            <h2>Purchases</h2>

            <p>
                Manage vendors, bills and purchase payments.
            </p>

            <button
                class="new-btn"
                onclick="openPurchaseForm()">
                + New Bill
            </button>

        </div>

        <div class="panel">

            <h2>Purchase Records</h2>

            ${
                purchases.length === 0

                    ? `<p>No purchase records yet.</p>`

                    :

                    purchases
                        .slice()
                        .reverse()
                        .map(purchase => `

                            <div class="transaction-row">

                                <div>

                                    <strong>
                                        ${purchase.vendor}
                                    </strong>

                                    <small>
                                        ${purchase.description}
                                        • ${purchase.date}
                                        • ${purchase.status}
                                    </small>

                                </div>

                                <strong>
                                    ${formatMoney(
                                        purchase.amount
                                    )}
                                </strong>

                            </div>

                        `)
                        .join("")
            }

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

            <h2>🏢 Vendors</h2>

            <p>
                Manage suppliers and vendor accounts.
            </p>

            <button
                class="new-btn"
                openVendorForm()
function showInventory() {

    pageTitle.innerText = "Inventory";

    const totalProducts = products.length;

    const stockValue = products.reduce(
        (sum, product) =>
            sum + (Number(product.stock) * Number(product.cost)),
        0
    );

    content.innerHTML = `

        <div class="cards">

            <div class="card">
                <p>Total Products</p>
                <h2>${totalProducts}</h2>
            </div>

            <div class="card">
                <p>Stock Value</p>
                <h2>${formatMoney(stockValue)}</h2>
            </div>

        </div>


        <div class="panel">

            <h2>Inventory</h2>

            <button
                class="new-btn"
                onclick="openProductForm()"
            >
                + Add Product
            </button>

        </div>


        <div class="panel">

            <h2>Product List</h2>

            ${
                products.length === 0
                    ? `<p>No products added yet.</p>`

                    : products
                        .slice()
                        .reverse()
                        .map(product => `

                            <div class="transaction-row">

                                <div>

                                    <strong>
                                        ${product.name}
                                    </strong>

                                    <small>
                                        SKU: ${product.sku || "N/A"}
                                        • Stock: ${product.stock}
                                        • Cost: ${formatMoney(product.cost)}
                                    </small>

                                </div>

                                <strong>
                                    ${formatMoney(
                                        Number(product.stock) *
                                        Number(product.cost)
                                    )}
                                </strong>

                            </div>

                        `)
                        .join("")
            }

        </div>
    `;
}

function openProductForm() {

    pageTitle.innerText = "Add Product";

    content.innerHTML = `

        <div class="panel">

            <h2>New Product</h2>

            <form onsubmit="addProduct(event)">

                <label>Product Name</label>

                <input
                    type="text"
                    id="productName"
                    placeholder="Enter product name"
                    required
                >


                <label>SKU / Product Code</label>

                <input
                    type="text"
                    id="productSKU"
                    placeholder="e.g. PROD-001"
                >


                <label>Opening Stock</label>

                <input
                    type="number"
                    id="productStock"
                    value="0"
                    min="0"
                    step="1"
                    required
                >


                <label>Cost Price</label>

                <input
                    type="number"
                    id="productCost"
                    placeholder="Enter cost price"
                    min="0"
                    step="0.01"
                    required
                >


                <label>Sale Price</label>

                <input
                    type="number"
                    id="productPrice"
                    placeholder="Enter sale price"
                    min="0"
                    step="0.01"
                    required
                >


                <div class="form-buttons">

                    <button
                        type="submit"
                        class="new-btn"
                    >
                        Save Product
                    </button>

                    <button
                        type="button"
                        class="cancel-btn"
                        onclick="showPage('inventory')"
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>
    `;
}

function addProduct(event) {

    event.preventDefault();

    const name =
        document.getElementById("productName").value.trim();

    const sku =
        document.getElementById("productSKU").value.trim();

    const stock =
        Number(document.getElementById("productStock").value);

    const cost =
        Number(document.getElementById("productCost").value);

    const price =
        Number(document.getElementById("productPrice").value);

    if (
        !name ||
        stock < 0 ||
        cost < 0 ||
        price <= 0
    ) {

        alert("Please enter valid product details.");

        return;
    }

    products.push({

        id: Date.now(),

        name: name,

        sku: sku,

        stock: stock,

        cost: cost,

        price: price
    });

    saveProducts();

    alert("Product saved successfully!");

    showPage("inventory");
}


/* =========================
   BALANCE SHEET
========================= */

function showBalanceSheet() {

    pageTitle.innerText = "Balance Sheet";

    /* =========================
       ASSETS
    ========================= */

    const receivables = invoices
        .filter(invoice => invoice.status === "unpaid")
        .reduce(
            (sum, invoice) =>
                sum + Number(invoice.total || 0),
            0
        );

    const inventoryValue = products.reduce(
        (sum, product) =>
            sum +
            (Number(product.stock || 0) *
             Number(product.cost || 0)),
        0
    );

    const paidSales = invoices
        .filter(invoice => invoice.status === "paid")
        .reduce(
            (sum, invoice) =>
                sum + Number(invoice.total || 0),
            0
        );

    const paidPurchases = purchases
        .filter(purchase => purchase.status === "paid")
        .reduce(
            (sum, purchase) =>
                sum + Number(purchase.amount || 0),
            0
        );

    const expenses = transactions
        .filter(t => t.type === "expense")
        .reduce(
            (sum, t) =>
                sum + Number(t.amount || 0),
            0
        );

    const cashBalance =
        paidSales -
        paidPurchases -
        expenses;


    /* =========================
       LIABILITIES
    ========================= */

    const payables = purchases
        .filter(purchase => purchase.status === "unpaid")
        .reduce(
            (sum, purchase) =>
                sum + Number(purchase.amount || 0),
            0
        );


    /* =========================
       PROFIT
    ========================= */

    const totalSales = invoices.reduce(
        (sum, invoice) =>
            sum + Number(invoice.total || 0),
        0
    );

    const netProfit =
        totalSales - expenses;


    /* =========================
       TOTAL ASSETS
    ========================= */

    const totalAssets =
        cashBalance +
        receivables +
        inventoryValue;


    /* =========================
       EQUITY
    ========================= */

    const equity =
        totalAssets -
        payables;


    /* =========================
       DISPLAY
    ========================= */

    content.innerHTML = `

        <!-- HEADER -->

        <div class="dashboard-section">

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                gap:15px;
                flex-wrap:wrap;
            ">

                <div>

                    <h2 style="margin:0 0 5px 0;">
                        ⚖️ Balance Sheet
                    </h2>

                    <p style="
                        margin:0;
                        color:#718096;
                        font-size:13px;
                    ">
                        Summary of your business assets,
                        liabilities and equity.
                    </p>

                </div>

                <button
                    class="new-btn"
                    onclick="showPage('balance-sheet')"
                >
                    🔄 Refresh
                </button>

            </div>

        </div>


        <!-- SUMMARY CARDS -->

        <div class="cards">

            <div class="card" style="
                border-top:4px solid #0f766e;
            ">

                <h3>🏦 Total Assets</h3>

                <p style="color:#0f766e;">
                    ${formatMoney(totalAssets)}
                </p>

            </div>


            <div class="card" style="
                border-top:4px solid #dc2626;
            ">

                <h3>📋 Total Liabilities</h3>

                <p style="color:#dc2626;">
                    ${formatMoney(payables)}
                </p>

            </div>


            <div class="card" style="
                border-top:4px solid #2563eb;
            ">

                <h3>💼 Equity</h3>

                <p style="color:#2563eb;">
                    ${formatMoney(equity)}
                </p>

            </div>


            <div class="card" style="
                border-top:4px solid #059669;
            ">

                <h3>📈 Net Profit</h3>

                <p style="color:#059669;">
                    ${formatMoney(netProfit)}
                </p>

            </div>

        </div>


        <!-- BALANCE SHEET -->

        <div class="panel">

            <h2>📑 Statement of Financial Position</h2>

            <p style="
                color:#718096;
                font-size:13px;
                margin-bottom:20px;
            ">
                Current financial position of the business.
            </p>


            <!-- ASSETS -->

            <div style="
                padding:18px;
                background:#f8fafc;
                border-radius:10px;
                margin-bottom:15px;
            ">

                <h3 style="
                    margin-top:0;
                    margin-bottom:15px;
                ">
                    🏦 Assets
                </h3>


                <div style="
                    display:flex;
                    justify-content:space-between;
                    padding:10px 0;
                    border-bottom:1px solid #e2e8f0;
                ">

                    <span>Cash & Bank</span>

                    <strong>
                        ${formatMoney(cashBalance)}
                    </strong>

                </div>


                <div style="
                    display:flex;
                    justify-content:space-between;
                    padding:10px 0;
                    border-bottom:1px solid #e2e8f0;
                ">

                    <span>Accounts Receivable</span>

                    <strong>
                        ${formatMoney(receivables)}
                    </strong>

                </div>


                <div style="
                    display:flex;
                    justify-content:space-between;
                    padding:10px 0;
                ">

                    <span>Inventory</span>

                    <strong>
                        ${formatMoney(inventoryValue)}
                    </strong>

                </div>


                <div style="
                    display:flex;
                    justify-content:space-between;
                    margin-top:12px;
                    padding-top:12px;
                    border-top:2px solid #cbd5e1;
                ">

                    <strong>Total Assets</strong>

                    <strong style="color:#0f766e;">
                        ${formatMoney(totalAssets)}
                    </strong>

                </div>

            </div>


            <!-- LIABILITIES -->

            <div style="
                padding:18px;
                background:#fef2f2;
                border-radius:10px;
                margin-bottom:15px;
            ">

                <h3 style="
                    margin-top:0;
                    margin-bottom:15px;
                ">
                    📋 Liabilities
                </h3>


                <div style="
                    display:flex;
                    justify-content:space-between;
                    padding:10px 0;
                ">

                    <span>Accounts Payable</span>

                    <strong>
                        ${formatMoney(payables)}
                    </strong>

                </div>


                <div style="
                    display:flex;
                    justify-content:space-between;
                    margin-top:12px;
                    padding-top:12px;
                    border-top:2px solid #fecaca;
                ">

                    <strong>Total Liabilities</strong>

                    <strong style="color:#dc2626;">
                        ${formatMoney(payables)}
                    </strong>

                </div>

            </div>


            <!-- EQUITY -->

            <div style="
                padding:18px;
                background:#eff6ff;
                border-radius:10px;
            ">

                <h3 style="
                    margin-top:0;
                    margin-bottom:15px;
                ">
                    💼 Equity
                </h3>


                <div style="
                    display:flex;
                    justify-content:space-between;
                    padding:10px 0;
                ">

                    <span>Business Equity</span>

                    <strong>
                        ${formatMoney(equity)}
                    </strong>

                </div>


                <div style="
                    display:flex;
                    justify-content:space-between;
                    margin-top:12px;
                    padding-top:12px;
                    border-top:2px solid #bfdbfe;
                ">

                    <strong>
                        Liabilities + Equity
                    </strong>

                    <strong style="color:#2563eb;">
                        ${formatMoney(payables + equity)}
                    </strong>

                </div>

            </div>

        </div>               

       `;
}


/* =========================
   TRIAL BALANCE
========================= */

function showTrialBalance() {

    pageTitle.innerText = "Trial Balance";

    /* =========================
       CALCULATIONS
    ========================= */

    const totalSales = invoices.reduce(
        (sum, invoice) =>
            sum + Number(invoice.total || 0),
        0
    );

    const totalExpenses = transactions
        .filter(t => t.type === "expense")
        .reduce(
            (sum, t) =>
                sum + Number(t.amount || 0),
            0
        );

    const receivables = invoices
        .filter(invoice => invoice.status === "unpaid")
        .reduce(
            (sum, invoice) =>
                sum + Number(invoice.total || 0),
            0
        );

    const inventoryValue = products.reduce(
        (sum, product) =>
            sum +
            (
                Number(product.stock || 0) *
                Number(product.cost || 0)
            ),
        0
    );

    const paidSales = invoices
        .filter(invoice => invoice.status === "paid")
        .reduce(
            (sum, invoice) =>
                sum + Number(invoice.total || 0),
            0
        );

    const paidPurchases = purchases
        .filter(purchase => purchase.status === "paid")
        .reduce(
            (sum, purchase) =>
                sum + Number(purchase.amount || 0),
            0
        );

    const payables = purchases
        .filter(purchase => purchase.status === "unpaid")
        .reduce(
            (sum, purchase) =>
                sum + Number(purchase.amount || 0),
            0
        );

    const cashBalance =
        paidSales -
        paidPurchases -
        totalExpenses;


    /* =========================
       TOTAL ASSETS
    ========================= */

    const totalAssets =
        cashBalance +
        receivables +
        inventoryValue;


    /* =========================
       NET PROFIT
    ========================= */

    const netProfit =
        totalSales -
        totalExpenses;


    /* =========================
       OPENING / OWNER EQUITY
       Used to balance Trial Balance
    ========================= */

    const ownerEquity =
        totalAssets -
        payables -
        netProfit;


    /* =========================
       DEBIT / CREDIT TOTALS
    ========================= */

    const debitTotal =
        cashBalance +
        receivables +
        inventoryValue +
        totalExpenses;

    const creditTotal =
        totalSales +
        payables +
        ownerEquity;


    /* =========================
       DISPLAY
    ========================= */

    content.innerHTML = `

        <div class="dashboard-section">

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                gap:15px;
                flex-wrap:wrap;
            ">

                <div>

                    <h2 style="margin:0 0 5px 0;">
                        📊 Trial Balance
                    </h2>

                    <p style="
                        margin:0;
                        color:#718096;
                        font-size:13px;
                    ">
                        Summary of debit and credit balances.
                    </p>

                </div>

                <button
                    class="new-btn"
                    onclick="showPage('trial-balance')"
                >
                    🔄 Refresh
                </button>

            </div>

        </div>


        <div class="cards">

            <div class="card" style="
                border-top:4px solid #2563eb;
            ">

                <h3>📥 Total Debit</h3>

                <p style="color:#2563eb;">
                    ${formatMoney(debitTotal)}
                </p>

            </div>


            <div class="card" style="
                border-top:4px solid #059669;
            ">

                <h3>📤 Total Credit</h3>

                <p style="color:#059669;">
                    ${formatMoney(creditTotal)}
                </p>

            </div>


            <div class="card" style="
                border-top:4px solid #7c3aed;
            ">

                <h3>📑 Accounts</h3>

                <p style="color:#7c3aed;">
                    7
                </p>

            </div>


            <div class="card" style="
                border-top:4px solid #0f766e;
            ">

                <h3>⚖️ Difference</h3>

                <p style="color:#0f766e;">
                    ${formatMoney(
                        Math.abs(debitTotal - creditTotal)
                    )}
                </p>

            </div>

        </div>


        <div class="panel">

            <h2>📑 Trial Balance Statement</h2>

            <p style="
                color:#718096;
                font-size:13px;
                margin-bottom:20px;
            ">
                Debit and credit balances of the business.
            </p>


            <div style="
                overflow-x:auto;
            ">

                <table style="
                    width:100%;
                    border-collapse:collapse;
                    min-width:650px;
                ">

                    <thead>

                        <tr style="
                            background:#f8fafc;
                            border-bottom:2px solid #e2e8f0;
                        ">

                            <th style="
                                text-align:left;
                                padding:13px;
                            ">
                                Account
                            </th>

                            <th style="
                                text-align:right;
                                padding:13px;
                            ">
                                Debit
                            </th>

                            <th style="
                                text-align:right;
                                padding:13px;
                            ">
                                Credit
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        <tr>
                            <td style="padding:13px;">
                                Cash & Bank
                            </td>

                            <td style="
                                padding:13px;
                                text-align:right;
                            ">
                                ${formatMoney(cashBalance)}
                            </td>

                            <td style="
                                padding:13px;
                                text-align:right;
                            ">
                                —
                            </td>
                        </tr>


                        <tr>
                            <td style="padding:13px;">
                                Accounts Receivable
                            </td>

                            <td style="
                                padding:13px;
                                text-align:right;
                            ">
                                ${formatMoney(receivables)}
                            </td>

                            <td style="
                                padding:13px;
                                text-align:right;
                            ">
                                —
                            </td>
                        </tr>


                        <tr>
                            <td style="padding:13px;">
                                Inventory
                            </td>

                            <td style="
                                padding:13px;
                                text-align:right;
                            ">
                                ${formatMoney(inventoryValue)}
                            </td>

                            <td style="
                                padding:13px;
                                text-align:right;
                            ">
                                —
                            </td>
                        </tr>


                        <tr>
                            <td style="padding:13px;">
                                Expenses
                            </td>

                            <td style="
                                padding:13px;
                                text-align:right;
                            ">
                                ${formatMoney(totalExpenses)}
                            </td>

                            <td style="
                                padding:13px;
                                text-align:right;
                            ">
                                —
                            </td>
                        </tr>


                        <tr>
                            <td style="padding:13px;">
                                Sales
                            </td>

                            <td style="
                                padding:13px;
                                text-align:right;
                            ">
                                —
                            </td>

                            <td style="
                                padding:13px;
                                text-align:right;
                            ">
                                ${formatMoney(totalSales)}
                            </td>
                        </tr>


                        <tr>
                            <td style="padding:13px;">
                                Accounts Payable
                            </td>

                            <td style="
                                padding:13px;
                                text-align:right;
                            ">
                                —
                            </td>

                            <td style="
                                padding:13px;
                                text-align:right;
                            ">
                                ${formatMoney(payables)}
                            </td>
                        </tr>


                        <tr>
                            <td style="padding:13px;">
                                Owner's Capital / Equity
                            </td>

                            <td style="
                                padding:13px;
                                text-align:right;
                            ">
                                —
                            </td>

                            <td style="
                                padding:13px;
                                text-align:right;
                            ">
                                ${formatMoney(ownerEquity)}
                            </td>
                        </tr>

                    </tbody>


                    <tfoot>

                        <tr style="
                            border-top:2px solid #cbd5e1;
                            background:#f8fafc;
                        ">

                            <th style="
                                padding:15px 13px;
                                text-align:left;
                            ">
                                Total
                            </th>

                            <th style="
                                padding:15px 13px;
                                text-align:right;
                                color:#2563eb;
                            ">
                                ${formatMoney(debitTotal)}
                            </th>

                            <th style="
                                padding:15px 13px;
                                text-align:right;
                                color:#059669;
                            ">
                                ${formatMoney(creditTotal)}
                            </th>

                        </tr>

                    </tfoot>

                </table>

            </div>

        </div>

      `;
}


/* =========================
   CASH FLOW
========================= */

function showCashFlow() {

    pageTitle.innerText = "Cash Flow Statement";

    const cashInflow = invoices
        .filter(invoice => invoice.status === "paid")
        .reduce(
            (sum, invoice) =>
                sum + Number(invoice.total || 0),
            0
        );

    const cashOutflow = purchases
        .filter(purchase => purchase.status === "paid")
        .reduce(
            (sum, purchase) =>
                sum + Number(purchase.amount || 0),
            0
        );

    const expensesPaid = transactions
        .filter(t => t.type === "expense")
        .reduce(
            (sum, t) =>
                sum + Number(t.amount || 0),
            0
        );

    const netCashFlow =
        cashInflow -
        cashOutflow -
        expensesPaid;

    content.innerHTML = `

        <div class="dashboard-section">

            <h2>💰 Cash Flow Statement</h2>

            <p style="
                color:#718096;
                font-size:13px;
            ">
                Summary of cash received and cash paid by the business.
            </p>

        </div>


        <div class="cards">

            <div class="card">
                <h3>💵 Cash Inflow</h3>
                <p>
                    ${formatMoney(cashInflow)}
                </p>
            </div>


            <div class="card">
                <h3>🛒 Purchases Paid</h3>
                <p>
                    ${formatMoney(cashOutflow)}
                </p>
            </div>


            <div class="card">
                <h3>💸 Expenses Paid</h3>
                <p>
                    ${formatMoney(expensesPaid)}
                </p>
            </div>


            <div class="card">
                <h3>🏦 Net Cash Flow</h3>
                <p>
                    ${formatMoney(netCashFlow)}
                </p>
            </div>

        </div>


        <div class="panel">

            <h2>📑 Cash Flow Details</h2>

            <table style="
                width:100%;
                border-collapse:collapse;
            ">

                <tr>
                    <td style="padding:13px;">
                        Cash received from customers
                    </td>

                    <td style="
                        padding:13px;
                        text-align:right;
                    ">
                        ${formatMoney(cashInflow)}
                    </td>
                </tr>


                <tr>
                    <td style="padding:13px;">
                        Purchases paid
                    </td>

                    <td style="
                        padding:13px;
                        text-align:right;
                    ">
                        - ${formatMoney(cashOutflow)}
                    </td>
                </tr>


                <tr>
                    <td style="padding:13px;">
                        Expenses paid
                    </td>

                    <td style="
                        padding:13px;
                        text-align:right;
                    ">
                        - ${formatMoney(expensesPaid)}
                    </td>
                </tr>


                <tr style="
                    border-top:2px solid #cbd5e1;
                    font-weight:bold;
                ">

                    <td style="padding:15px 13px;">
                        Net Cash Flow
                    </td>

                    <td style="
                        padding:15px 13px;
                        text-align:right;
                    ">
                        ${formatMoney(netCashFlow)}
                    </td>

                </tr>

            </table>

        </div>

    `;
}


function showReports() {

    pageTitle.innerText = "Reports";

    /* =========================
       PROFIT & LOSS CALCULATION
    ========================= */

    const totalSales =
        invoices.reduce(
            (sum, invoice) =>
                sum + Number(invoice.total || 0),
            0
        );

    const totalExpenses =
        transactions
            .filter(t => t.type === "expense")
            .reduce(
                (sum, t) =>
                    sum + Number(t.amount || 0),
                0
            );

    const netProfit =
        totalSales - totalExpenses;


    content.innerHTML = `

        <!-- =========================
             REPORT HEADER
        ========================= -->

        <div class="dashboard-section">

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                gap:15px;
                flex-wrap:wrap;
            ">

                <div>

                    <h2 style="margin:0 0 5px 0;">
                        📊 Financial Reports
                    </h2>

                    <p style="
                        margin:0;
                        color:#718096;
                        font-size:13px;
                    ">
                        View your business financial performance.
                    </p>

                </div>

                <button
                    class="new-btn"
                    onclick="showPage('reports')"
                >
                    🔄 Refresh
                </button>

            </div>

        </div>


        <!-- =========================
             REPORT CARDS
        ========================= -->

        <div class="cards">

            <div class="card" style="
                border-top:4px solid #0f766e;
            ">

                <h3>💰 Total Sales</h3>

                <p style="color:#0f766e;">
                    ${formatMoney(totalSales)}
                </p>

                <small style="color:#718096;">
                    Total invoice revenue
                </small>

            </div>


            <div class="card" style="
                border-top:4px solid #dc2626;
            ">

                <h3>💸 Total Expenses</h3>

                <p style="color:#dc2626;">
                    ${formatMoney(totalExpenses)}
                </p>

                <small style="color:#718096;">
                    Recorded business expenses
                </small>

            </div>


            <div class="card" style="
                border-top:4px solid #059669;
            ">

                <h3>📈 Net Profit</h3>

                <p style="color:#059669;">
                    ${formatMoney(netProfit)}
                </p>

                <small style="color:#718096;">
                    Sales − Expenses
                </small>

            </div>

        </div>


        <!-- =========================
             PROFIT & LOSS
        ========================= -->

        <div class="panel">

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                margin-bottom:20px;
            ">

                <div>

                    <h2 style="margin:0 0 5px 0;">
                        📑 Profit & Loss Statement
                    </h2>

                    <p style="
                        margin:0;
                        color:#718096;
                        font-size:12px;
                    ">
                        Summary of business income and expenses.
                    </p>

                </div>

                <span style="
                    background:#eef5fa;
                    color:#175b87;
                    padding:7px 11px;
                    border-radius:8px;
                    font-size:11px;
                    font-weight:700;
                ">
                    Current Period
                </span>

            </div>


            <!-- REVENUE -->

            <div style="
                padding:15px;
                background:#f8fafc;
                border-radius:10px;
                margin-bottom:12px;
            ">

                <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                ">

                    <strong>
                        Revenue
                    </strong>

                    <strong style="color:#0f766e;">
                        ${formatMoney(totalSales)}
                    </strong>

                </div>

            </div>


            <!-- EXPENSES -->

            <div style="
                padding:15px;
                background:#fef2f2;
                border-radius:10px;
                margin-bottom:12px;
            ">

                <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                ">

                    <strong>
                        Operating Expenses
                    </strong>

                    <strong style="color:#dc2626;">
                        ${formatMoney(totalExpenses)}
                    </strong>

                </div>

            </div>


            <!-- SEPARATOR -->

            <div style="
                border-top:2px solid #e2e8f0;
                margin:18px 0;
            "></div>


            <!-- NET PROFIT -->

            <div style="
                padding:18px;
                background:${
                    netProfit >= 0
                        ? "#ecfdf5"
                        : "#fef2f2"
                };
                border-radius:10px;
            ">

                <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                ">

                    <strong style="font-size:16px;">
                        ${
                            netProfit >= 0
                                ? "Net Profit"
                                : "Net Loss"
                        }
                    </strong>

                    <strong style="
                        font-size:18px;
                        color:${
                            netProfit >= 0
                                ? "#059669"
                                : "#dc2626"
                        };
                    ">
                        ${formatMoney(netProfit)}
                    </strong>

                </div>

            </div>

        </div>


        <!-- =========================
             OTHER REPORTS
        ========================= -->

        <div class="panel">

            <h2>📚 Other Reports</h2>

            <p style="
                color:#718096;
                font-size:13px;
            ">
                Additional accounting reports will be added here.
            </p>

                <div
    class="quick-action"
    onclick="showPage('balance-sheet')"
    style="cursor:pointer;"
>

    <div class="quick-action-icon">
        📋
    </div>

    <strong>
        Balance Sheet
    </strong>

    <span>
        View Report
    </span>

</div>


               <div
    class="quick-action"
    onclick="showPage('trial-balance')"
    style="cursor:pointer;"
>

    <div class="quick-action-icon">
        📊
    </div>

    <strong>
        Trial Balance
    </strong>

    <span>
        View Report
    </span>

</div>


                <div class="quick-action">

                    <div class="quick-action-icon">
                        🧾
                    </div>

                    <strong>
                        Receivable Aging
                    </strong>

                    <span>
                        Coming next
                    </span>

                </div>

            </div>

        </div>

    `;
}
/* =========================================
   THEA BOOKS PAGE NAVIGATION
========================================= */

let pageHistory = [];
let historyPosition = -1;
let navigatingHistory = false;


/* =========================
   SHOW PAGE
========================= */

function showPage(page) {

    /* Save page in browser storage */
    localStorage.setItem(
        "theaBooksCurrentPage",
        page
    );


    /* Add page to THEA Books history */

    if (!navigatingHistory) {

        /* Remove forward history */
        pageHistory =
            pageHistory.slice(
                0,
                historyPosition + 1
            );


        /* Don't add same page twice */
        if (
            pageHistory.length === 0 ||
            pageHistory[pageHistory.length - 1] !== page
        ) {

            pageHistory.push(page);

            historyPosition =
                pageHistory.length - 1;
        }
    }


    /* =========================
       OPEN SELECTED PAGE
    ========================= */

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

else if (page === "receivables") {

    showReceivables();

}

else if (page === "payables") {

    showPayables();

}

else if (page === "reports") {

    showReports();

}
    else if (page === "trial-balance") {

    showTrialBalance();

}
else if (page === "balance-sheet") {

    showBalanceSheet();

}
    
    /* Close mobile menu after navigation */

    const navigation =
        document.getElementById("mainNavigation");

    if (navigation) {

        navigation.classList.remove(
            "mobile-open"
        );
    }
}


/* =========================
   BACK
========================= */

function goBack() {

    if (historyPosition <= 0) {

        return;
    }


    historyPosition--;


    navigatingHistory = true;


    showPage(
        pageHistory[historyPosition]
    );


    navigatingHistory = false;
}


/* =========================
   FORWARD
========================= */

function goForward() {

    if (
        historyPosition >=
        pageHistory.length - 1
    ) {

        return;
    }


    historyPosition++;


    navigatingHistory = true;


    showPage(
        pageHistory[historyPosition]
    );


    navigatingHistory = false;
}


/* =========================
   LOAD DASHBOARD ON START
========================= */

const savedPage =
    localStorage.getItem("theaBooksCurrentPage") || "dashboard";

pageHistory = [savedPage];

historyPosition = 0;

showPage(savedPage);

if (companyAccount.name) {

    const companyName =
        document.getElementById("currentCompanyName");

    const companyStatus =
        document.getElementById("currentCompanyStatus");

    if (companyName) {
        companyName.innerText =
            companyAccount.name;
    }

    if (companyStatus) {
        companyStatus.innerText =
            companyAccount.phone ||
            "Company configured";
    }
}
/* =========================
   MOBILE MENU
========================= */

function toggleMobileMenu() {

    const navigation =
        document.getElementById("mainNavigation");

    navigation.classList.toggle(
        "mobile-open"
    );
}
