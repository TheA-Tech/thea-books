const pageTitle = document.getElementById("pageTitle");
const content = document.getElementById("content");

function showPage(page) {

    if (page === "dashboard") {
        pageTitle.innerText = "Dashboard";

        content.innerHTML = `
            <div class="cards">

                <div class="card">
                    <p>Total Sales</p>
                    <h2>Rs. 0</h2>
                </div>

                <div class="card">
                    <p>Total Expenses</p>
                    <h2>Rs. 0</h2>
                </div>

                <div class="card">
                    <p>Receivables</p>
                    <h2>Rs. 0</h2>
                </div>

                <div class="card">
                    <p>Payables</p>
                    <h2>Rs. 0</h2>
                </div>

            </div>

            <div class="panel">
                <h2>Recent Transactions</h2>
                <p>No transactions yet.</p>
            </div>
        `;
    }

    else if (page === "sales") {
        pageTitle.innerText = "Sales";

        content.innerHTML = `
            <div class="panel">
                <h2>Sales</h2>
                <p>Manage your customers, invoices and sales payments.</p>

                <button class="new-btn">+ Create Invoice</button>
            </div>

            <div class="panel">
                <h2>Invoices</h2>
                <p>No invoices yet.</p>
            </div>
        `;
    }

    else if (page === "purchases") {
        pageTitle.innerText = "Purchases";

        content.innerHTML = `
            <div class="panel">
                <h2>Purchases</h2>
                <p>Manage vendors, bills and purchase payments.</p>

                <button class="new-btn">+ New Bill</button>
            </div>

            <div class="panel">
                <h2>Purchase Records</h2>
                <p>No purchase records yet.</p>
            </div>
        `;
    }

    else if (page === "expenses") {
        pageTitle.innerText = "Expenses";

        content.innerHTML = `
            <div class="panel">
                <h2>Expenses</h2>
                <p>Record and manage business expenses.</p>

                <button class="new-btn">+ Record Expense</button>
            </div>
        `;
    }

    else if (page === "customers") {
        pageTitle.innerText = "Customers";

        content.innerHTML = `
            <div class="panel">
                <h2>Customers</h2>

                <button class="new-btn">+ Add Customer</button>
            </div>

            <div class="panel">
                <h2>Customer List</h2>
                <p>No customers added yet.</p>
            </div>
        `;
    }

    else if (page === "vendors") {
        pageTitle.innerText = "Vendors";

        content.innerHTML = `
            <div class="panel">
                <h2>Vendors</h2>

                <button class="new-btn">+ Add Vendor</button>
            </div>

            <div class="panel">
                <h2>Vendor List</h2>
                <p>No vendors added yet.</p>
            </div>
        `;
    }

    else if (page === "inventory") {
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

                <button class="new-btn">+ Add Product</button>

                <p>No products added yet.</p>
            </div>
        `;
    }

    else if (page === "accounting") {
        pageTitle.innerText = "Accounting";

        content.innerHTML = `
            <div class="panel">
                <h2>Accounting</h2>

                <button class="new-btn">+ Journal Entry</button>
            </div>

            <div class="panel">
                <h2>Accounting Tools</h2>

                <p>Chart of Accounts</p>
                <p>General Ledger</p>
                <p>Trial Balance</p>
            </div>
        `;
    }

    else if (page === "reports") {
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
}
