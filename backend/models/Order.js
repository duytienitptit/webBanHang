const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
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
      },
      price: {
        type: Number,
        required: [true, 'Giá sản phẩm là bắt buộc'],
        min: [0, 'Giá không được âm']
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: [true, 'Tổng tiền là bắt buộc'],
    min: [0, 'Tổng tiền không được âm']
  },
  shippingAddress: {
    address: { type: String, required: [true, 'Địa chỉ là bắt buộc'] },
    city: { type: String, required: [true, 'Thành phố là bắt buộc'] },
    postalCode: { type: String, required: [true, 'Mã bưu điện là bắt buộc'] },
    country: { type: String, required: [true, 'Quốc gia là bắt buộc'] }
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Order', orderSchema)
