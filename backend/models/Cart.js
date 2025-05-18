const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Người dùng là bắt buộc']
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Sản phẩm là bắt buộc']
      },
      quantity: {
        type: Number,
        required: [true, 'Số lượng là bắt buộc'],
        min: [1, 'Số lượng phải lớn hơn 0']
      }
    }
  ],
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// Cập nhật thời gian khi giỏ hàng thay đổi
cartSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  next()
})

module.exports = mongoose.model('Cart', cartSchema)
