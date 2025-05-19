import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await signIn({ email, password })
      navigate('/')
    } catch (error) {
      console.error('Login failed:', error)
      toast.error('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.')
      setLoading(false)
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-md'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-gray-900 mb-6'>Đăng Nhập</h1>
          <p className='text-sm text-gray-500'>Đăng nhập để tiếp tục mua sắm với chúng tôi</p>
        </div>

        <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
          <div className='space-y-4 rounded-md'>
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
                Email
              </label>
              <input
                id='email'
                name='email'
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='Nhập địa chỉ email'
                required
                className='w-full rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
              />
            </div>

            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-1'>
                Mật khẩu
              </label>
              <input
                id='password'
                name='password'
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='Nhập mật khẩu'
                required
                className='w-full rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
              />
            </div>
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input
                id='remember-me'
                name='remember-me'
                type='checkbox'
                className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
              />
              <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-900'>
                Ghi nhớ đăng nhập
              </label>
            </div>

            <div className='text-sm'>
              <a href='#' className='font-medium text-blue-600 hover:text-blue-500'>
                Quên mật khẩu?
              </a>
            </div>
          </div>

          <div>
            <button
              type='submit'
              disabled={loading}
              className='group relative flex w-full justify-center rounded-md bg-blue-600 py-3 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300'
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </div>

          <div className='text-center mt-4'>
            <p className='text-sm text-gray-600'>
              Chưa có tài khoản?{' '}
              <Link to='/register' className='font-medium text-blue-600 hover:text-blue-500'>
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
