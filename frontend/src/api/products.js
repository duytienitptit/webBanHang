import api from './axios'
import { toast } from 'react-toastify'

export const getProducts = async params => {
  try {
    return await api.get('/products', { params })
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error fetching products')
    throw error
  }
}

export const getProductById = async id => {
  try {
    return await api.get(`/products/${id}`)
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error fetching product details')
    throw error
  }
}

export const createProduct = async data => {
  try {
    return await api.post('/products', data)
  } catch (error) {
    console.error('Create product error details:', error.response?.data)
    toast.error(error.response?.data?.message || 'Error creating product')
    throw error
  }
}

export const updateProduct = async (id, data) => {
  try {
    return await api.put(`/products/${id}`, data)
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error updating product')
    throw error
  }
}

export const deleteProduct = async id => {
  try {
    return await api.delete(`/products/${id}`)
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error deleting product')
    throw error
  }
}
