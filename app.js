const pageTitle = document.getElementById("pageTitle");
const content = document.getElementById("content");

let transactions = JSON.parse(localStorage.getItem("theaBooksTransactions")) || [];


/* =========================
   SAVE DATA
========================= */

function saveTransactions() {
    localStorage.setItem(
        "theaBooksTransactions",
        JSON.stringify(transactions)
    );
}


/* =========================
   FORMAT MONEY
========================= */

function formatMoney(amount) {
    return "Rs. " + Number(amount).toLocaleString("en-PK");
}


/* =========================
   DASHBOARD
========================= */

function showDashboard() {

    pageTitle.innerText = "Dashboard";

    const totalSales = transactions
        .filter(t => t.type === "sale")
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalExpenses = transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const netProfit = totalSales - totalExpenses;

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
                <p>Total Transactions</p>
                <h2>${transactions.length}</h2>
            </div>

        </div>

        <div class="panel">

            <h2>Recent Transactions</h2>

            ${
                transactions.length === 0
                ? `<p>No transactions yet.</p>`
                : `
                    <div class="transaction-list">

                        ${transactions
                            .slice()
                            .reverse()
                            .slice(0, 10)
                            .map(t => `
                                <div class="transaction-row">

                                    <div>
                                        <strong>${t.description}</strong>
                                        <small>${t.date} • ${t.type}</small>
                                    </div>

                                    <strong>
                                        ${formatMoney(t.amount)}
                                    </strong>

                                </div>
                            `)
                            .join("")}

                    </div>
                `
            }

        </div>
    `;
}


/* =========================
   NEW TRANSACTION FORM
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
                    placeholder="e.g. Product sale, electricity bill"
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


    const transaction = {

        id: Date.now(),

        type: type,

        date: date,

        description: description,

        amount: amount
    };


    transactions.push(transaction);

    saveTransactions();

    alert("Transaction saved successfully!");

    showPage("dashboard");
}


/* =========================
   SALES
========================= */

function showSales() {

    pageTitle.innerText = "Sales";

    const sales = transactions.filter(t => t.type === "sale");

    content.innerHTML = `

        <div class="panel">

            <h2>Sales</h2>

            <p>
                Record and manage your sales transactions.
            </p>

            <button
                class="new-btn"
                onclick="openTransactionForm()"
            >
                + Create Sale
            </button>

        </div>

        <div class="panel">

            <h2>Sales Records</h2>

            ${
                sales.length === 0
                ? `<p>No sales recorded yet.</p>`
                : sales.map(t => `
                    <div class="transaction-row">

                        <div>
                            <strong>${t.description}</strong>
                            <small>${t.date}</small>
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
                onclick="openTransactionForm()"
            >
                + Record Expense
            </button>

        </div>

        <div class="panel">

            <h2>Expense Records</h2>

            ${
                expenses.length === 0
                ? `<p>No expenses recorded yet.</p>`
                : expenses.map(t => `
                    <div class="transaction-row">

                        <div>
                            <strong>${t.description}</strong>
                            <small>${t.date}</small>
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
   OTHER PAGES
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


function showCustomers() {

    pageTitle.innerText = "Customers";

    content.innerHTML = `

        <div class="panel">

            <h2>Customers</h2>

            <button class="new-btn">
                + Add Customer
            </button>

        </div>

        <div class="panel">

            <h2>Customer List</h2>

            <p>No customers added yet.</p>

        </div>
    `;
}


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

showPage("dashboard");
