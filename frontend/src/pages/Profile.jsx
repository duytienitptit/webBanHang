import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { getMe, updateProfile } from '../api/auth'
import { toast } from 'react-toastify'
import LoadingSpinner from '../components/LoadingSpinner'
import './Profile.css'

function Profile() {
  const { user, signIn } = useContext(AuthContext)
  const [profile, setProfile] = useState({ name: '', email: '' })
  const [loading, setLoading] = useState(true)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    if (user) {
      setProfile({ name: user.name || '', email: user.email || '' })
      setLoading(false)
    } else {
      getMe()
        .then(response => {
          setProfile({ name: response.data.name || '', email: response.data.email || '' })
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [user])
  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setSaveSuccess(false)
    try {
      await updateProfile(profile)
      toast.success('Cập nhật thông tin thành công')
      // Update user in context
      await signIn({ email: profile.email, password: '' }) // Assume backend allows updates without password
      setLoading(false)
      setSaveSuccess(true)

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000)
    } catch (error) {
      console.log(error)
      toast.error('Không thể cập nhật thông tin')
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className='py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100'>
        {/* Profile Header with Decorative Elements */}
        <div className='relative h-40 profile-gradient overflow-hidden'>
          {/* Decorative flowing elements */}
          <div className='absolute -top-20 right-0 w-72 h-72 bg-white bg-opacity-10 rounded-full mix-blend-overlay animate-blob'></div>
          <div className='absolute -bottom-32 -left-20 w-80 h-80 bg-teal-200 bg-opacity-20 rounded-full mix-blend-overlay animate-blob animation-delay-2000'></div>
          <div className='absolute top-10 left-10 w-60 h-60 bg-emerald-300 bg-opacity-10 rounded-full mix-blend-overlay animate-blob animation-delay-4000'></div>

          <div className='absolute inset-0 flex items-center justify-center'>
            <h1 className='text-3xl font-bold text-white'>Thông Tin Cá Nhân</h1>
          </div>
        </div>

        {/* Profile Content */}
        <div className='p-6 md:p-8 bg-gradient-to-b from-white to-gray-50'>
          <div className='flex flex-col md:flex-row'>
            {/* Profile Avatar */}
            <div className='flex-shrink-0 mb-6 md:mb-0 md:mr-8 flex items-center justify-center'>
              <div className='w-32 h-32 rounded-full bg-gradient-to-br from-emerald-100 to-teal-50 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden relative hover:avatar-glow profile-transition'>
                <div className='text-6xl opacity-70'>👤</div>
                <div className='absolute inset-0 bg-gradient-to-tr from-emerald-500 to-transparent opacity-10'></div>
              </div>
            </div>

            {/* Profile Form */}
            <div className='flex-grow'>
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>Họ và Tên</label>
                  <div className='relative rounded-md shadow-sm'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <svg
                        className='h-5 w-5 text-emerald-400'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                    <input
                      type='text'
                      value={profile.name}
                      onChange={e => setProfile({ ...profile, name: e.target.value })}
                      placeholder='Nhập họ tên của bạn'
                      className='pl-10 focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md shadow-sm py-3 input-hover profile-transition'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>Địa Chỉ Email</label>
                  <div className='relative rounded-md shadow-sm'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <svg
                        className='h-5 w-5 text-emerald-400'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                        <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                      </svg>
                    </div>
                    <input
                      type='email'
                      value={profile.email}
                      onChange={e => setProfile({ ...profile, email: e.target.value })}
                      placeholder='Nhập email của bạn'
                      required
                      className='pl-10 focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md shadow-sm py-3 input-hover profile-transition'
                    />
                  </div>
                </div>

                {saveSuccess && (
                  <div className='p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-md flex items-center'>
                    <svg
                      className='h-5 w-5 mr-2 text-emerald-500'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <span>Thông tin cá nhân đã được cập nhật thành công!</span>
                  </div>
                )}

                <div className='pt-4'>
                  <button
                    type='submit'
                    disabled={loading}
                    className='w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-3 px-4 rounded-full shadow-md font-medium transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {loading ? (
                      <span className='flex items-center justify-center'>
                        <svg
                          className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <circle
                            className='opacity-25'
                            cx='12'
                            cy='12'
                            r='10'
                            stroke='currentColor'
                            strokeWidth='4'
                          ></circle>
                          <path
                            className='opacity-75'
                            fill='currentColor'
                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                          ></path>
                        </svg>
                        Đang cập nhật...
                      </span>
                    ) : (
                      'Cập Nhật Thông Tin'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
