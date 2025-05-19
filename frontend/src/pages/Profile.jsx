import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { getMe, updateProfile } from '../api/auth'
import { toast } from 'react-toastify'
import LoadingSpinner from '../components/LoadingSpinner'

function Profile() {
  const { user, signIn } = useContext(AuthContext)
  const [profile, setProfile] = useState({ name: '', email: '' })
  const [loading, setLoading] = useState(true)

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
    try {
      await updateProfile(profile)
      toast.success('Profile updated successfully')
      // Update user in context
      await signIn({ email: profile.email, password: '' }) // Assume backend allows updates without password
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error('Failed to update profile')
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className='py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='bg-white shadow-xl rounded-xl overflow-hidden'>
        {/* Profile Header with Decorative Elements */}
        <div className='relative h-40 bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden'>
          {/* Decorative flowing elements */}
          <div className='absolute -top-20 right-0 w-72 h-72 bg-white bg-opacity-10 rounded-full mix-blend-overlay animate-blob'></div>
          <div className='absolute -bottom-32 -left-20 w-80 h-80 bg-purple-200 bg-opacity-20 rounded-full mix-blend-overlay animate-blob animation-delay-2000'></div>

          <div className='absolute inset-0 flex items-center justify-center'>
            <h1 className='text-3xl font-bold text-white'>My Profile</h1>
          </div>
        </div>

        {/* Profile Content */}
        <div className='p-6 md:p-8'>
          <div className='flex flex-col md:flex-row'>
            {/* Profile Avatar */}
            <div className='flex-shrink-0 mb-6 md:mb-0 md:mr-8 flex items-center justify-center'>
              <div className='w-32 h-32 rounded-full bg-[var(--color-apple-gray)] border-4 border-white shadow-lg flex items-center justify-center overflow-hidden relative'>
                <div className='text-6xl opacity-70'>👤</div>
              </div>
            </div>

            {/* Profile Form */}
            <div className='flex-grow'>
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>Full Name</label>
                  <div className='relative rounded-md shadow-sm'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <svg
                        className='h-5 w-5 text-gray-400'
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
                      placeholder='Your Name'
                      className='pl-10 focus:ring-[var(--color-apple-blue)] focus:border-[var(--color-apple-blue)] block w-full sm:text-sm border-gray-300 rounded-md shadow-sm py-3'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>Email Address</label>
                  <div className='relative rounded-md shadow-sm'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <svg
                        className='h-5 w-5 text-gray-400'
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
                      placeholder='Your Email'
                      required
                      className='pl-10 focus:ring-[var(--color-apple-blue)] focus:border-[var(--color-apple-blue)] block w-full sm:text-sm border-gray-300 rounded-md shadow-sm py-3'
                    />
                  </div>
                </div>

                <div className='pt-4'>
                  <button
                    type='submit'
                    disabled={loading}
                    className='w-full bg-[var(--color-apple-blue)] hover:bg-[var(--color-apple-darkblue)] text-white py-3 px-4 rounded-full shadow-md font-medium transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
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
                        Updating...
                      </span>
                    ) : (
                      'Update Profile'
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
