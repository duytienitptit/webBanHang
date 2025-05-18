import api from './axios'
import { toast } from 'react-toastify'

export const getCategories = async () => {
  try {
    return await api.get('/categories')
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error getting categories')
    throw error
  }
}

export const getCategoryById = async id => {
  try {
    return await api.get(`/categories/${id}`)
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error getting category')
    throw error
  }
}

export const createCategory = async data => {
  try {
    return await api.post('/categories', data)
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error creating category')
    throw error
  }
}

export const updateCategory = async (id, data) => {
  try {
    return await api.put(`/categories/${id}`, data)
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error updating category')
    throw error
  }
}

export const deleteCategory = async id => {
  try {
    return await api.delete(`/categories/${id}`)
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error deleting category')
    throw error
  }
}
