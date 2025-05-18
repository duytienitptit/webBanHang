const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({ message: 'Không có token, truy cập bị từ chối' })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { userId: decoded.userId, role: decoded.role }
    next()
  } catch (error) {
    res.status(401).json({ message: 'Token không hợp lệ', error })
  }
}

const admin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    console.log('Chỉ admin mới có quyền truy cập')

    return res.status(403).json({ message: 'Chỉ admin mới có quyền truy cập' })
  }
  next()
}

module.exports = { auth, admin }
