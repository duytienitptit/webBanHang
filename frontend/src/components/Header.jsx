import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Header() {
  const { user, signOut } = useContext(AuthContext)

  return (
    <nav style={{ padding: '10px', background: '#f8f8f8' }}>
      <Link to='/' style={{ marginRight: '10px' }}>
        Home
      </Link>
      <Link to='/cart' style={{ marginRight: '10px' }}>
        Cart
      </Link>
      {user ? (
        <>
          <Link to='/profile' style={{ marginRight: '10px' }}>
            Profile
          </Link>
          <Link to='/orders' style={{ marginRight: '10px' }}>
            Orders
          </Link>
          {user.role === 'admin' && (
            <Link to='/admin' style={{ marginRight: '10px' }}>
              Admin Dashboard
            </Link>
          )}
          <button onClick={signOut}>Logout</button>
        </>
      ) : (
        <>
          <Link to='/login' style={{ marginRight: '10px' }}>
            Login
          </Link>
          <Link to='/register' style={{ marginRight: '10px' }}>
            Register
          </Link>
        </>
      )}
    </nav>
  )
}

export default Header
