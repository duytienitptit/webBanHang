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
        <div className='absolute inset-0 bg-gradient-to-r from-indigo-800/90 to-purple-800/80'></div>
      </div>

      <div className='container mx-auto px-4 py-4 relative z-10'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <Link to='/' className='text-2xl font-bold mr-4 flex items-center'>
              <span className='bg-gradient-to-r from-amber-200 to-yellow-100 text-purple-900 px-3 py-1 rounded-md mr-2 font-serif shadow-lg'>
                HShop
              </span>
            </Link>
          </div>{' '}
          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-6'>
            <Link
              to='/'
              className='hover:text-yellow-200 hover:bg-purple-700/50 px-3 py-2 rounded-full transition duration-300 text-amber-100 font-medium'
            >
              Trang Chủ
            </Link>
            <Link
              to='/cart'
              className='hover:text-yellow-200 hover:bg-purple-700/50 px-3 py-2 rounded-full transition duration-300 text-amber-100 font-medium'
            >
              Giỏ Hàng
            </Link>
            {user ? (
              <>
                {' '}
                <Link
                  to='/profile'
                  className='hover:text-yellow-200 hover:bg-purple-700/50 px-3 py-2 rounded-full transition duration-300 text-amber-100 font-medium'
                >
                  Tài Khoản
                </Link>
                <Link
                  to='/orders'
                  className='hover:text-yellow-200 hover:bg-purple-700/50 px-3 py-2 rounded-full transition duration-300 text-amber-100 font-medium'
                >
                  Đơn Hàng
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to='/admin'
                    className='hover:text-yellow-200 hover:bg-purple-700/50 px-3 py-2 rounded-full transition duration-300 text-amber-100 font-medium'
                  >
                    Quản Trị
                  </Link>
                )}{' '}
                <button
                  onClick={signOut}
                  className='bg-red-600/80 hover:bg-red-700 px-4 py-2 rounded-full backdrop-blur-sm border border-red-400/30 text-white transition duration-300 shadow-md'
                >
                  Đăng Xuất
                </button>
              </>
            ) : (
              <>
                <Link
                  to='/login'
                  className='hover:text-yellow-200 hover:bg-purple-700/50 px-3 py-2 rounded-full transition duration-300 text-amber-100 font-medium'
                >
                  Đăng Nhập
                </Link>
                <Link
                  to='/register'
                  className='bg-gradient-to-r from-pink-500/80 to-rose-500/80 hover:from-pink-600 hover:to-rose-600 px-4 py-2 rounded-full backdrop-blur-sm border border-pink-400/30 text-white transition duration-300 shadow-md'
                >
                  Đăng Ký
                </Link>
              </>
            )}
          </nav>{' '}
          {/* Mobile Menu Button */}
          <div className='md:hidden'>
            <button
              onClick={toggleMobileMenu}
              className='text-white focus:outline-none bg-purple-700/50 p-2 rounded-full backdrop-blur-sm shadow-md'
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
            <div className='flex flex-col space-y-3 bg-gradient-to-b from-purple-800/90 to-indigo-900/90 backdrop-blur-md rounded-xl p-4 border border-purple-500/30 shadow-xl'>
              <Link
                to='/'
                className='hover:bg-purple-700/50 px-3 py-2 rounded-lg transition duration-300 flex items-center text-amber-100'
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
                Trang Chủ
              </Link>{' '}
              <Link
                to='/cart'
                className='hover:bg-purple-700/50 px-3 py-2 rounded-lg transition duration-300 flex items-center text-amber-100'
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
                Giỏ Hàng
              </Link>
              {user ? (
                <>
                  {' '}
                  <Link
                    to='/profile'
                    className='hover:bg-purple-700/50 px-3 py-2 rounded-lg transition duration-300 flex items-center text-amber-100'
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
                    Tài Khoản
                  </Link>
                  <Link
                    to='/orders'
                    className='hover:bg-purple-700/50 px-3 py-2 rounded-lg transition duration-300 flex items-center text-amber-100'
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
                    Đơn Hàng
                  </Link>{' '}
                  {user.role === 'admin' && (
                    <Link
                      to='/admin'
                      className='hover:bg-purple-700/50 px-3 py-2 rounded-lg transition duration-300 flex items-center text-amber-100'
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
                      Quản Trị
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      signOut()
                      setMobileMenuOpen(false)
                    }}
                    className='bg-gradient-to-r from-red-600/80 to-red-700/80 hover:from-red-700 hover:to-red-800 px-3 py-2 rounded-lg backdrop-blur-sm border border-red-400/30 text-white text-left flex items-center shadow-md'
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
                    Đăng Xuất
                  </button>
                </>
              ) : (
                <>
                  {' '}
                  <Link
                    to='/login'
                    className='hover:bg-purple-700/50 px-3 py-2 rounded-lg transition duration-300 flex items-center text-amber-100'
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
                    Đăng Nhập
                  </Link>
                  <Link
                    to='/register'
                    className='bg-gradient-to-r from-pink-500/80 to-rose-500/80 hover:from-pink-600 hover:to-rose-600 px-3 py-2 rounded-lg backdrop-blur-sm border border-pink-400/30 text-white flex items-center shadow-md'
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
                    Đăng Ký
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
