import api from './axios'
import { toast } from 'react-toastify'

export const getCart = async () => {
  try {
    return await api.get('/cart')
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error getting cart')
    throw error
  }
}

export const addToCart = async data => {
  try {
    return await api.post('/cart/add', data)
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error adding to cart')
    throw error
  }
}

export const updateCart = async data => {
  try {
    return await api.put('/cart/update', data)
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error updating cart')
    throw error
  }
}

export const removeFromCart = async productId => {
  try {
    return await api.delete(`/cart/remove/${productId}`)
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error removing from cart')
    throw error
  }
}

export const createOrder = async shippingAddress => {
  try {
    return await api.post('/orders', { shippingAddress })
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error creating order')
    throw error
  }
}
