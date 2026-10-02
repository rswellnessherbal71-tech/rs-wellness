import React, { useState } from 'react';
import { 
  Search, Filter, Plus, MoreVertical, Edit, Trash, Copy,
  ChevronLeft, ChevronRight, X, Upload
} from 'lucide-react';
import { mockAttributes } from '../data/mockData';
import { toast } from 'react-toastify';
import './Products.css';

const MOCK_PRODUCTS = [
  { id: 1, name: 'Organic Ashwagandha Root Powder', sku: 'HB-ASH-001', category: 'Supplements', brand: 'NatureVit', price: 599, stock: 120, status: 'Active', date: '2023-10-12' },
  { id: 2, name: 'Himalayan Shilajit Resin', sku: 'HB-SHI-002', category: 'Supplements', brand: 'PuroHerbs', price: 1499, stock: 45, status: 'Active', date: '2023-10-15' },
  { id: 3, name: 'Premium Matcha Green Tea', sku: 'HB-MAT-003', category: 'Tea & Drinks', brand: 'ZenLeaf', price: 899, stock: 8, status: 'Low Stock', date: '2023-10-20' },
  { id: 4, name: 'Organic Turmeric Curcumin Drops', sku: 'HB-TUR-004', category: 'Supplements', brand: 'NatureVit', price: 450, stock: 0, status: 'Out of Stock', date: '2023-11-01' },
  { id: 5, name: 'Pure Rose Water Toner', sku: 'HB-ROS-005', category: 'Skincare', brand: 'GlowNaturals', price: 350, stock: 200, status: 'Active', date: '2023-11-05' },
  { id: 6, name: 'Test Product - Not Published', sku: 'HB-TST-006', category: 'Uncategorized', brand: 'N/A', price: 100, stock: 10, status: 'Draft', date: '2023-11-10' },
];

export default function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState('');

  const activeAttribute = mockAttributes.find(attr => attr.name === selectedAttribute);

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProducts(MOCK_PRODUCTS.map(p => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const toggleSelectProduct = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(pId => pId !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Active': return <span className="badge badge-success">Active</span>;
      case 'Draft': return <span className="badge badge-neutral">Draft</span>;
      case 'Out of Stock': return <span className="badge badge-danger">Out of Stock</span>;
      case 'Low Stock': return <span className="badge badge-warning">Low Stock</span>;
      default: return <span className="badge badge-neutral">{status}</span>;
    }
  };

  return (
    <div className="products-page">
      <div className="page-header flex justify-between items-center mb-6">
        <div>
          <h1 className="text-h2">Products</h1>
          <p className="text-small">Manage your product inventory and details.</p>
        </div>
        <div className="flex gap-4">
          <button className="btn btn-secondary">
            Export
          </button>
          <button className="btn btn-primary" onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}>
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>

      <div className="card table-card">
        <div className="table-toolbar">
          <div className="search-container">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search products..." className="form-input pl-10" style={{ width: '300px', height: '38px', borderRadius: '8px' }} />
          </div>
          <div className="table-actions">
            <button className="btn btn-secondary">
              <Filter size={18} />
              Filter
            </button>
            <button className="btn btn-secondary">
              Columns
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>

                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Date</th>
                <th width="60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_PRODUCTS.map(product => (
                <tr key={product.id} className={selectedProducts.includes(product.id) ? 'selected-row' : ''}>

                  <td>
                    <div className="product-cell">
                      <div className="product-image-placeholder">
                         {/* Placeholder for image */}
                      </div>
                      <span className="product-name font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td><span className="text-small font-medium">{product.sku}</span></td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td><span className="font-medium">₹{product.price}</span></td>
                  <td>{product.stock}</td>
                  <td>{getStatusBadge(product.status)}</td>
                  <td><span className="text-small">{product.date}</span></td>
                  <td>
                    <div className="flex gap-2">
                      <button className="icon-btn" style={{ color: 'var(--color-primary)' }} onClick={() => { setEditingProduct(product); setIsModalOpen(true); }}><Edit size={18} /></button>
                      <button className="icon-btn" style={{ color: '#ef4444' }}><Trash size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="table-pagination">
          <span className="text-small">Showing 1 to 6 of 6 entries</span>
          <div className="pagination-controls">
            <button className="icon-btn" disabled><ChevronLeft size={18} /></button>
            <button className="page-btn active">1</button>
            <button className="icon-btn" disabled><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>

      {/* Product Drawer Modal */}
      {isModalOpen && (
        <div className="drawer-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="drawer-content" onClick={e => e.stopPropagation()}>
            <div className="drawer-header">
              <h2 className="text-h2">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button className="icon-btn" onClick={() => setIsModalOpen(false)}><X size={24} /></button>
            </div>
            
            <div className="drawer-body">
              <div className="form-section">
                <h3 className="section-title">Product Information</h3>
                <div className="form-group">
                  <label className="form-label">Product Name</label>
                  <input type="text" className="form-input" placeholder="e.g. Organic Ashwagandha Root Powder" defaultValue={editingProduct ? editingProduct.name : ''} key={editingProduct ? `edit-name-${editingProduct.id}` : 'new-name'} />
                </div>
                
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">SKU</label>
                    <input type="text" className="form-input" placeholder="e.g. HB-ASH-001" defaultValue={editingProduct ? editingProduct.sku : ''} key={editingProduct ? `edit-sku-${editingProduct.id}` : 'new-sku'} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Brand</label>
                    <select className="form-input">
                      <option value="">Select Brand</option>
                      <option value="1">NatureVit</option>
                      <option value="2">PuroHerbs</option>
                    </select>
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select className="form-input">
                      <option value="">Select Category</option>
                      <option value="1">Supplements</option>
                      <option value="2">Skincare</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Sub Category</label>
                    <select className="form-input">
                      <option value="">Select Sub Category</option>
                    </select>
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Regular Price (₹)</label>
                    <input type="number" className="form-input" placeholder="0.00" defaultValue={editingProduct ? editingProduct.price : ''} key={editingProduct ? `edit-price-${editingProduct.id}` : 'new-price'} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Discount Price (₹)</label>
                    <input type="number" className="form-input" placeholder="0.00" />
                  </div>
                </div>
              </div>

              <div className="form-section mt-6">
                <h3 className="section-title">Attributes & Variations</h3>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Global Attribute</label>
                    <select 
                      className="form-input" 
                      value={selectedAttribute} 
                      onChange={(e) => setSelectedAttribute(e.target.value)}
                    >
                      <option value="">Select an Attribute...</option>
                      {mockAttributes.map(attr => (
                        <option key={attr.name} value={attr.name}>{attr.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {activeAttribute && (
                  <div className="form-group mt-2">
                    <label className="form-label text-small">Select Values to generate variants:</label>
                    <div className="flex gap-4 mt-2 flex-wrap">
                      {activeAttribute.values.split(', ').map(val => (
                        <div key={val} className="flex items-center gap-2">
                          <input type="checkbox" id={`attr-${val}`} className="custom-checkbox" defaultChecked />
                          <label htmlFor={`attr-${val}`} className="text-small cursor-pointer">{val}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="form-section mt-6">
                <h3 className="section-title">Product Images</h3>
                <div className="upload-zone">
                  <Upload size={32} className="text-secondary mb-2" />
                  <p className="text-body font-medium">Click to upload or drag and drop</p>
                  <p className="text-small">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
              </div>

              <div className="form-section mt-6">
                <h3 className="section-title">Description</h3>
                <div className="form-group">
                  <textarea className="form-input" rows={5} placeholder="Write a detailed product description..." style={{ height: 'auto', padding: '0.75rem' }}></textarea>
                </div>
              </div>
            </div>

            <div className="drawer-footer">
              <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => {
                toast.success(editingProduct ? 'Product successfully updated!' : 'Product successfully added!');
                setIsModalOpen(false);
              }}>Save Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
