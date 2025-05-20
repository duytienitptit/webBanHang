import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCart, updateCart, removeFromCart, createOrder } from '../api/cart'
import { toast } from 'react-toastify'
import LoadingSpinner from '../components/LoadingSpinner'

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
      toast.success('Đặt hàng thành công')
      setCart(null)
      navigate('/orders')
    } catch (error) {
      console.log(error)
      toast.error('Thanh toán thất bại')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />
  if (!cart || cart.items.length === 0)
    return (
      <div className='flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-blue-50 to-white p-10 rounded-xl shadow-md'>
        <div className='relative mb-6'>
          <div className='absolute -inset-1 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur opacity-30 animate-blob'></div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='relative h-28 w-28 text-blue-500 opacity-80'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
            />
          </svg>
        </div>
        <h2 className='text-2xl font-semibold text-gray-800 mb-3'>Giỏ hàng của bạn đang trống</h2>
        <p className='text-gray-500 mb-8 max-w-md text-center'>
          Có vẻ như bạn chưa thêm bất kỳ sản phẩm nào vào giỏ hàng.
        </p>
        <button
          onClick={() => navigate('/')}
          className='px-8 py-3 bg-[var(--color-apple-blue)] text-white rounded-full font-medium hover:bg-[var(--color-apple-darkblue)] transition-all duration-300 hover:shadow-lg hover:scale-105'
        >
          Tiếp tục mua sắm
        </button>
      </div>
    )

  return (
    <div className='container mx-auto my-12 px-4'>
      {/* Background decoration */}
      <div className='absolute inset-0 -z-10 overflow-hidden'>
        <div className='absolute -left-10 top-1/3 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob'></div>
        <div className='absolute right-0 top-2/3 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000'></div>
      </div>

      <div className='flex items-center mb-8'>
        <h1 className='text-3xl md:text-4xl font-bold text-gray-800'>Giỏ hàng của bạn</h1>
        <div className='ml-4 h-1 w-20 bg-[var(--color-apple-blue)] rounded-full'></div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
        <div className='lg:col-span-2 space-y-6'>
          {cart.items.map(item => (
            <div
              key={item.product._id}
              className='bg-white p-6 rounded-xl shadow-sm border border-gray-50 transition-all duration-300 hover:shadow-md overflow-hidden relative group'
            >
              <div className='absolute inset-0 bg-gradient-to-r from-blue-50 to-white opacity-0 group-hover:opacity-80 transition-opacity duration-300 -z-10'></div>

              <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between'>
                <div className='flex flex-col sm:flex-row items-start sm:items-center mb-5 sm:mb-0'>
                  {/* Product Image */}
                  <div className='relative w-20 h-20 bg-gradient-to-br from-blue-50 to-[var(--color-apple-gray)] rounded-xl flex items-center justify-center mr-6 mb-4 sm:mb-0 group-hover:scale-110 transition-transform duration-300 overflow-hidden'>
                    <div className='absolute top-0 right-0 w-8 h-8 rounded-full bg-white bg-opacity-30 -mr-2 -mt-2'></div>
                    <div className='absolute bottom-0 left-0 w-8 h-8 rounded-full bg-white bg-opacity-30 -ml-2 -mb-2'></div>
                    {item.product.image ? (
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className='w-full h-full object-cover relative z-10'
                      />
                    ) : (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-10 w-10 text-[var(--color-apple-blue)] opacity-80'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                        />
                      </svg>
                    )}
                  </div>

                  <div>
                    <h3 className='font-semibold text-xl text-gray-800 group-hover:text-[var(--color-apple-blue)] transition-colors duration-300'>
                      {item.product.name}
                    </h3>
                    <p className='text-[var(--color-apple-blue)] font-medium mt-1'>
                      {item.product.price.toLocaleString('vi-VN')} đ
                    </p>
                  </div>
                </div>

                <div className='flex flex-col sm:flex-row items-center sm:space-x-6'>
                  <div className='flex items-center bg-gray-50 border border-gray-100 rounded-full overflow-hidden mb-4 sm:mb-0'>
                    <button
                      onClick={() => handleUpdateQuantity(item.product._id, Math.max(1, item.quantity - 1))}
                      className='w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 12H4' />
                      </svg>
                    </button>
                    <span className='px-4 font-medium text-lg w-12 text-center'>{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                      className='w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12 4v16m8-8H4'
                        />
                      </svg>
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemove(item.product._id)}
                    className='flex items-center px-4 py-2 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-colors'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4 mr-2'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                        clipRule='evenodd'
                      />
                    </svg>
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='lg:col-span-1'>
          <div className='bg-white p-8 rounded-xl shadow-sm border border-gray-50 sticky top-24'>
            <h2 className='text-2xl font-semibold mb-6 text-gray-800 pb-4 border-b border-gray-100'>
              Tóm tắt đơn hàng
            </h2>

            <div className='space-y-4 mb-8'>
              <div className='flex justify-between items-center'>
                <span className='text-gray-600'>
                  Tạm tính ({cart.items.reduce((total, item) => total + item.quantity, 0)} sản phẩm)
                </span>
                <span className='font-medium'>
                  {cart.items
                    .reduce((total, item) => total + item.product.price * item.quantity, 0)
                    .toLocaleString('vi-VN')}{' '}
                  đ
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-gray-600'>Phí vận chuyển</span>
                <span className='font-medium text-green-600'>Miễn phí</span>
              </div>
              <div className='border-t border-dashed border-gray-200 pt-4 mt-4'>
                <div className='flex justify-between items-center'>
                  <span className='text-lg font-semibold'>Tổng tiền</span>
                  <span className='text-lg font-bold text-[var(--color-apple-blue)]'>
                    {cart.items
                      .reduce((total, item) => total + item.product.price * item.quantity, 0)
                      .toLocaleString('vi-VN')}{' '}
                    đ
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className='w-full py-4 bg-[var(--color-apple-blue)] text-white rounded-full font-medium hover:bg-[var(--color-apple-darkblue)] transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02]'
            >
              Tiến hành thanh toán
            </button>

            <button
              onClick={() => navigate('/')}
              className='w-full py-3 text-[var(--color-apple-blue)] rounded-full hover:bg-blue-50 transition-all duration-300 mt-4 font-medium border border-[var(--color-apple-blue)] border-opacity-20'
            >
              Tiếp tục mua sắm
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
