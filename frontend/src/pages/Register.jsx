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
    <div className='register-container'>
      <h1>Đăng Ký Tài Khoản</h1>
      <form onSubmit={handleSubmit} className='register-form'>
        <div className='form-group'>
          <label htmlFor='name'>Họ và tên</label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Nhập họ và tên'
            className={errors.name ? 'error-input' : ''}
          />
          {errors.name && <div className='error-message'>{errors.name}</div>}
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Nhập địa chỉ email'
            className={errors.email ? 'error-input' : ''}
          />
          {errors.email && <div className='error-message'>{errors.email}</div>}
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Mật khẩu</label>
          <input
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='Nhập mật khẩu (ít nhất 6 ký tự)'
            className={errors.password ? 'error-input' : ''}
          />
          {errors.password && <div className='error-message'>{errors.password}</div>}
        </div>

        <button type='submit' className='submit-button' disabled={loading}>
          {loading ? 'Đang đăng ký...' : 'Đăng ký'}
        </button>

        <div className='login-link'>
          Đã có tài khoản? <Link to='/login'>Đăng nhập</Link>
        </div>
      </form>
    </div>
  )
}

export default Register
