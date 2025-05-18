import React, { useState, useEffect } from 'react'
import { getOrders } from '../api/orders'
import LoadingSpinner from '../components/LoadingSpinner'

function OrderHistory() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getOrders()
      .then(response => {
        setOrders(response.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSpinner />

  return (
    <div>
      <h1>Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map(order => (
          <div key={order._id}>
            <h3>Order #{order._id}</h3>
            <p>Total: {order.total}</p>
            <p>Status: {order.status}</p>
            <ul>
              {order.items.map(item => (
                <li key={item.productId}>
                  {item.productName} - Quantity: {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  )
}

export default OrderHistory
