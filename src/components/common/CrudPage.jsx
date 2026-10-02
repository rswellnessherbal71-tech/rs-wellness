import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { toast } from 'react-toastify';
import './CrudPage.css';

export default function CrudPage({ 
  title, 
  description, 
  columns = [], 
  formFields,
  data = [], 
  addActionLabel = 'Add New' 
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const fields = formFields || columns;

  return (
    <div className="crud-page">
      <div className="page-header flex justify-between items-center mb-6">
        <div>
          <h1 className="text-h2">{title}</h1>
          <p className="text-small">{description}</p>
        </div>
        <div className="flex gap-4">
          <button className="btn btn-secondary">
            Export
          </button>
          {addActionLabel && (
            <button className="btn btn-primary" onClick={() => { setEditingData(null); setIsModalOpen(true); }}>
              <Plus size={18} />
              {addActionLabel}
            </button>
          )}
        </div>
      </div>

      <div className="card table-card">
        <div className="table-toolbar">
          <div className="search-container">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder={`Search ${title.toLowerCase()}...`} className="form-input pl-10" style={{ width: '300px', height: '38px', borderRadius: '8px' }} />
          </div>
          <div className="table-actions">
            <button className="btn btn-secondary">
              <Filter size={18} />
              Filter
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>

                {columns.map((col, index) => (
                  <th key={index}>{col}</th>
                ))}
                <th width="60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((row, rowIndex) => (
                  <tr key={rowIndex}>

                    {columns.map((col, colIndex) => (
                      <td key={colIndex}>
                        <span className={colIndex === 0 ? "font-medium" : ""}>
                          {row[col.toLowerCase().replace(/ /g, '_')] || '-'}
                        </span>
                      </td>
                    ))}
                    <td>
                      <div className="flex gap-2">
                        <button className="icon-btn" style={{ color: 'var(--color-primary)' }} onClick={() => { setEditingData(row); setIsModalOpen(true); }}><Edit size={18} /></button>
                        <button className="icon-btn" style={{ color: '#ef4444' }}><Trash size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 2} className="empty-state-cell">
                    <div className="empty-state">
                      <div className="empty-icon-wrapper">
                        <Search size={24} />
                      </div>
                      <h3 className="empty-title">No {title.toLowerCase()} found</h3>
                      <p className="empty-desc">There are no records matching your current filters.</p>
                      {addActionLabel && (
                        <button className="btn btn-secondary mt-4" onClick={() => { setEditingData(null); setIsModalOpen(true); }}>
                          <Plus size={18} />
                          {addActionLabel}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="table-pagination">
          <span className="text-small">Showing {data.length > 0 ? 1 : 0} to {data.length} of {data.length} entries</span>
          <div className="pagination-controls">
            <button className="icon-btn" disabled><ChevronLeft size={18} /></button>
            <button className="page-btn active">1</button>
            <button className="icon-btn" disabled><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>

      {/* Generic Modal/Drawer for "Add New" */}
      {isModalOpen && (
        <div className="drawer-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="drawer-content" onClick={e => e.stopPropagation()}>
            <div className="drawer-header">
              <h2 className="text-h2">{editingData ? `Edit ${title}` : addActionLabel}</h2>
              <button className="icon-btn" onClick={() => setIsModalOpen(false)}><X size={24} /></button>
            </div>
            
            <div className="drawer-body">
              <div className="form-section">
                <h3 className="section-title">Information Details</h3>
                
                <div className="grid-2">
                  {fields.map((col, idx) => (
                    <div className="form-group" key={idx}>
                      <label className="form-label">{col}</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder={`Enter ${col.toLowerCase()}`} 
                        defaultValue={editingData ? editingData[col.toLowerCase().replace(/ /g, '_')] || '' : ''} 
                        key={editingData ? `edit-${idx}` : `new-${idx}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="drawer-footer">
              <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => {
                toast.success(editingData ? 'Successfully updated!' : 'Successfully added!');
                setIsModalOpen(false);
              }}>Save Details</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
