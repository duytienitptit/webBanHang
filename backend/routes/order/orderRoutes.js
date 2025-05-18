const express = require('express')
const router = express.Router()
const Order = require('../../models/Order')
const Cart = require('../../models/Cart')
const Product = require('../../models/Product')
const { auth, admin } = require('../../middleware/auth')

// Create an order
router.post('/', auth, async (req, res) => {
  try {
    const { shippingAddress } = req.body
    const cart = await Cart.findOne({ user: req.user.userId }).populate('items.product')
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Giỏ hàng trống' })
    }

    let totalAmount = 0
    const orderItems = []
    for (const item of cart.items) {
      if (item.quantity > item.product.stock) {
        return res.status(400).json({ message: `Sản phẩm ${item.product.name} không đủ tồn kho` })
      }
      totalAmount += item.quantity * item.product.price
      orderItems.push({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price
      })
    }

    const order = new Order({
      user: req.user.userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      status: 'pending',
      paymentStatus: 'pending'
    })
    await order.save()

    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { stock: -item.quantity }
      })
    }

    cart.items = []
    await cart.save()

    await order.populate('items.product')
    res.status(201).json(order)
  } catch (error) {
    res.status(400).json({ message: 'Dữ liệu không hợp lệ', error })
  }
})

// Get all orders (admin only)
router.get('/all', auth, admin, async (req, res) => {
  try {
    const orders = await Order.find().populate('items.product').populate('user', 'name email')
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error })
  }
})

// Get all orders for a user
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).populate('items.product')
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error })
  }
})

// Get single order by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product')
    if (!order) {
      return res.status(404).json({ message: 'Đơn hàng không tồn tại' })
    }
    if (order.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Không có quyền truy cập' })
    }
    res.json(order)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error })
  }
})

// Update payment status (admin only)
router.put('/:id/payment', auth, admin, async (req, res) => {
  try {
    const { paymentStatus } = req.body
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true, runValidators: true }
    )
    if (!order) {
      return res.status(404).json({ message: 'Đơn hàng không tồn tại' })
    }
    await order.populate('items.product')
    res.json(order)
  } catch (error) {
    res.status(400).json({ message: 'Dữ liệu không hợp lệ', error })
  }
})

module.exports = router
