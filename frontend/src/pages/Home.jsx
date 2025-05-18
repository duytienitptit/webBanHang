import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../api/products'
import { addToCart } from '../api/cart'
import { AuthContext } from '../context/AuthContext'
import LoadingSpinner from '../components/LoadingSpinner'
import { toast } from 'react-toastify'
import './Home.css'

function Home() {
  const { user } = useContext(AuthContext)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts()
      .then(response => {
        setProducts(response.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleAddToCart = (productId, e) => {
    e.preventDefault() // Prevent navigation when clicking the button
    if (!user) {
      toast.info('Please login to add items to cart')
      return
    }

    addToCart({ productId, quantity: 1 })
      .then(() => toast.success('Added to cart'))
      .catch(error => console.error('Error adding to cart:', error))
  }

  if (loading) return <LoadingSpinner />

  return (
    <div>
      <h1>Products</h1>
      {user?.role === 'admin' && (
        <Link to='/admin' style={{ display: 'block', marginBottom: '10px' }}>
          Manage Products
        </Link>
      )}
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className='products-grid'>
          {products.map(product => (
            <div key={product._id} className='product-card'>
              <Link to={`/products/${product._id}`}>
                <h3>{product.name}</h3>
                <p>{product.price.toLocaleString('vi-VN')} đ</p>
                {product.stock > 0 ? <p>In stock: {product.stock}</p> : <p>Out of stock</p>}
              </Link>
              <button
                onClick={e => handleAddToCart(product._id, e)}
                disabled={!product.stock}
                className='add-to-cart-btn'
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
