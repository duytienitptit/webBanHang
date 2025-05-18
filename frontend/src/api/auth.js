import api from './axios'
import { toast } from 'react-toastify'

export const register = async data => {
  try {
    return await api.post('/users/register', data)
  } catch (error) {
    toast.error(error.response?.data?.message || 'Registration failed')
    throw error
  }
}

export const login = async data => {
  try {
    return await api.post('/users/login', data)
  } catch (error) {
    toast.error(error.response?.data?.message || 'Login failed')
    throw error
  }
}

export const getMe = async () => {
  try {
    return await api.get('/users/me')
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to fetch user')
    throw error
  }
}

export const updateProfile = async data => {
  try {
    return await api.put('/users/me', data)
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to update profile')
    throw error
  }
}
