const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tên danh mục là bắt buộc'],
    trim: true,
    unique: true,
    maxlength: [50, 'Tên danh mục không được vượt quá 50 ký tự']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, 'Mô tả không được vượt quá 200 ký tự']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Category', categorySchema)
