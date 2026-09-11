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


    const totalSales =
        invoiceSales + transactionSales;


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
             WELCOME
        ========================== -->

        <div class="dashboard-section">

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                gap:15px;
                flex-wrap:wrap;
            ">

                <div>

                    <h2 style="margin-bottom:5px;">
                        Welcome to THEA Books 👋
                    </h2>

                    <p style="color:#718096;font-size:13px;">
                        Your business financial overview
                    </p>

                </div>

                <div style="
                    padding:10px 15px;
                    background:#edf5fa;
                    border-radius:10px;
                    color:#175b87;
                    font-size:12px;
                    font-weight:700;
                ">

                    ${new Date().toLocaleDateString("en-PK")}

                </div>

            </div>

        </div>


        <!-- =========================
             KPI CARDS
        ========================== -->

        <div class="cards">

            <div class="card">

                <h3>💰 Total Sales</h3>

                <p>
                    ${formatMoney(totalSales)}
                </p>

                <small style="
                    color:#059669;
                    font-weight:600;
                ">
                    ↑ Business Revenue
                </small>

            </div>


            <div class="card">

                <h3>💸 Total Expenses</h3>

                <p>
                    ${formatMoney(totalExpenses)}
                </p>

                <small style="
                    color:#dc2626;
                    font-weight:600;
                ">
                    Business Expenses
                </small>

            </div>


            <div class="card">

                <h3>📈 Net Profit</h3>

                <p>
                    ${formatMoney(netProfit)}
                </p>

                <small style="
                    color:#059669;
                    font-weight:600;
                ">
                    Sales − Expenses
                </small>

            </div>


            <div class="card">

                <h3>🧾 Receivables</h3>

                <p>
                    ${formatMoney(receivables)}
                </p>

                <small style="
                    color:#7c3aed;
                    font-weight:600;
                ">
                    Unpaid Invoices
                </small>

            </div>

        </div>


        <!-- =========================
             QUICK ACTIONS
        ========================== -->

        <div class="quick-actions">

            <div
                class="quick-action"
                onclick="openInvoiceForm()"
            >

                <div class="quick-action-icon">
                    🧾
                </div>

                <strong>
                    Create Invoice
                </strong>

                <span>
                    Create a new sales invoice
                </span>

            </div>


            <div
                class="quick-action"
                onclick="openCustomerForm()"
            >

                <div class="quick-action-icon">
                    👥
                </div>

                <strong>
                    Add Customer
                </strong>

                <span>
                    Create customer account
                </span>

            </div>


            <div
                class="quick-action"
                onclick="openExpenseForm()"
            >

                <div class="quick-action-icon">
                    💸
                </div>

                <strong>
                    Record Expense
                </strong>

                <span>
                    Add business expense
                </span>

            </div>


            <div
                class="quick-action"
                onclick="openProductForm()"
            >

                <div class="quick-action-icon">
                    📦
                </div>

                <strong>
                    Add Product
                </strong>

                <span>
                    Add inventory item
                </span>

            </div>

        </div>


        <!-- =========================
             FINANCIAL OVERVIEW
        ========================== -->

        <div class="dashboard-grid">


            <!-- SALES / EXPENSES -->

            <div class="chart-container">

                <h3>
                    📊 Financial Overview
                </h3>

                <p style="
                    color:#718096;
                    font-size:12px;
                    margin-bottom:20px;
                ">
                    Sales vs Expenses
                </p>


                <div style="
                    display:flex;
                    align-items:flex-end;
                    justify-content:center;
                    gap:35px;
                    height:190px;
                    border-bottom:1px solid #dbe4ec;
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
                            color:#175b87;
                            margin-bottom:6px;
                        ">
                            ${formatMoney(totalSales)}
                        </strong>

                        <div style="
                            width:55px;
                            height:${Math.max(
                                25,
                                totalSales > 0
                                    ? Math.min(
                                        130,
                                        (totalSales /
                                        Math.max(
                                            totalSales,
                                            totalExpenses,
                                            1
                                        )) * 130
                                    )
                                    : 25
                            )}px;

                            background:linear-gradient(
                                180deg,
                                #2587c7,
                                #0f4c81
                            );

                            border-radius:10px 10px 0 0;
                            box-shadow:0 5px 12px
                            rgba(15,76,129,.18);
                        "></div>

                        <small style="
                            margin-top:8px;
                            color:#64748b;
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
                            margin-bottom:6px;
                        ">
                            ${formatMoney(totalExpenses)}
                        </strong>

                        <div style="
                            width:55px;
                            height:${Math.max(
                                25,
                                totalExpenses > 0
                                    ? Math.min(
                                        130,
                                        (totalExpenses /
                                        Math.max(
                                            totalSales,
                                            totalExpenses,
                                            1
                                        )) * 130
                                    )
                                    : 25
                            )}px;

                            background:linear-gradient(
                                180deg,
                                #f59e0b,
                                #c2410c
                            );

                            border-radius:10px 10px 0 0;

                            box-shadow:0 5px 12px
                            rgba(217,119,6,.18);
                        "></div>

                        <small style="
                            margin-top:8px;
                            color:#64748b;
                        ">
                            Expenses
                        </small>

                    </div>

                </div>

            </div>


            <!-- CASH / PROFIT -->

            <div class="chart-container">

                <h3>
                    💳 Business Summary
                </h3>

                <p style="
                    color:#718096;
                    font-size:12px;
                    margin-bottom:18px;
                ">
                    Current financial position
                </p>


                <div style="
                    display:flex;
                    flex-direction:column;
                    gap:13px;
                ">

                    <div style="
                        display:flex;
                        justify-content:space-between;
                        padding:13px;
                        background:#f1f8f5;
                        border-radius:10px;
                    ">

                        <span>
                            Paid Sales
                        </span>

                        <strong style="color:#059669;">
                            ${formatMoney(paidSales)}
                        </strong>

                    </div>


                    <div style="
                        display:flex;
                        justify-content:space-between;
                        padding:13px;
                        background:#f5f1fb;
                        border-radius:10px;
                    ">

                        <span>
                            Receivables
                        </span>

                        <strong style="color:#7c3aed;">
                            ${formatMoney(receivables)}
                        </strong>

                    </div>


                    <div style="
                        display:flex;
                        justify-content:space-between;
                        padding:13px;
                        background:#eef5fa;
                        border-radius:10px;
                    ">

                        <span>
                            Net Profit
                        </span>

                        <strong style="color:#175b87;">
                            ${formatMoney(netProfit)}
                        </strong>

                    </div>


                    <div style="
                        display:flex;
                        justify-content:space-between;
                        padding:13px;
                        background:#f8f4ed;
                        border-radius:10px;
                    ">

                        <span>
                            Inventory Value
                        </span>

                        <strong style="color:#b45309;">
                            ${formatMoney(stockValue)}
                        </strong>

                    </div>

                </div>

            </div>

        </div>


        <!-- =========================
             BUSINESS SUMMARY
        ========================== -->

        <div class="cards">

            <div class="card">

                <h3>📦 Products</h3>

                <p>
                    ${totalProducts}
                </p>

            </div>


            <div class="card">

                <h3>🧾 Invoices</h3>

                <p>
                    ${invoices.length}
                </p>

            </div>


            <div class="card">

                <h3>👥 Customers</h3>

                <p>
                    ${customers.length}
                </p>

            </div>


            <div class="card">

                <h3>💳 Transactions</h3>

                <p>
                    ${transactions.length}
                </p>

            </div>

        </div>


        <!-- =========================
             RECENT INVOICES
        ========================== -->

        <div class="dashboard-section">

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                margin-bottom:15px;
            ">

                <h3 style="margin:0;">
                    🧾 Recent Invoices
                </h3>

                <button
                    class="action-btn"
                    onclick="showPage('sales')"
                >
                    View All
                </button>

            </div>


            ${
                recentInvoices.length === 0

                    ? `
                        <div class="empty-state">

                            <h3>
                                No invoices yet
                            </h3>

                            <p>
                                Create your first invoice to see it here.
                            </p>

                        </div>
                    `

                    : `

                        <div class="table-container">

                            <table>

                                <thead>

                                    <tr>

                                        <th>
                                            Invoice
                                        </th>

                                        <th>
                                            Customer
                                        </th>

                                        <th>
                                            Date
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Amount
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    ${recentInvoices.map(invoice => `

                                        <tr>

                                            <td>
                                                <strong>
                                                    ${invoice.invoiceNumber}
                                                </strong>
                                            </td>

                                            <td>
                                                ${invoice.customer}
                                            </td>

                                            <td>
                                                ${invoice.date}
                                            </td>

                                            <td>

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

                                            <td>
                                                <strong>
                                                    ${formatMoney(invoice.total)}
                                                </strong>
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
        ========================== -->

        <div class="dashboard-section">

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                margin-bottom:15px;
            ">

                <h3 style="margin:0;">
                    💳 Recent Transactions
                </h3>

                <button
                    class="action-btn"
                    onclick="openTransactionForm()"
                >
                    + Transaction
                </button>

            </div>


            ${
                recentTransactions.length === 0

                    ? `
                        <div class="empty-state">

                            <h3>
                                No transactions yet
                            </h3>

                            <p>
                                Your recent business transactions will appear here.
                            </p>

                        </div>
                    `

                    : `

                        <div class="table-container">

                            <table>

                                <thead>

                                    <tr>

                                        <th>
                                            Description
                                        </th>

                                        <th>
                                            Date
                                        </th>

                                        <th>
                                            Type
                                        </th>

                                        <th>
                                            Amount
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    ${recentTransactions.map(t => `

                                        <tr>

                                            <td>
                                                <strong>
                                                    ${t.description}
                                                </strong>
                                            </td>

                                            <td>
                                                ${t.date}
                                            </td>

                                            <td>

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

                                            <td>
                                                <strong>
                                                    ${formatMoney(t.amount)}
                                                </strong>
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

    else if (page === "reports") {

        showReports();

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
   LOAD LAST PAGE
========================= */

const savedPage =
    localStorage.getItem(
        "theaBooksCurrentPage"
    ) || "dashboard";


/* Put saved page into history first */

pageHistory = [savedPage];

historyPosition = 0;


/* Open saved page */

showPage(savedPage);
/* =========================
   MOBILE MENU
========================= */

function toggleMobileMenu() {

    const navigation = document.getElementById("mainNavigation");

    navigation.classList.toggle("mobile-open");
}
/* =========================================
   THEA BOOKS PAGE NAVIGATION
========================================= */

let pageHistory = [];
let historyPosition = -1;
let navigatingHistory = false;

function navigateToPage(page) {

    if (!navigatingHistory) {

        pageHistory =
            pageHistory.slice(0, historyPosition + 1);

        pageHistory.push(page);

        historyPosition =
            pageHistory.length - 1;
    }

    showPage(page);
}

function goBack() {

    if (historyPosition > 0) {

        historyPosition--;

        navigatingHistory = true;

        showPage(
            pageHistory[historyPosition]
        );

        navigatingHistory = false;
    }
}

function goForward() {

    if (
        historyPosition <
        pageHistory.length - 1
    ) {

        historyPosition++;

        navigatingHistory = true;

        showPage(
            pageHistory[historyPosition]
        );

        navigatingHistory = false;
    }
}
