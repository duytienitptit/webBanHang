const express = require('express')
const router = express.Router()
const productRoutes = require('./product/productRoutes')
const userRoutes = require('./user/userRoutes')
const categoryRoutes = require('./category/categoryRoutes')
const cartRoutes = require('./cart/cartRoutes')
const orderRoutes = require('./order/orderRoutes')
const reviewRoutes = require('./review/reviewRoutes')

// Test route
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the E-commerce API' })
})

// Product routes
router.use('/products', productRoutes)

// User routes
router.use('/users', userRoutes)

// Category routes
router.use('/categories', categoryRoutes)

// Cart routes
router.use('/cart', cartRoutes)

// Order routes
router.use('/orders', orderRoutes)

// Review routes
router.use('/reviews', reviewRoutes)

module.exports = router
