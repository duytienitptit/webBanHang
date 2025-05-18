const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Người dùng là bắt buộc']
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Sản phẩm là bắt buộc']
  },
  rating: {
    type: Number,
    required: [true, 'Điểm đánh giá là bắt buộc'],
    min: [1, 'Điểm phải từ 1 đến 5'],
    max: [5, 'Điểm phải từ 1 đến 5']
  },
  comment: {
    type: String,
    trim: true,
    maxlength: [500, 'Bình luận không được vượt quá 500 ký tự']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Review', reviewSchema)
