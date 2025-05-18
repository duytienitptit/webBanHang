import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor để thêm token vào header nếu có
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    console.log('Using token:', `Bearer ${token}`)
  } else {
    console.warn('No token found in localStorage')
  }
  console.log('API Request:', config.method.toUpperCase(), config.url)
  return config
})

export default api
