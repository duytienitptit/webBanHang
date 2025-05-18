import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import LoadingSpinner from './LoadingSpinner'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useContext(AuthContext)

  if (loading) return <LoadingSpinner />

  if (!user) {
    return <Navigate to='/login' replace />
  }

  if (adminOnly && user.role !== 'admin') {
    toast.error('Access denied: Admin only')
    return <Navigate to='/' replace />
  }

  return children
}

export default ProtectedRoute
