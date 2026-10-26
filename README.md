# 📦 SalesPro – Modern Sales Management & Inventory System Frontend

SalesPro is a fully responsive, feature-rich modern web frontend for a Sales Management, Order Processing, and Inventory Tracking platform. Built with **Tailwind CSS**, **Chart.js**, **Font Awesome**, and vanilla **JavaScript (ES6+)**, it provides a complete simulated enterprise sales and logistics management experience directly in the browser.

---

## 🌐 Live Demo & Repository

*   **Live Website:** [https://your-deployed-url.com](https://your-deployed-url.com) *(Replace with your Netlify, Vercel, or GitHub Pages link)*
*   **GitHub Repository:** `https://github.com/your-username/salespro-management-system.git`

---

## ✨ Key Features & Functionality

*   **1. Authentication & Role-Based Access Control:**
    *   Simulated user login supporting **Admin** (`admin` / `admin123`) and **Staff** (`staff` / `staff123`) roles.
    *   Password visibility toggling and login prompt credentials helper.
    *   Role-aware UI header updates and session tracking.

*   **2. Interactive Business Dashboard:**
    *   Real-time KPI metrics cards tracking Total Revenue, Total Orders, Pending Orders, and Low Stock Alerts.
    *   **Chart.js** dynamic revenue trends line chart and product stock quantity bar chart.

*   **3. Sales Order & Inventory Management:**
    *   Create new sales orders by selecting registered customers, products, quantities, and customizable tax rates.
    *   Automatic real-time stock deduction upon order creation with insufficient stock prevention warnings.
    *   Order list view with order tracking and status updates (`Pending`, `Processing`, `Shipped`, `Delivered`, `Cancelled`).

*   **4. Invoice Generation & Printing:**
    *   Automated creation of itemized invoices for sales orders.
    *   Item breakdowns displaying unit prices, subtotal, tax calculation, and net total.
    *   One-click print button formatted for hard-copy invoice printing or saving as PDF.

*   **5. Product & Stock Catalog:**
    *   Expanded product catalog spanning Infrastructure, Hardware, Software, and Services.
    *   Visual stock status badges (`In Stock` vs. `Low Stock`).

*   **6. Customer Directory:**
    *   Centralized customer database storing company/customer names, emails, phone numbers, and physical addresses.

*   **7. Payment Tracking Ledger:**
    *   Dedicated payment log monitoring transaction amounts, payment methods, and statuses (`Pending`, `Paid`, `Partially Paid`, `Refunded`).

*   **8. Reports & Data Export:**
    *   Sales transaction summaries and revenue analytics.
    *   One-click raw sales transaction export to `.csv` for offline analysis in Excel or Google Sheets.

*   **9. Security Audit Logs:**
    *   Immutable activity tracking recording user logins, order creations, and system updates with real-time timestamps.

---

## 🛠️ Technology Stack

*   **HTML5 & CSS3** (Semantic structure and responsive layout styling)
*   **Tailwind CSS (v3 via CDN)** (Utility-first styling with custom theme color extensions)
*   **JavaScript (ES6+)** (Dynamic view rendering, state management, and event handling)
*   **Chart.js (v4.4.0)** (Interactive revenue and inventory data visualizations)
*   **Font Awesome (v6.4.0)** (Vector icons)
*   **In-Memory State API** (Data state persistence for products, orders, customers, payments, and audit logs)

---

## 🚀 Getting Started & Installation

Since SalesPro is built as a pure frontend single-file application, no complex build steps, Node.js installation, or backend database configurations are required to run it locally.

1. **Clone or Download** the repository to your local machine:
   ```bash
   git clone [https://github.com/your-username/salespro-management-system.git](https://github.com/your-username/salespro-management-system.git)
   cd salespro-management-system
