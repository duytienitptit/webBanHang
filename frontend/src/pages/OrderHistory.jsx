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

  // Function to format date
  const formatDate = dateString => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Function to get status color
  const getStatusColor = status => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className='py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='bg-white shadow-xl rounded-xl overflow-hidden'>
        {/* Header with Decorative Elements */}
        <div className='relative h-40 bg-gradient-to-r from-indigo-500 to-purple-600 overflow-hidden'>
          {/* Decorative flowing elements */}
          <div className='absolute -top-20 right-0 w-72 h-72 bg-white bg-opacity-10 rounded-full mix-blend-overlay animate-blob'></div>
          <div className='absolute -bottom-32 -left-20 w-80 h-80 bg-purple-200 bg-opacity-20 rounded-full mix-blend-overlay animate-blob animation-delay-2000'></div>

          <div className='absolute inset-0 flex items-center justify-center'>
            <h1 className='text-3xl font-bold text-white flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-8 w-8 mr-3'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
                />
              </svg>
              Order History
            </h1>
          </div>
        </div>

        {/* Orders List */}
        <div className='p-6 md:p-8'>
          {orders.length === 0 ? (
            <div className='text-center py-12'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-16 w-16 mx-auto text-gray-400 mb-4'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
                />
              </svg>
              <p className='text-xl text-gray-600'>No orders found</p>
              <p className='text-gray-500 mt-1'>
                Your order history will appear here once you make a purchase.
              </p>
            </div>
          ) : (
            <div className='space-y-6'>
              {orders.map(order => (
                <div
                  key={order._id}
                  className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300'
                >
                  {/* Order Header */}
                  <div className='border-b border-gray-100 bg-gray-50 px-6 py-4 flex flex-wrap items-center justify-between'>
                    <div>
                      <h3 className='text-lg font-medium text-gray-900'>
                        Order #{order._id.slice(-6).toUpperCase()}
                      </h3>
                      <p className='text-sm text-gray-500'>
                        {order.createdAt ? formatDate(order.createdAt) : 'N/A'}
                      </p>
                    </div>
                    <div className='flex items-center mt-2 sm:mt-0'>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                      <span className='ml-4 text-lg font-medium text-[var(--color-apple-blue)]'>
                        {typeof order.total === 'number' ? order.total.toLocaleString('vi-VN') : order.total}{' '}
                        đ
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className='px-6 py-4'>
                    <h4 className='text-sm font-medium text-gray-500 mb-3'>ITEMS</h4>
                    <ul className='divide-y divide-gray-100'>
                      {order.items.map(item => (
                        <li key={item.productId} className='py-3 flex items-center justify-between'>
                          <div className='flex items-center'>
                            <div className='h-10 w-10 flex-shrink-0 bg-gray-100 rounded-md flex items-center justify-center text-gray-500'>
                              📱
                            </div>
                            <div className='ml-4'>
                              <p className='text-sm font-medium text-gray-900'>{item.productName}</p>
                              <p className='text-sm text-gray-500'>Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className='text-sm font-medium text-gray-900'>
                            {item.price ? `${item.price.toLocaleString('vi-VN')} đ` : 'N/A'}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Order Footer */}
                  <div className='bg-gray-50 px-6 py-3 flex justify-end border-t border-gray-100'>
                    <button className='text-[var(--color-apple-blue)] hover:text-[var(--color-apple-darkblue)] text-sm font-medium transition-colors duration-300 flex items-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4 mr-1'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                        />
                      </svg>
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderHistory
