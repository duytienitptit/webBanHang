import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCart, updateCart, removeFromCart, createOrder } from '../api/cart'
import { toast } from 'react-toastify'
import LoadingSpinner from '../components/LoadingSpinner'
import './Cart.css'

function Cart() {
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getCart()
      .then(response => {
        setCart(response.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleUpdateQuantity = (productId, quantity) => {
    setLoading(true)
    updateCart({ productId, quantity })
      .then(response => {
        setCart(response.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  const handleRemove = productId => {
    setLoading(true)
    removeFromCart(productId)
      .then(response => {
        setCart(response.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  const handleCheckout = async () => {
    setLoading(true)
    try {
      await createOrder()
      toast.success('Order created successfully')
      setCart(null)
      navigate('/orders')
    } catch (error) {
      console.log(error)
      toast.error('Checkout failed')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />
  if (!cart || cart.items.length === 0) return <div>Cart is empty</div>
  return (
    <div>
      <h1>Cart</h1>
      {cart.items.map(item => (
        <div key={item.product._id} className='cart-item'>
          <h3>{item.product.name}</h3>
          <p>Price: {item.product.price.toLocaleString('vi-VN')} đ</p>
          <p>Quantity: {item.quantity}</p>
          <div className='quantity-controls'>
            <button onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}>+</button>
            <button onClick={() => handleUpdateQuantity(item.product._id, Math.max(1, item.quantity - 1))}>
              -
            </button>
            <button onClick={() => handleRemove(item.product._id)}>Remove</button>
          </div>
        </div>
      ))}
      <div className='cart-summary'>
        <h3>
          Total:{' '}
          {cart.items
            .reduce((total, item) => total + item.product.price * item.quantity, 0)
            .toLocaleString('vi-VN')}{' '}
          đ
        </h3>
        <button onClick={handleCheckout} className='checkout-btn'>
          Checkout
        </button>
      </div>
    </div>
  )
}

export default Cart
