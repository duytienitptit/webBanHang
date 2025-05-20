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
          console.error('Lỗi khi tải dữ liệu quản trị:', error)
          toast.error('Không thể tải dữ liệu quản trị')
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
      toast.error('Vui lòng điền đầy đủ tất cả các trường bắt buộc')
      setLoading(false)
      return
    }

    try {
      const productData = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock, 10)
      }

      console.log('Đang gửi dữ liệu sản phẩm:', productData)
      const response = await createProduct(productData)
      setProducts([...products, response.data])
      setNewProduct({ name: '', price: '', description: '', category: '', stock: 0, image: '' })
      toast.success('Tạo sản phẩm thành công')
    } catch (error) {
      console.error('Lỗi khi tạo sản phẩm:', error)
      toast.error(error.response?.data?.message || 'Không thể tạo sản phẩm')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateCategory = async e => {
    e.preventDefault()
    setLoading(true)

    // Validate category name
    if (!newCategory.name.trim()) {
      toast.error('Tên danh mục là bắt buộc')
      setLoading(false)
      return
    }

    try {
      const response = await createCategory(newCategory)
      setCategories([...categories, response.data])
      setNewCategory({ name: '', description: '' })
      toast.success('Tạo danh mục thành công')
    } catch (error) {
      console.error('Lỗi khi tạo danh mục:', error)
      // Check for duplicate category error
      if (error.response?.data?.message?.includes('duplicate')) {
        toast.error('Danh mục với tên này đã tồn tại')
      } else {
        toast.error(error.response?.data?.message || 'Không thể tạo danh mục')
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
      toast.success('Đã xóa sản phẩm')
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm:', error)
      toast.error('Không thể xóa sản phẩm')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCategory = async id => {
    setLoading(true)
    try {
      await deleteCategory(id)
      setCategories(categories.filter(c => c._id !== id))
      toast.success('Đã xóa danh mục')
    } catch (error) {
      console.error('Lỗi khi xóa danh mục:', error)
      toast.error('Không thể xóa danh mục')
    } finally {
      setLoading(false)
    }
  }

  if (user?.role !== 'admin')
    return <div className='access-denied'>Truy cập bị từ chối. Yêu cầu quyền quản trị viên.</div>
  if (loading) return <LoadingSpinner />

  return (
    <div className='admin-dashboard'>
      <h1>Bảng Điều Khiển Quản Trị</h1>

      <div className='admin-tabs'>
        <button
          className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Sản Phẩm
        </button>
        <button
          className={`tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          Danh Mục
        </button>
        <button
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Đơn Hàng
        </button>
      </div>

      {activeTab === 'products' && (
        <div className='admin-section'>
          <h2>Tạo Sản Phẩm</h2>
          <form onSubmit={handleCreateProduct} className='admin-form'>
            <div className='form-group'>
              <input
                type='text'
                value={newProduct.name}
                onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                placeholder='Tên Sản Phẩm'
                required
              />
            </div>

            <div className='form-group'>
              <input
                type='number'
                value={newProduct.price}
                onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                placeholder='Giá'
                required
              />
            </div>

            <div className='form-group'>
              <select
                value={newProduct.category}
                onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                required
              >
                <option value=''>Chọn Danh Mục</option>
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
                placeholder='Số Lượng'
                required
              />
            </div>

            <div className='form-group'>
              <input
                type='text'
                value={newProduct.image}
                onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                placeholder='URL Hình Ảnh'
              />
            </div>

            <div className='form-group'>
              <textarea
                value={newProduct.description}
                onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                placeholder='Mô Tả'
                required
              />
            </div>

            <button type='submit' className='submit-btn' disabled={loading}>
              Tạo Sản Phẩm
            </button>
          </form>

          <h2>Danh Sách Sản Phẩm</h2>
          <div className='item-list'>
            {products.length === 0 ? (
              <p className='no-items'>Không tìm thấy sản phẩm nào</p>
            ) : (
              products.map(product => (
                <div key={product._id} className='item-card'>
                  <div className='item-header'>
                    <h3>{product.name}</h3>
                    <span className='stock-badge'>{product.stock} trong kho</span>
                  </div>
                  <p className='price-tag'>
                    <strong>Giá:</strong> {product.price}đ
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
                      Xóa
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
          <h2>Tạo Danh Mục</h2>
          <form onSubmit={handleCreateCategory} className='admin-form'>
            <div className='form-group'>
              <input
                type='text'
                value={newCategory.name}
                onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
                placeholder='Tên Danh Mục'
                required
              />
            </div>
            <div className='form-group'>
              <textarea
                value={newCategory.description}
                onChange={e => setNewCategory({ ...newCategory, description: e.target.value })}
                placeholder='Mô Tả Danh Mục'
              />
            </div>
            <button type='submit' className='submit-btn' disabled={loading}>
              Tạo Danh Mục
            </button>
          </form>

          <h2>Danh Sách Danh Mục</h2>
          <div className='item-list'>
            {categories.length === 0 ? (
              <p className='no-items'>Không tìm thấy danh mục nào</p>
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
                      Xóa
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
          <h2>Tất Cả Đơn Hàng</h2>
          <div className='item-list'>
            {orders.length === 0 ? (
              <p className='no-items'>Không tìm thấy đơn hàng nào</p>
            ) : (
              orders.map(order => (
                <div key={order._id} className='item-card order-card'>
                  <div className='order-card-header'>
                    <h3>Đơn Hàng #{order._id}</h3>
                    <span className={`order-status status-${order.status.toLowerCase()}`}>
                      {order.status === 'Pending'
                        ? 'Đang xử lý'
                        : order.status === 'Completed'
                        ? 'Hoàn thành'
                        : order.status === 'Cancelled'
                        ? 'Đã hủy'
                        : order.status}
                    </span>
                  </div>
                  <div className='order-details'>
                    <p className='order-total'>
                      <strong>Tổng tiền:</strong> <span className='total-amount'>{order.total}đ</span>
                    </p>
                    {order.createdAt && (
                      <p className='order-date'>
                        <strong>Ngày đặt:</strong> {new Date(order.createdAt).toLocaleString()}
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
