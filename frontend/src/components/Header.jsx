import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Header() {
  const { user, signOut } = useContext(AuthContext)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }
  return (
    <header className='relative text-white shadow-md'>
      {/* Background flow image with overlay */}
      <div
        className='absolute inset-0 bg-cover bg-center z-0'
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1470&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className='absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/80'></div>
      </div>

      <div className='container mx-auto px-4 py-4 relative z-10'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <Link to='/' className='text-2xl font-bold mr-4 flex items-center'>
              <span className='bg-white text-purple-800 px-2 py-1 rounded-md mr-2'>Hshop</span>
            </Link>
          </div>{' '}
          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-6'>
            <Link
              to='/'
              className='hover:text-white hover:bg-white/20 px-3 py-2 rounded-full transition duration-300'
            >
              Home
            </Link>
            <Link
              to='/cart'
              className='hover:text-white hover:bg-white/20 px-3 py-2 rounded-full transition duration-300'
            >
              Cart
            </Link>
            {user ? (
              <>
                {' '}
                <Link
                  to='/profile'
                  className='hover:text-white hover:bg-white/20 px-3 py-2 rounded-full transition duration-300'
                >
                  Profile
                </Link>
                <Link
                  to='/orders'
                  className='hover:text-white hover:bg-white/20 px-3 py-2 rounded-full transition duration-300'
                >
                  Orders
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to='/admin'
                    className='hover:text-white hover:bg-white/20 px-3 py-2 rounded-full transition duration-300'
                  >
                    Admin
                  </Link>
                )}{' '}
                <button
                  onClick={signOut}
                  className='bg-red-500/80 hover:bg-red-600 px-4 py-2 rounded-full backdrop-blur-sm border border-red-400/30 text-white transition duration-300'
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to='/login'
                  className='hover:text-white hover:bg-white/20 px-3 py-2 rounded-full transition duration-300'
                >
                  Login
                </Link>
                <Link
                  to='/register'
                  className='bg-pink-500/80 hover:bg-pink-600 px-4 py-2 rounded-full backdrop-blur-sm border border-pink-400/30 text-white transition duration-300'
                >
                  Register
                </Link>
              </>
            )}
          </nav>{' '}
          {/* Mobile Menu Button */}
          <div className='md:hidden'>
            <button
              onClick={toggleMobileMenu}
              className='text-white focus:outline-none bg-white/20 p-2 rounded-full backdrop-blur-sm'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                ) : (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                )}
              </svg>
            </button>
          </div>
        </div>{' '}
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className='pt-4 pb-3 md:hidden'>
            <div className='flex flex-col space-y-3 bg-purple-900/70 backdrop-blur-md rounded-xl p-4 border border-white/20'>
              <Link
                to='/'
                className='hover:bg-white/20 px-3 py-2 rounded-lg transition duration-300 flex items-center'
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg
                  className='w-5 h-5 mr-2'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                  ></path>
                </svg>
                Home
              </Link>{' '}
              <Link
                to='/cart'
                className='hover:bg-white/20 px-3 py-2 rounded-lg transition duration-300 flex items-center'
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg
                  className='w-5 h-5 mr-2'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                  ></path>
                </svg>
                Cart
              </Link>
              {user ? (
                <>
                  {' '}
                  <Link
                    to='/profile'
                    className='hover:bg-white/20 px-3 py-2 rounded-lg transition duration-300 flex items-center'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg
                      className='w-5 h-5 mr-2'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                      ></path>
                    </svg>
                    Profile
                  </Link>
                  <Link
                    to='/orders'
                    className='hover:bg-white/20 px-3 py-2 rounded-lg transition duration-300 flex items-center'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg
                      className='w-5 h-5 mr-2'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
                      ></path>
                    </svg>
                    Orders
                  </Link>{' '}
                  {user.role === 'admin' && (
                    <Link
                      to='/admin'
                      className='hover:bg-white/20 px-3 py-2 rounded-lg transition duration-300 flex items-center'
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <svg
                        className='w-5 h-5 mr-2'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                        ></path>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                        ></path>
                      </svg>
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      signOut()
                      setMobileMenuOpen(false)
                    }}
                    className='bg-red-500/80 hover:bg-red-600 px-3 py-2 rounded-lg backdrop-blur-sm border border-red-400/30 text-white text-left flex items-center'
                  >
                    <svg
                      className='w-5 h-5 mr-2'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                      ></path>
                    </svg>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  {' '}
                  <Link
                    to='/login'
                    className='hover:bg-white/20 px-3 py-2 rounded-lg transition duration-300 flex items-center'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg
                      className='w-5 h-5 mr-2'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
                      ></path>
                    </svg>
                    Login
                  </Link>
                  <Link
                    to='/register'
                    className='bg-pink-500/80 hover:bg-pink-600 px-3 py-2 rounded-lg backdrop-blur-sm border border-pink-400/30 text-white flex items-center'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg
                      className='w-5 h-5 mr-2'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
                      ></path>
                    </svg>
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
