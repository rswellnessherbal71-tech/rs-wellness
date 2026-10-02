import React from 'react';
import { Menu, Search, Bell, User, ChevronDown } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import './Layout.css';

export default function Header({ toggleSidebar }) {
  const location = useLocation();
  
  // Simple breadcrumb logic based on path
  const paths = location.pathname.split('/').filter(p => p);
  
  return (
    <header className="header">
      <div className="header-left">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">Dashboard</Link>
          {paths.map((path, index) => (
            <React.Fragment key={path}>
              <span className="breadcrumb-separator">/</span>
              <span className={`breadcrumb-item ${index === paths.length - 1 ? 'active' : ''}`}>
                {path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' ')}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
      
      <div className="header-right">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search..." className="search-input" />
          <div className="search-shortcut">⌘K</div>
        </div>
        
        <button className="notification-btn relative">
          <Bell size={20} />
          <span className="notification-badge"></span>
        </button>
        
        <div className="header-profile">
          <div className="avatar-small">
            <User size={16} />
          </div>
          <span className="admin-name" style={{ color: '#17201B', display: 'inline-block', marginLeft: '8px' }}>admin@rswellness.com</span>
          <ChevronDown size={16} style={{ color: '#64748B', marginLeft: '4px' }} />
        </div>
      </div>
    </header>
  );
}
