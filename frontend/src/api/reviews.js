import api from './axios'
import { toast } from 'react-toastify'

export const createReview = async data => {
  try {
    return await api.post('/reviews', data)
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error submitting review')
    throw error
  }
}

export const getReviewsByProduct = async productId => {
  try {
    return await api.get(`/reviews/product/${productId}`)
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error fetching product reviews')
    throw error
  }
}
