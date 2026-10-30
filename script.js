// Expanded Mock Database State
let db = {
    users: [
        { username: 'admin', pass: 'admin123', role: 'Admin', name: 'System Administrator' },
        { username: 'staff', pass: 'staff123', role: 'Staff', name: 'Sales Associate' }
    ],
    products: [
        { code: 'PRD-101', name: 'Enterprise Cloud Server', category: 'Infrastructure', price: 1200.00, stock: 15, minStock: 5 },
        { code: 'PRD-102', name: 'Secure VPN Router', category: 'Hardware', price: 250.00, stock: 40, minStock: 10 },
        { code: 'PRD-103', name: 'Database Backup Suite', category: 'Software', price: 450.00, stock: 8, minStock: 5 },
        { code: 'PRD-104', name: 'Wireless Access Point', category: 'Hardware', price: 120.00, stock: 25, minStock: 8 },
        { code: 'PRD-105', name: 'IT Consulting (Hourly)', category: 'Services', price: 150.00, stock: 100, minStock: 20 },
        { code: 'PRD-106', name: 'Cybersecurity Firewall', category: 'Hardware', price: 850.00, stock: 12, minStock: 4 },
        { code: 'PRD-107', name: 'Project Management SaaS', category: 'Software', price: 300.00, stock: 50, minStock: 10 },
        { code: 'PRD-108', name: 'Dedicated Storage Node', category: 'Infrastructure', price: 1500.00, stock: 6, minStock: 2 }
    ],
    customers: [
        { name: 'Acme Corp', email: 'contact@acme.com', phone: '+1-555-0192', address: '123 Innovation Drive' },
        { name: 'Globex Corporation', email: 'info@globex.org', phone: '+1-555-8391', address: '456 Industrial Pkwy' }
    ],
    orders: [
        { orderNo: 'ORD-1001', customerName: 'Acme Corp', date: '2026-10-15', status: 'Delivered', subtotal: 1200.00, tax: 60.00, total: 1260.00, items: [{ name: 'Enterprise Cloud Server', qty: 1, price: 1200.00 }] }
    ],
    payments: [
        { orderNo: 'ORD-1001', amount: 1260.00, method: 'Credit Card', status: 'Paid' }
    ],
    auditLogs: [
        { timestamp: '2026-10-16 08:00:00', user: 'admin', action: 'System initialized successfully with expanded product catalog' }
    ]
};

let currentUser = null;
let revenueChartInst = null;
let stockChartInst = null;

// Authentication Handler
function handleLogin(e) {
    e.preventDefault();
    const u = document.getElementById('login-user').value;
    const p = document.getElementById('login-pass').value;

    const found = db.users.find(x => x.username === u && x.pass === p);
    if (found) {
        currentUser = found;
        document.getElementById('auth-container').classList.add('hidden');
        document.getElementById('app-container').classList.remove('hidden');
        document.getElementById('user-display-name').innerText = found.name;
        document.getElementById('user-display-role').innerText = found.role;
        logAction(found.username, 'User logged in');
        refreshAll();
    } else {
        alert('Invalid username or password.');
    }
}

function handleLogout() {
    currentUser = null;
    document.getElementById('auth-container').classList.remove('hidden');
    document.getElementById('app-container').classList.add('hidden');
}

function togglePassword(id) {
    const input = document.getElementById(id);
    input.type = input.type === 'password' ? 'text' : 'password';
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('-translate-x-full');
}

function logAction(user, action) {
    const time = new Date().toISOString().replace('T', ' ').substring(0, 19);
    db.auditLogs.unshift({ timestamp: time, user, action });
}

// Navigation Tab Switcher
function switchTab(tabId) {
    document.querySelectorAll('[id^="view-"]').forEach(el => el.classList.add('hidden'));
    document.getElementById(`view-${tabId}`).classList.remove('hidden');

    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('bg-blue-50', 'text-primary'));
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('bg-blue-50', 'text-primary');
    }

    const titles = {
        dashboard: 'Dashboard', orders: 'Sales Orders', 'create-order': 'Create Order',
        invoices: 'Invoice Management', customers: 'Customer Management', products: 'Product & Inventory',
        reports: 'Sales Reports', payments: 'Payment Tracking', audit: 'Security Audit Logs'
    };
    document.getElementById('current-page-title').innerText = titles[tabId] || 'Dashboard';
    if(tabId === 'dashboard') renderCharts();
}

// Data Rendering & Management
function refreshAll() {
    renderDashboardStats();
    renderOrders();
    renderCreateOrderDropdowns();
    renderCustomers();
    renderProducts();
    renderPayments();
    renderAudit();
}

function renderDashboardStats() {
    const totalRev = db.orders.reduce((acc, o) => acc + o.total, 0);
    const totalOrd = db.orders.length;
    const pendingOrd = db.orders.filter(o => o.status === 'Pending').length;
    const lowStock = db.products.filter(p => p.stock <= p.minStock).length;

    document.getElementById('stat-revenue').innerText = `$${totalRev.toFixed(2)}`;
    document.getElementById('stat-orders').innerText = totalOrd;
    document.getElementById('stat-pending').innerText = pendingOrd;
    document.getElementById('stat-lowstock').innerText = lowStock;
}

function renderOrders() {
    const tbody = document.getElementById('orders-table-body');
    tbody.innerHTML = db.orders.map(o => `
        <tr class="hover:bg-slate-50">
            <td class="p-4 font-semibold text-primary">${o.orderNo}</td>
            <td class="p-4">${o.customerName}</td>
            <td class="p-4 text-slate-500">${o.date}</td>
            <td class="p-4"><span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">${o.status}</span></td>
            <td class="p-4 font-bold">$${o.total.toFixed(2)}</td>
            <td class="p-4 text-right">
                <button onclick="viewInvoice('${o.orderNo}')" class="text-primary hover:underline font-medium text-xs">View Invoice</button>
            </td>
        </tr>
    `).join('');
}

function renderCreateOrderDropdowns() {
    document.getElementById('order-customer').innerHTML = db.customers.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
    document.getElementById('order-product').innerHTML = db.products.map(p => `<option value="${p.code}">${p.name} ($${p.price} - Stock: ${p.stock})</option>`).join('');
}

function handleCreateOrder(e) {
    e.preventDefault();
    const cust = document.getElementById('order-customer').value;
    const prodCode = document.getElementById('order-product').value;
    const qty = parseInt(document.getElementById('order-qty').value);
    const taxRate = parseFloat(document.getElementById('order-tax').value) / 100;

    const product = db.products.find(p => p.code === prodCode);
    if (product.stock < qty) {
        alert(`Insufficient stock! Available: ${product.stock}`);
        return;
    }

    product.stock -= qty;
    const subtotal = product.price * qty;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    const orderNo = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const date = new Date().toISOString().substring(0, 10);

    db.orders.push({ orderNo, customerName: cust, date, status: 'Pending', subtotal, tax, total, items: [{ name: product.name, qty, price: product.price }] });
    db.payments.push({ orderNo, amount: total, method: 'Credit Card', status: 'Pending' });

    logAction(currentUser.username, `Created order ${orderNo} for ${cust}`);
    alert(`Order ${orderNo} created successfully! Inventory updated.`);
    refreshAll();
    switchTab('orders');
}

function viewInvoice(orderNo) {
    const o = db.orders.find(x => x.orderNo === orderNo);
    if(!o) return;
    document.getElementById('inv-no').innerText = `#${o.orderNo}`;
    document.getElementById('inv-customer').innerText = o.customerName;
    document.getElementById('inv-date').innerText = `Date: ${o.date}`;
    document.getElementById('inv-subtotal').innerText = `$${o.subtotal.toFixed(2)}`;
    document.getElementById('inv-tax').innerText = `$${o.tax.toFixed(2)}`;
    document.getElementById('inv-total').innerText = `$${o.total.toFixed(2)}`;

    document.getElementById('inv-items-body').innerHTML = o.items.map(i => `
        <tr>
            <td class="p-3">${i.name}</td>
            <td class="p-3 text-center">${i.qty}</td>
            <td class="p-3 text-right">$${i.price.toFixed(2)}</td>
            <td class="p-3 text-right font-semibold">$${(i.qty * i.price).toFixed(2)}</td>
        </tr>
    `).join('');

    switchTab('invoices');
}

function renderCustomers() {
    document.getElementById('customers-table-body').innerHTML = db.customers.map(c => `
        <tr>
            <td class="p-4 font-semibold">${c.name}</td>
            <td class="p-4 text-slate-500">${c.email}</td>
            <td class="p-4">${c.phone}</td>
            <td class="p-4 text-slate-500">${c.address}</td>
        </tr>
    `).join('');
}

function renderProducts() {
    document.getElementById('products-table-body').innerHTML = db.products.map(p => `
        <tr>
            <td class="p-4 font-mono text-xs font-bold text-primary">${p.code}</td>
            <td class="p-4 font-semibold">${p.name}</td>
            <td class="p-4 text-slate-500">${p.category}</td>
            <td class="p-4">$${p.price.toFixed(2)}</td>
            <td class="p-4 font-bold">${p.stock}</td>
            <td class="p-4">${p.stock <= p.minStock ? '<span class="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-semibold">Low Stock</span>' : '<span class="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-semibold">In Stock</span>'}</td>
        </tr>
    `).join('');
}

function renderPayments() {
    document.getElementById('payments-table-body').innerHTML = db.payments.map(p => `
        <tr>
            <td class="p-4 font-semibold text-primary">${p.orderNo}</td>
            <td class="p-4 font-bold">$${p.amount.toFixed(2)}</td>
            <td class="p-4">${p.method}</td>
            <td class="p-4"><span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">${p.status}</span></td>
        </tr>
    `).join('');
}

function renderAudit() {
    document.getElementById('audit-table-body').innerHTML = db.auditLogs.map(a => `
        <tr>
            <td class="p-4 font-mono text-xs text-slate-500">${a.timestamp}</td>
            <td class="p-4 font-semibold">${a.user}</td>
            <td class="p-4 text-slate-700">${a.action}</td>
        </tr>
    `).join('');
}

function exportCSV() {
    let csv = 'OrderNo,Customer,Date,Status,Total\n';
    db.orders.forEach(o => {
        csv += `${o.orderNo},"${o.customerName}",${o.date},${o.status},${o.total}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'sales_report.csv');
    a.click();
}

function renderCharts() {
    if(revenueChartInst) revenueChartInst.destroy();
    if(stockChartInst) stockChartInst.destroy();

    const ctxRev = document.getElementById('revenueChart').getContext('2d');
    revenueChartInst = new Chart(ctxRev, {
        type: 'line',
        data: {
            labels: db.orders.map(o => o.date),
            datasets: [{ label: 'Revenue ($)', data: db.orders.map(o => o.total), borderColor: '#2563EB', backgroundColor: 'rgba(37, 99, 235, 0.1)', fill: true, tension: 0.3 }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
    });

    const ctxStock = document.getElementById('stockChart').getContext('2d');
    stockChartInst = new Chart(ctxStock, {
        type: 'bar',
        data: {
            labels: db.products.map(p => p.name),
            datasets: [{ label: 'Stock Quantity', data: db.products.map(p => p.stock), backgroundColor: '#3B82F6' }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
    });
}
