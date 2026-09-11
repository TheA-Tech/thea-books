const app = document.getElementById('app');
const title = document.getElementById('pageTitle');

const pages = {
  dashboard: {
    title: 'Dashboard',
    html: `
      <div class="cards">
        <div class="card"><div class="label">Total Sales</div><div class="value">Rs. 0</div></div>
        <div class="card"><div class="label">Total Expenses</div><div class="value">Rs. 0</div></div>
        <div class="card"><div class="label">Receivables</div><div class="value">Rs. 0</div></div>
        <div class="card"><div class="label">Payables</div><div class="value">Rs. 0</div></div>
      </div>
      <div class="grid">
        <div class="panel"><h2>Cash Flow</h2><div class="empty">No transactions yet. Your financial activity will appear here.</div></div>
        <div class="panel"><h2>Quick Actions</h2><div class="module-actions">
          <button class="secondary">Create Invoice</button><button class="secondary">Record Expense</button>
          <button class="secondary">Add Customer</button><button class="secondary">Add Vendor</button>
        </div></div>
      </div>
      <div class="panel"><h2>Recent Transactions</h2><div class="empty">No transactions yet.</div></div>
    `
  },
  sales: module('Sales', ['Customers','Invoices','Payments','Credit Notes']),
  purchases: module('Purchases', ['Vendors','Purchase Orders','Bills','Vendor Payments']),
  expenses: module('Expenses', ['New Expense','Expense Categories','Recurring Expenses']),
  customers: module('Customers', ['Add Customer','Customer List','Customer Statements']),
  vendors: module('Vendors', ['Add Vendor','Vendor List','Vendor Statements']),
  inventory: module('Inventory', ['Products','Stock In/Out','Low Stock','Stock Valuation']),
  accounting: module('Accounting', ['Chart of Accounts','Journal Entries','General Ledger','Trial Balance']),
  reports: module('Reports', ['Profit & Loss','Balance Sheet','Cash Flow','AR Aging','AP Aging','Tax Report'])
};

function module(name, actions){
  return {title:name, html:`
    <div class="panel">
      <h2>${name}</h2>
      <div class="module-actions">${actions.map(x=>`<button class="secondary">${x}</button>`).join('')}</div>
    </div>
    <div class="panel"><h2>${name} Data</h2><div class="empty">This module is ready for the next development step.</div></div>
  `};
}

function show(page){
  const p=pages[page] || pages.dashboard;
  title.textContent=p.title;
  app.innerHTML=p.html;
  document.querySelectorAll('.nav').forEach(b=>b.classList.toggle('active',b.dataset.page===page));
}

document.querySelectorAll('.nav').forEach(b=>b.addEventListener('click',()=>show(b.dataset.page)));
document.getElementById('newTransaction').addEventListener('click',()=>alert('Transaction form will be added in the Accounting Engine step.'));
show('dashboard');
