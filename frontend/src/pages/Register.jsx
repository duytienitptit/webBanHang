import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../api/auth'
import { toast } from 'react-toastify'
import LoadingSpinner from '../components/LoadingSpinner'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {}

    // Validate name (required, max 50 chars)
    if (!formData.name.trim()) {
      newErrors.name = 'Tên người dùng là bắt buộc'
    } else if (formData.name.length > 50) {
      newErrors.name = 'Tên không được vượt quá 50 ký tự'
    }

    // Validate email (required, format)
    if (!formData.email) {
      newErrors.email = 'Email là bắt buộc'
    } else {
      const emailRegex = /^\S+@\S+\.\S+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Email không hợp lệ'
      }
    }

    // Validate password (required, min 6 chars)
    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      await register(formData)
      toast.success('Đăng ký thành công! Vui lòng đăng nhập.')
      navigate('/login')
    } catch (error) {
      console.error('Registration error:', error)
      if (error.response && error.response.data) {
        // Handle specific backend errors
        if (error.response.data.error?.includes('duplicate key')) {
          setErrors({ ...errors, email: 'Email này đã được sử dụng' })
        } else if (error.response.data.error) {
          toast.error(error.response.data.error)
        }
      } else {
        toast.error('Đăng ký thất bại. Vui lòng thử lại sau.')
      }
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-md'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-gray-900 mb-6'>Đăng Ký Tài Khoản</h1>
          <p className='text-sm text-gray-500'>Tạo tài khoản để mua sắm và nhận những ưu đãi đặc biệt</p>
        </div>

        <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
          <div className='space-y-4 rounded-md'>
            <div>
              <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>
                Họ và tên
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='Nhập họ và tên'
                className={`w-full rounded-md border ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } px-3 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.name && <p className='mt-1 text-sm text-red-600'>{errors.name}</p>}
            </div>

            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Nhập địa chỉ email'
                className={`w-full rounded-md border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } px-3 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.email && <p className='mt-1 text-sm text-red-600'>{errors.email}</p>}
            </div>

            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-1'>
                Mật khẩu
              </label>
              <input
                type='password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Nhập mật khẩu (ít nhất 6 ký tự)'
                className={`w-full rounded-md border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } px-3 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.password && <p className='mt-1 text-sm text-red-600'>{errors.password}</p>}
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='group relative flex w-full justify-center rounded-md bg-blue-600 py-3 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300'
              disabled={loading}
            >
              {loading ? 'Đang đăng ký...' : 'Đăng ký'}
            </button>
          </div>

          <div className='text-center mt-4'>
            <p className='text-sm text-gray-600'>
              Đã có tài khoản?{' '}
              <Link to='/login' className='font-medium text-blue-600 hover:text-blue-500'>
                Đăng nhập
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
