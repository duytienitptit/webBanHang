const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../../models/User')

// Đăng ký người dùng
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: 'Email đã được sử dụng' })
    }
    user = new User({ name, email, password })
    await user.save()

    const payload = { userId: user._id, role: user.role }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.status(201).json({ token, user: { id: user._id, name, email, role: user.role } })
  } catch (error) {
    res.status(400).json({ message: 'Dữ liệu không hợp lệ', error })
  }
})

// Đăng nhập
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng' })
    }
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng' })
    }

    const payload = { userId: user._id, role: user.role }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.json({ token, user: { id: user._id, name: user.name, email, role: user.role } })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error })
  }
})

// Lấy thông tin người dùng (yêu cầu token)
router.get('/me', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({ message: 'Không có token, truy cập bị từ chối' })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.userId).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' })
    }
    res.json(user)
  } catch (error) {
    res.status(401).json({ message: 'Token không hợp lệ', error })
  }
})

module.exports = router
