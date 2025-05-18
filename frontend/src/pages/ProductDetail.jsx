import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../api/products'
import { addToCart } from '../api/cart'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

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
    addToCart({ productId: id, quantity: 1 })
      .then(() => alert('Added to cart'))
      .catch(error => console.error('Error adding to cart:', error))
  }

  if (loading) return <div>Loading...</div>
  if (!product) return <div>Product not found</div>

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.price}</p>
      <p>{product.description}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  )
}

export default ProductDetail
