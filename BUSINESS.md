# 📊 Business Context — E-commerce Admin Dashboard

## 🎯 Target User: Head of Sales

**Name:** Sarah Mitchell  
**Role:** Head of Sales at mid-sized e-commerce company  
**Experience:** 8 years in sales leadership  
**Tech Savviness:** Medium — comfortable with dashboards, not a data analyst

### Daily Routine
Every Monday morning at 9 AM, Sarah opens the dashboard with her coffee to review the previous week's performance before the weekly sales meeting at 10 AM.

---

## ❓ The 5 Monday Morning Questions

### 1. "How much revenue did we make last week? Are we growing or declining?"
**Why it matters:** This is the #1 metric Sarah reports to the CEO. She needs to know immediately if they're on track for quarterly goals.

**Answer:** KPI Card — Total Revenue with % change vs previous period

---

### 2. "Which regions are performing best? Should I reallocate sales team resources?"
**Why it matters:** Sarah manages regional sales teams. If APAC is crushing it while EU is lagging, she needs to understand why and potentially shift resources.

**Answer:** Bar Chart — Revenue by Region (NA, EU, APAC, LATAM)

---

### 3. "What are our top-selling products? What should we push harder?"
**Why it matters:** Sarah's team needs to know what to focus on in sales calls. Top products get more marketing budget and sales attention.

**Answer:** Horizontal Bar Chart — Top 5 Products by Revenue

---

### 4. "How many orders are stuck in pending? How many refunds do we have?"
**Why it matters:** Pending orders might indicate payment issues. High refunds signal product quality problems or customer dissatisfaction.

**Answer:** Donut Chart — Orders by Status (pending, paid, refunded, cancelled)

---

### 5. "Which product categories are trending up or down?"
**Why it matters:** Sarah needs to spot trends early. If Electronics sales are dropping, she needs to investigate before it becomes a bigger problem.

**Answer:** Line Chart — Revenue over time + Table with category breakdown

---

## 🎨 Dashboard Widget Mapping

| Widget | Question | Metric | Action |
|--------|----------|--------|--------|
| **KPI Card 1** | Q1 | Total Revenue + % change | Quick health check |
| **KPI Card 2** | Q1 | Orders Count + % change | Volume indicator |
| **KPI Card 3** | Q1 | AOV (Average Order Value) + % change | Quality of sales |
| **KPI Card 4** | Q4 | Refund Rate + % change | Customer satisfaction |
| **Bar Chart** | Q2 | Revenue by Region | Resource allocation |
| **Horizontal Bar** | Q3 | Top 5 Products | Sales focus |
| **Donut Chart** | Q4 | Orders by Status | Operations health |
| **Line Chart** | Q5 | Revenue over time | Trend analysis |
| **Table** | Q5 | All orders with filters | Deep dive |

---

## 🚫 What We Cut (and Why)

### Customer Acquisition Cost (CAC)
**Why cut:** Sarah doesn't control marketing budget. This is a CMO metric, not sales.

### Customer Lifetime Value (CLV)
**Why cut:** Requires historical data beyond 180 days. Out of scope for this sprint.

### Conversion Rate by Channel
**Why cut:** Sarah doesn't manage marketing channels. This is a marketing metric.

### Inventory Levels
**Why cut:** Sarah doesn't manage inventory. This is an operations metric.

---

## 💡 What We'd Add for Other Users

### For CFO:
- Profit margins by category
- Cost of goods sold (COGS)
- Cash flow projections
- Payment processing fees

### For Marketing Lead:
- Traffic sources
- Conversion rates by channel
- CAC by campaign
- ROAS (Return on Ad Spend)

### For Operations Manager:
- Fulfillment times
- Inventory turnover
- Shipping costs by region
- Return reasons breakdown

---

## 📈 Success Metrics

**Sarah will consider this dashboard successful if:**
1. She can answer all 5 questions in under 2 minutes
2. She can filter by date range to compare different periods
3. She can export data for the weekly sales meeting
4. The dashboard loads in under 2 seconds
5. She can use it on her iPad during meetings

---

## 🎯 Key Insights Dashboard Should Reveal

1. **Growth Trajectory:** Is revenue trending up or down?
2. **Regional Performance:** Which markets need attention?
3. **Product Mix:** Are we selling the right products?
4. **Operational Health:** Are we processing orders efficiently?
5. **Customer Satisfaction:** Are refunds increasing?

---

## 📊 Data Context

**Time Period:** Last 180 days  
**Order Volume:** ~500 orders  
**Categories:** Electronics, Apparel, Home, Books  
**Regions:** North America, Europe, APAC, Latin America  
**Statuses:** Pending, Paid, Refunded, Cancelled  

**Average Order Value:** $150-200  
**Typical Refund Rate:** 5-8%  
**Peak Sales Days:** Weekends  

---

## 🎬 Demo Script (2 minutes)

**0:00-0:15** — "Hi, I'm Sarah, Head of Sales. Every Monday I ask 5 questions..."

**0:15-1:15** — Walk through each widget:
- "Question 1: Revenue? → This KPI card shows $127K, up 12%"
- "Question 2: Best regions? → This bar chart shows APAC leading"
- "Question 3: Top products? → This chart shows Product X is #1"
- "Question 4: Order status? → This donut shows 85% paid, 3% refunded"
- "Question 5: Category trends? → This line chart shows Electronics growing"

**1:15-1:35** — Demonstrate filters:
- "I can filter by last 7 days to see this week's performance"
- "Or filter by region to focus on EU"
- "Everything updates instantly"

**1:35-2:00** — Wrap up:
- "I cut CAC and CLV because they're not sales metrics"
- "For a CFO, I'd add profit margins and COGS"
- "This dashboard answers my 5 questions in under 2 minutes"

---

**Built with:** React 18, TypeScript, Vite, Supabase, Recharts  
**Design:** Dark theme, glassmorphism, responsive  
**Performance:** <2s load time, handles 500 rows without lag
