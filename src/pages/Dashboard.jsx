import React from 'react';
import { 
  IndianRupee, 
  ShoppingBag, 
  Users, 
  Package, 
  Clock, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import './Dashboard.css';

const kpiData = [
  { id: 1, title: 'Total Revenue', value: '₹12,84,560', change: 12.8, isUp: true, icon: IndianRupee, color: 'primary' },
  { id: 2, title: 'Total Orders', value: '3,456', change: 8.2, isUp: true, icon: ShoppingBag, color: 'success' },
  { id: 3, title: 'Total Customers', value: '1,234', change: 4.1, isUp: true, icon: Users, color: 'info' },
  { id: 4, title: 'Total Products', value: '456', change: 1.2, isUp: false, icon: Package, color: 'neutral' },
  { id: 5, title: 'Pending Orders', value: '45', change: 2.4, isUp: false, icon: Clock, color: 'warning' },
  { id: 6, title: 'Low Stock Products', value: '12', change: 5.6, isUp: false, icon: AlertTriangle, color: 'danger' },
];

const revenueData = [
  { name: 'Jan', revenue: 400000 },
  { name: 'Feb', revenue: 300000 },
  { name: 'Mar', revenue: 500000 },
  { name: 'Apr', revenue: 450000 },
  { name: 'May', revenue: 600000 },
  { name: 'Jun', revenue: 550000 },
  { name: 'Jul', revenue: 700000 },
];

const ordersData = [
  { name: 'Mon', orders: 120 },
  { name: 'Tue', orders: 150 },
  { name: 'Wed', orders: 180 },
  { name: 'Thu', orders: 140 },
  { name: 'Fri', orders: 200 },
  { name: 'Sat', orders: 250 },
  { name: 'Sun', orders: 220 },
];

const categoryData = [
  { name: 'Supplements', value: 400 },
  { name: 'Skincare', value: 300 },
  { name: 'Tea & Drinks', value: 300 },
  { name: 'Essential Oils', value: 200 },
];

const COLORS = ['#166534', '#84CC16', '#D97706', '#2563EB'];

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="text-h2">Dashboard Overview</h1>
          <p className="text-small">Welcome back, here's what's happening with your store today.</p>
        </div>
        <div className="date-picker-placeholder">
          Last 30 Days
        </div>
      </div>

      <div className="kpi-grid">
        {kpiData.map(kpi => (
          <div key={kpi.id} className="kpi-card card">
            <div className="kpi-header">
              <div className={`kpi-icon-wrapper bg-${kpi.color}-light text-${kpi.color}`}>
                <kpi.icon size={20} />
              </div>
            </div>
            <div className="kpi-body">
              <h3 className="kpi-title">{kpi.title}</h3>
              <div className="kpi-value">{kpi.value}</div>
            </div>
            <div className="kpi-footer">
              <span className={`kpi-change ${kpi.isUp ? 'text-success' : 'text-danger'}`}>
                {kpi.isUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {kpi.change}%
              </span>
              <span className="kpi-comparison">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-grid-main">
        <div className="chart-card card col-span-2">
          <div className="chart-header">
            <h3 className="text-h3">Revenue Overview</h3>
          </div>
          <div className="chart-body" style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#166534" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#166534" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} tickFormatter={(value) => `₹${value/1000}k`} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#166534" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card card">
          <div className="chart-header">
            <h3 className="text-h3">Sales by Category</h3>
          </div>
          <div className="chart-body" style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-legend">
              {categoryData.map((entry, index) => (
                <div key={entry.name} className="legend-item">
                  <span className="legend-dot" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                  <span className="legend-text">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="charts-grid-secondary mt-6">
        <div className="chart-card card">
          <div className="chart-header">
            <h3 className="text-h3">Orders Overview</h3>
          </div>
          <div className="chart-body" style={{ height: '250px' }}>
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ordersData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                <RechartsTooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="orders" fill="#84CC16" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="chart-card card">
          <div className="chart-header flex justify-between items-center">
            <h3 className="text-h3">Recent Orders</h3>
            <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>View All</button>
          </div>
          <div className="recent-orders-list">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="recent-order-item">
                <div className="order-info">
                  <span className="order-id">#ORD-982{i}</span>
                  <span className="order-customer">Arjun Kumar</span>
                </div>
                <div className="order-status">
                  <span className={`badge badge-${i % 2 === 0 ? 'success' : 'warning'}`}>
                    {i % 2 === 0 ? 'Delivered' : 'Processing'}
                  </span>
                  <span className="order-amount">₹1,250</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
