import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { getProducts, createProduct, deleteProduct } from '../api/products'
import { getCategories, createCategory, deleteCategory } from '../api/categories'
import { getAllOrders } from '../api/orders'
import { toast } from 'react-toastify'
import LoadingSpinner from '../components/LoadingSpinner'
import './AdminDashboard.css'

function AdminDashboard() {
  const { user } = useContext(AuthContext)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [orders, setOrders] = useState([])
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: 0,
    image: ''
  })
  const [newCategory, setNewCategory] = useState({ name: '', description: '' })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('products')

  useEffect(() => {
    if (user?.role === 'admin') {
      Promise.all([
        getProducts().then(res => setProducts(res.data)),
        getCategories().then(res => setCategories(res.data)),
        getAllOrders().then(res => setOrders(res.data))
      ])
        .catch(error => {
          console.error('Error loading admin data:', error)
          toast.error('Failed to load admin data')
        })
        .finally(() => setLoading(false))
    }
  }, [user])

  const handleCreateProduct = async e => {
    e.preventDefault()
    setLoading(true)

    // Validate the form data
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.description ||
      !newProduct.category ||
      !newProduct.stock
    ) {
      toast.error('Please fill in all required fields')
      setLoading(false)
      return
    }

    try {
      const productData = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock, 10)
      }

      console.log('Sending product data:', productData)
      const response = await createProduct(productData)
      setProducts([...products, response.data])
      setNewProduct({ name: '', price: '', description: '', category: '', stock: 0, image: '' })
      toast.success('Product created successfully')
    } catch (error) {
      console.error('Error creating product:', error)
      toast.error(error.response?.data?.message || 'Failed to create product')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateCategory = async e => {
    e.preventDefault()
    setLoading(true)

    // Validate category name
    if (!newCategory.name.trim()) {
      toast.error('Category name is required')
      setLoading(false)
      return
    }

    try {
      const response = await createCategory(newCategory)
      setCategories([...categories, response.data])
      setNewCategory({ name: '', description: '' })
      toast.success('Category created successfully')
    } catch (error) {
      console.error('Error creating category:', error)
      // Check for duplicate category error
      if (error.response?.data?.message?.includes('duplicate')) {
        toast.error('A category with this name already exists')
      } else {
        toast.error(error.response?.data?.message || 'Failed to create category')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async id => {
    setLoading(true)
    try {
      await deleteProduct(id)
      setProducts(products.filter(p => p._id !== id))
      toast.success('Product deleted')
    } catch (error) {
      console.error('Error deleting product:', error)
      toast.error('Failed to delete product')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCategory = async id => {
    setLoading(true)
    try {
      await deleteCategory(id)
      setCategories(categories.filter(c => c._id !== id))
      toast.success('Category deleted')
    } catch (error) {
      console.error('Error deleting category:', error)
      toast.error('Failed to delete category')
    } finally {
      setLoading(false)
    }
  }

  if (user?.role !== 'admin')
    return <div className='access-denied'>Access denied. Administrator privileges required.</div>
  if (loading) return <LoadingSpinner />

  return (
    <div className='admin-dashboard'>
      <h1>Admin Dashboard</h1>

      <div className='admin-tabs'>
        <button
          className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button
          className={`tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          Categories
        </button>
        <button
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
      </div>

      {activeTab === 'products' && (
        <div className='admin-section'>
          <h2>Create Product</h2>
          <form onSubmit={handleCreateProduct} className='admin-form'>
            <div className='form-group'>
              <input
                type='text'
                value={newProduct.name}
                onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                placeholder='Product Name'
                required
              />
            </div>

            <div className='form-group'>
              <input
                type='number'
                value={newProduct.price}
                onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                placeholder='Price'
                required
              />
            </div>

            <div className='form-group'>
              <select
                value={newProduct.category}
                onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                required
              >
                <option value=''>Select Category</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className='form-group'>
              <input
                type='number'
                value={newProduct.stock}
                onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })}
                placeholder='Stock'
                required
              />
            </div>

            <div className='form-group'>
              <input
                type='text'
                value={newProduct.image}
                onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                placeholder='Image URL'
              />
            </div>

            <div className='form-group'>
              <textarea
                value={newProduct.description}
                onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                placeholder='Description'
                required
              />
            </div>

            <button type='submit' className='submit-btn' disabled={loading}>
              Create Product
            </button>
          </form>

          <h2>Products List</h2>
          <div className='item-list'>
            {products.length === 0 ? (
              <p className='no-items'>No products found</p>
            ) : (
              products.map(product => (
                <div key={product._id} className='item-card'>
                  <div className='item-header'>
                    <h3>{product.name}</h3>
                    <span className='stock-badge'>{product.stock} in stock</span>
                  </div>
                  <p className='price-tag'>
                    <strong>Price:</strong> ${product.price}
                  </p>
                  {product.image && (
                    <div className='product-image-container'>
                      <img src={product.image} alt={product.name} className='product-image' />
                    </div>
                  )}
                  <p className='product-description'>{product.description}</p>
                  <div className='item-actions'>
                    <button
                      className='delete-btn'
                      onClick={() => handleDeleteProduct(product._id)}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'categories' && (
        <div className='admin-section'>
          <h2>Create Category</h2>
          <form onSubmit={handleCreateCategory} className='admin-form'>
            <div className='form-group'>
              <input
                type='text'
                value={newCategory.name}
                onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
                placeholder='Category Name'
                required
              />
            </div>
            <div className='form-group'>
              <textarea
                value={newCategory.description}
                onChange={e => setNewCategory({ ...newCategory, description: e.target.value })}
                placeholder='Category Description'
              />
            </div>
            <button type='submit' className='submit-btn' disabled={loading}>
              Create Category
            </button>
          </form>

          <h2>Categories List</h2>
          <div className='item-list'>
            {categories.length === 0 ? (
              <p className='no-items'>No categories found</p>
            ) : (
              categories.map(category => (
                <div key={category._id} className='item-card'>
                  <div className='category-content'>
                    <h3>{category.name}</h3>
                    {category.description && <p className='category-description'>{category.description}</p>}
                  </div>
                  <div className='item-actions'>
                    <button
                      className='delete-btn'
                      onClick={() => handleDeleteCategory(category._id)}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className='admin-section'>
          <h2>All Orders</h2>
          <div className='item-list'>
            {orders.length === 0 ? (
              <p className='no-items'>No orders found</p>
            ) : (
              orders.map(order => (
                <div key={order._id} className='item-card order-card'>
                  <div className='order-card-header'>
                    <h3>Order #{order._id}</h3>
                    <span className={`order-status status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className='order-details'>
                    <p className='order-total'>
                      <strong>Total:</strong> <span className='total-amount'>${order.total}</span>
                    </p>
                    {order.createdAt && (
                      <p className='order-date'>
                        <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
