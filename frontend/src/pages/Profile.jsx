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
      // Cập nhật lại user trong context
      await signIn({ email: profile.email, password: '' }) // Giả sử backend cho phép cập nhật mà không cần mật khẩu
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error('Failed to update profile')
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type='text'
            value={profile.name}
            onChange={e => setProfile({ ...profile, name: e.target.value })}
            placeholder='Name'
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type='email'
            value={profile.email}
            onChange={e => setProfile({ ...profile, email: e.target.value })}
            placeholder='Email'
            required
          />
        </div>
        <button type='submit' disabled={loading}>
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  )
}

export default Profile
