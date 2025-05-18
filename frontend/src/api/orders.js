import api from './axios'
import { toast } from 'react-toastify'

export const createOrder = async data => {
  try {
    return await api.post('/orders', data)
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error creating order')
    throw error
  }
}

export const getOrders = async () => {
  try {
    return await api.get('/orders')
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error getting orders')
    throw error
  }
}

export const getOrderById = async id => {
  try {
    return await api.get(`/orders/${id}`)
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error getting order details')
    throw error
  }
}

export const getAllOrders = async () => {
  try {
    return await api.get('/orders/all')
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error getting all orders')
    throw error
  }
}

export const updateOrderPayment = async (id, data) => {
  try {
    return await api.put(`/orders/${id}/payment`, data)
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error updating order payment')
    throw error
  }
}
