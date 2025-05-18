const express = require('express')
const router = express.Router()
const Review = require('../../models/Review')
const Product = require('../../models/Product')
const { auth } = require('../../middleware/auth')

// Create a review
router.post('/', auth, async (req, res) => {
  try {
    const { productId, rating, comment } = req.body
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' })
    }
    const existingReview = await Review.findOne({ user: req.user.userId, product: productId })
    if (existingReview) {
      return res.status(400).json({ message: 'Bạn đã đánh giá sản phẩm này' })
    }
    const review = new Review({
      user: req.user.userId,
      product: productId,
      rating,
      comment
    })
    await review.save()
    await review.populate('user', 'name')
    res.status(201).json(review)
  } catch (error) {
    res.status(400).json({ message: 'Dữ liệu không hợp lệ', error })
  }
})

// Get reviews for a product
router.get('/product/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name')
    res.json(reviews)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error })
  }
})

module.exports = router
