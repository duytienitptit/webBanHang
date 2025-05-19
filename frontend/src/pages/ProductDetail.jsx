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

  useEffect(() => {
    getProductById(id)
      .then(response => {
        setProduct(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching product:', error)
        setLoading(false)
      })
  }, [id])

  const handleAddToCart = () => {
    addToCart({ productId: id, quantity })
      .then(() => alert('Added to cart'))
      .catch(error => console.error('Error adding to cart:', error))
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
      <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className='flex flex-col items-center justify-center h-screen'>
        <h2 className='text-2xl font-bold text-gray-700 mb-4'>Product not found</h2>
        <p className='text-gray-500'>The product you're looking for doesn't exist or has been removed.</p>
      </div>
    )
  }

  return (
    <div className='bg-gray-50 min-h-screen py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
          <div className='md:flex'>
            {/* Product Image */}
            <div className='md:w-1/2 p-4'>
              <div className='bg-gray-100 rounded-lg p-4 flex items-center justify-center h-96'>
                {product.image ? (
                  <img src={product.image} alt={product.name} className='object-contain h-full w-full' />
                ) : (
                  <div className='text-gray-400 flex flex-col items-center justify-center h-full'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-16 w-16'
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
                    <p className='mt-2'>No image available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className='md:w-1/2 p-8'>
              <div className='mb-4'>
                <span className='text-sm text-gray-500'>
                  {product.category ? product.category.name : 'Uncategorized'}
                </span>
                <h1 className='text-3xl font-bold text-gray-900 mt-1'>{product.name}</h1>
              </div>

              <div className='mb-6'>
                <div className='text-2xl font-bold text-blue-600 mb-2'>${product.price.toFixed(2)}</div>
                <div className='flex items-center'>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full mr-2 ${
                      product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                  {product.stock > 0 && (
                    <span className='text-sm text-gray-500'>{product.stock} items available</span>
                  )}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className='mb-6'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Quantity</label>
                <div className='flex items-center'>
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className='px-3 py-1 bg-gray-200 rounded-l-md hover:bg-gray-300 disabled:opacity-50'
                  >
                    -
                  </button>
                  <input
                    type='text'
                    value={quantity}
                    readOnly
                    className='w-12 text-center py-1 border-y border-gray-200'
                  />
                  <button
                    onClick={incrementQuantity}
                    disabled={product.stock <= quantity}
                    className='px-3 py-1 bg-gray-200 rounded-r-md hover:bg-gray-300 disabled:opacity-50'
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className={`w-full py-3 px-6 rounded-md text-white font-medium ${
                  product.stock > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>

          {/* Product Tabs */}
          <div className='border-t border-gray-200 px-4 py-6'>
            <div className='border-b border-gray-200'>
              <nav className='flex space-x-8'>
                <button
                  onClick={() => setActiveTab('description')}
                  className={`pb-4 px-1 text-sm font-medium ${
                    activeTab === 'description'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-4 px-1 text-sm font-medium ${
                    activeTab === 'details'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Details
                </button>
              </nav>
            </div>
            <div className='mt-6 px-2'>
              {activeTab === 'description' ? (
                <div className='prose prose-blue max-w-none'>
                  <p className='text-gray-700'>{product.description}</p>
                </div>
              ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div className='flex justify-between py-3 border-b'>
                    <span className='font-medium text-gray-500'>Category</span>
                    <span className='text-gray-900'>
                      {product.category ? product.category.name : 'Uncategorized'}
                    </span>
                  </div>
                  <div className='flex justify-between py-3 border-b'>
                    <span className='font-medium text-gray-500'>Stock</span>
                    <span className='text-gray-900'>{product.stock} units</span>
                  </div>
                  <div className='flex justify-between py-3 border-b'>
                    <span className='font-medium text-gray-500'>ID</span>
                    <span className='text-gray-900'>{product._id}</span>
                  </div>
                  <div className='flex justify-between py-3 border-b'>
                    <span className='font-medium text-gray-500'>Added</span>
                    <span className='text-gray-900'>{new Date(product.createdAt).toLocaleDateString()}</span>
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
