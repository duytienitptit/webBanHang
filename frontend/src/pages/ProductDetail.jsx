import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../api/products'
import { addToCart } from '../api/cart'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    getProductById(id)
      .then(response => {
        setProduct(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Lỗi khi lấy thông tin sản phẩm:', error)
        setLoading(false)
      })
  }, [id])

  const handleAddToCart = () => {
    addToCart({ productId: id, quantity })
      .then(() => alert('Đã thêm vào giỏ hàng'))
      .catch(error => console.error('Lỗi khi thêm vào giỏ hàng:', error))
  }

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-white'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600'></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-white'>
        <h2 className='text-3xl font-bold text-gray-800 mb-4'>Không tìm thấy sản phẩm</h2>
        <p className='text-gray-600 max-w-md text-center'>
          Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
      </div>
    )
  }

  return (
    <div className='bg-gradient-to-br from-blue-50 to-white min-h-screen py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl'>
          <div className='md:flex'>
            {/* Hình ảnh sản phẩm với kiểu dáng cải tiến */}
            <div className='md:w-1/2 p-6'>
              <div
                className='bg-gray-50 rounded-xl p-6 flex items-center justify-center h-[450px] overflow-hidden relative'
                style={{
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {product.image ? (
                  <>
                    <div
                      className={`absolute inset-0 bg-gray-200 animate-pulse ${
                        imageLoaded ? 'opacity-0' : 'opacity-100'
                      }`}
                    ></div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`object-contain h-full w-full transition-opacity duration-500 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => setImageLoaded(true)}
                    />
                  </>
                ) : (
                  <div className='text-gray-400 flex flex-col items-center justify-center h-full transition-all duration-300'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-24 w-24'
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
                    <p className='mt-4 font-medium'>Không có hình ảnh</p>
                  </div>
                )}
              </div>
            </div>

            {/* Chi tiết sản phẩm với kiểu dáng nâng cao */}
            <div className='md:w-1/2 p-8 md:p-10 flex flex-col'>
              <div className='mb-6'>
                <span className='inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-3'>
                  {product.category ? product.category.name : 'Chưa phân loại'}
                </span>
                <h1 className='text-4xl font-bold text-gray-900 leading-tight'>{product.name}</h1>
              </div>

              <div className='mb-8'>
                <div className='text-3xl font-bold text-blue-700 mb-2'>{product.price.toFixed(2)} đ</div>
                <div className='flex items-center'>
                  <span
                    className={`inline-block px-3 py-1 text-sm font-medium rounded-full mr-3 ${
                      product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.stock > 0 ? 'Còn hàng' : 'Hết hàng'}
                  </span>
                  {product.stock > 0 && (
                    <span className='text-sm text-gray-600'>Còn {product.stock} sản phẩm</span>
                  )}
                </div>
              </div>

              {/* Bộ chọn số lượng cải tiến */}
              <div className='mb-8'>
                <label className='block text-sm font-semibold text-gray-700 mb-3'>Số lượng</label>
                <div className='flex items-center'>
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className='w-10 h-10 flex items-center justify-center bg-gray-100 rounded-l-lg border border-gray-300 hover:bg-gray-200 disabled:opacity-50 transition-colors duration-200'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </button>
                  <input
                    type='text'
                    value={quantity}
                    readOnly
                    className='w-14 h-10 text-center border-y border-gray-300 text-lg font-medium'
                  />
                  <button
                    onClick={incrementQuantity}
                    disabled={product.stock <= quantity}
                    className='w-10 h-10 flex items-center justify-center bg-gray-100 rounded-r-lg border border-gray-300 hover:bg-gray-200 disabled:opacity-50 transition-colors duration-200'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Nút thêm vào giỏ hàng nâng cao */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className={`w-full py-4 px-6 rounded-lg text-white font-medium text-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  product.stock > 0
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {product.stock > 0 ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
              </button>

              {/* Ghi chú giao hàng miễn phí */}
              {product.stock > 0 && (
                <div className='mt-6 flex items-center text-green-700'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 mr-2'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z' />
                    <path d='M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2.038A2.968 2.968 0 0115 12.172V8.5a2.5 2.5 0 00-2.5-2.5H12V4a1 1 0 00-1-1H3zM13 8.5V10h1a1 1 0 011 1v1.172A1.968 1.968 0 0114.038 13H11v-2.5a1 1 0 011-1h.5a.5.5 0 00.5-.5z' />
                  </svg>
                  <span className='text-sm font-medium'>Giao hàng miễn phí</span>
                </div>
              )}
            </div>
          </div>

          {/* Tab sản phẩm đã cải tiến */}
          <div className='border-t border-gray-200 px-6 py-8'>
            <div className='border-b border-gray-200'>
              <nav className='flex space-x-10'>
                <button
                  onClick={() => setActiveTab('description')}
                  className={`pb-4 px-1 text-sm font-medium relative transition-colors duration-200 ${
                    activeTab === 'description' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Mô tả
                  {activeTab === 'description' && (
                    <span className='absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform transition-transform duration-200'></span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-4 px-1 text-sm font-medium relative transition-colors duration-200 ${
                    activeTab === 'details' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Chi tiết
                  {activeTab === 'details' && (
                    <span className='absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform transition-transform duration-200'></span>
                  )}
                </button>
              </nav>
            </div>
            <div className='mt-8 px-2 animate-fadeIn'>
              {activeTab === 'description' ? (
                <div className='prose prose-blue max-w-none'>
                  <p className='text-gray-700 leading-relaxed text-lg'>
                    {product.description || 'Không có mô tả cho sản phẩm này.'}
                  </p>
                </div>
              ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                  <div className='flex justify-between py-3 border-b border-gray-100 hover:bg-gray-50 rounded px-3 transition-colors duration-150'>
                    <span className='font-semibold text-gray-600'>Danh mục</span>
                    <span className='text-gray-900'>
                      {product.category ? product.category.name : 'Chưa phân loại'}
                    </span>
                  </div>
                  <div className='flex justify-between py-3 border-b border-gray-100 hover:bg-gray-50 rounded px-3 transition-colors duration-150'>
                    <span className='font-semibold text-gray-600'>Tồn kho</span>
                    <span className='text-gray-900'>{product.stock} sản phẩm</span>
                  </div>
                  <div className='flex justify-between py-3 border-b border-gray-100 hover:bg-gray-50 rounded px-3 transition-colors duration-150'>
                    <span className='font-semibold text-gray-600'>Mã sản phẩm</span>
                    <span className='text-gray-900 font-mono text-sm'>{product._id}</span>
                  </div>
                  <div className='flex justify-between py-3 border-b border-gray-100 hover:bg-gray-50 rounded px-3 transition-colors duration-150'>
                    <span className='font-semibold text-gray-600'>Ngày thêm</span>
                    <span className='text-gray-900'>
                      {new Date(product.createdAt).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
