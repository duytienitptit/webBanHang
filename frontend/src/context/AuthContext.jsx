import React, { createContext, useState, useEffect } from 'react'
import { login, getMe } from '../api/auth'
import { toast } from 'react-toastify'
import LoadingSpinner from '../components/LoadingSpinner'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getMe()
        .then(response => {
          console.log('User data:', response.data)
          setUser(response.data)
        })
        .catch(() => {
          localStorage.removeItem('token')
          toast.error('Session expired. Please login again.')
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const signIn = async credentials => {
    const response = await login(credentials)
    localStorage.setItem('token', response.data.token)
    const userData = await getMe()
    setUser(userData.data)
  }

  const signOut = () => {
    localStorage.removeItem('token')
    setUser(null)
    toast.success('Logged out successfully')
  }

  if (loading) return <LoadingSpinner />

  return <AuthContext.Provider value={{ user, loading, signIn, signOut }}>{children}</AuthContext.Provider>
}
