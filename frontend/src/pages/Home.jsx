import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../api/products'
import { addToCart } from '../api/cart'
import { AuthContext } from '../context/AuthContext'
import LoadingSpinner from '../components/LoadingSpinner'
import { toast } from 'react-toastify'

function Home() {
  const { user } = useContext(AuthContext)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [featured, setFeatured] = useState(null)

  useEffect(() => {
    getProducts()
      .then(response => {
        const productList = response.data
        setProducts(productList)

        // Set the first product as featured if products exist
        if (productList.length > 0) {
          setFeatured(productList[0])
        }

        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])
  const handleAddToCart = (productId, e) => {
    e.preventDefault() // Prevent navigation when clicking the button
    if (!user) {
      toast.info('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng')
      return
    }

    addToCart({ productId, quantity: 1 })
      .then(() => toast.success('Đã thêm vào giỏ hàng'))
      .catch(error => console.error('Lỗi khi thêm vào giỏ hàng:', error))
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className='py-6'>
      {' '}
      {/* Hero Section - Apple Store Style */}
      {featured && (
        <div className='hero-container relative py-16 mb-16 overflow-hidden' style={{ minHeight: '600px' }}>
          {/* Decorative flowing shapes */}
          <div className='absolute top-0 left-0 w-full h-full bg-[var(--color-apple-gray)] overflow-hidden z-0'>
            <div className='absolute -left-10 top-1/4 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob'></div>
            <div className='absolute right-0 bottom-1/3 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000'></div>
            <div className='absolute left-1/3 bottom-0 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000'></div>
          </div>

          <div className='container mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10'>
            {/* Left content */}
            <div className='md:w-1/2 text-center md:text-left mb-10 md:mb-0'>
              {' '}
              <span className='inline-block px-3 py-1 bg-blue-100 text-[var(--color-apple-blue)] rounded-full text-sm font-medium mb-5'>
                Sản Phẩm Nổi Bật
              </span>
              <h1 className='text-4xl md:text-6xl font-bold mb-4 leading-tight'>{featured.name}</h1>
              <p className='text-xl md:text-2xl mb-6 text-gray-600'>Thế hệ tiếp theo của sự đổi mới.</p>
              <p className='text-2xl md:text-3xl font-medium text-[var(--color-apple-blue)] mb-8'>
                {featured.price.toLocaleString('vi-VN')} đ
              </p>
              <div className='flex flex-col sm:flex-row gap-4'>
                <button
                  onClick={e => handleAddToCart(featured._id, e)}
                  disabled={!featured.stock}
                  className='bg-white text-[var(--color-apple-blue)] border border-[var(--color-apple-blue)] px-6 py-3 rounded-full text-lg font-medium hover:bg-[var(--color-apple-gray)] transition-all hover:scale-105 shadow-md disabled:opacity-50'
                >
                  {featured.stock > 0 ? 'Thêm Vào Giỏ Hàng' : 'Hết Hàng'}
                </button>
              </div>
            </div>{' '}
            {/* Right image */}
            <div className='md:w-1/2 relative'>
              <div className='w-64 h-64 md:w-80 md:h-80 mx-auto bg-white rounded-full shadow-xl flex items-center justify-center overflow-hidden relative'>
                <div className='absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100'></div>{' '}
                {featured.image ? (
                  <img
                    src={featured.image}
                    alt={featured.name}
                    className='relative z-10 w-full h-full object-cover'
                  />
                ) : (
                  <div className='relative z-10 text-8xl opacity-70'>📱</div>
                )}
                {/* Flowing circle decorations */}
                <div className='absolute -top-5 -right-5 w-24 h-24 bg-blue-100 rounded-full'></div>
                <div className='absolute -bottom-10 -left-10 w-32 h-32 bg-blue-50 rounded-full'></div>
              </div>
            </div>
          </div>
        </div>
      )}{' '}
      {/* Admin Link */}
      {user?.role === 'admin' && (
        <div className='container mx-auto px-4 mb-12'>
          <div className='relative overflow-hidden inline-block group'>
            <div className='absolute inset-0 w-full h-full bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-700'></div>
            <Link
              to='/admin'
              className='relative z-10 inline-flex items-center border border-[var(--color-apple-blue)] text-[var(--color-apple-blue)] px-6 py-3 rounded-lg hover:text-[var(--color-apple-darkblue)] transition-colors'
            >
              {' '}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 mr-2'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                />
              </svg>
              Quản Lý Sản Phẩm
            </Link>
          </div>
        </div>
      )}
      {/* Product Grid */}
      <div className='container mx-auto px-4 relative'>
        {/* Background decoration */}
        <div className='absolute inset-0 -z-10 overflow-hidden'>
          <div className='absolute -left-10 top-1/3 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob'></div>
          <div className='absolute right-0 top-2/3 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000'></div>
        </div>{' '}
        <div className='text-center mb-12 relative'>
          <h2 className='text-4xl font-bold mb-3'>Sản Phẩm Của Chúng Tôi</h2>
          <div className='h-1 w-20 bg-[var(--color-apple-blue)] mx-auto rounded-full'></div>
        </div>
        {products.length === 0 ? (
          <div className='text-center py-16 bg-white bg-opacity-80 rounded-xl shadow-sm'>
            {' '}
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
            <p className='text-xl text-gray-600'>Không tìm thấy sản phẩm nào</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
            {products.map((product, index) => (
              <div
                key={product._id}
                className='product-card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1'
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link to={`/product/${product._id}`} className='block p-4'>
                  <div className='mb-4 pt-2 relative'>
                    <div className='relative h-52 flex items-center justify-center rounded-lg overflow-hidden group'>
                      {/* Background with flowing gradients */}
                      <div className='absolute inset-0 bg-gradient-to-br from-blue-50 to-[var(--color-apple-gray)] group-hover:scale-110 transition-transform duration-700'></div>
                      {/* Decorative flowing elements */}
                      <div className='absolute top-0 right-0 w-24 h-24 rounded-full bg-white bg-opacity-30 -mr-10 -mt-10'></div>
                      <div className='absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white bg-opacity-30 -ml-10 -mb-10'></div>{' '}
                      {/* Product image with hover effect */}{' '}
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className='w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-110 transform transition-all duration-500 relative z-10 object-cover'
                        />
                      ) : (
                        <div className='text-6xl opacity-50 group-hover:opacity-80 group-hover:scale-110 transform transition-all duration-500 relative z-10'>
                          📱
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='pb-2'>
                    <h3 className='text-xl font-semibold mb-2 text-[var(--color-apple-black)] line-clamp-2 group-hover:text-[var(--color-apple-blue)]'>
                      {product.name}
                    </h3>
                    <p className='text-[var(--color-apple-blue)] font-medium mb-2 text-lg'>
                      {product.price.toLocaleString('vi-VN')} đ
                    </p>
                    <p className='text-sm text-gray-500'>
                      {' '}
                      {product.stock > 0 ? (
                        <span className='flex items-center'>
                          <span className='w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse'></span>
                          Còn hàng: {product.stock}
                        </span>
                      ) : (
                        <span className='text-red-500 flex items-center'>
                          <span className='w-2 h-2 rounded-full bg-red-500 mr-2'></span>
                          Hết hàng
                        </span>
                      )}
                    </p>
                  </div>
                </Link>
                <div className='px-4 pb-4'>
                  {' '}
                  <button
                    onClick={e => handleAddToCart(product._id, e)}
                    disabled={!product.stock}
                    className='w-full bg-[var(--color-apple-blue)] text-white py-3 rounded-full font-medium hover:bg-[var(--color-apple-darkblue)] transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:bg-gray-300'
                  >
                    {product.stock > 0 ? 'Thêm Vào Giỏ Hàng' : 'Hết Hàng'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
