const express = require('express')
const router = express.Router()
const Cart = require('../../models/Cart')
const Product = require('../../models/Product')
const { auth } = require('../../middleware/auth')

// Get cart
router.get('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.userId }).populate('items.product')
    if (!cart) {
      cart = new Cart({ user: req.user.userId, items: [] })
      await cart.save()
    }
    res.json(cart)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error })
  }
})

// Add product to cart
router.post('/add', auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' })
    }
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Số lượng tồn kho không đủ' })
    }

    let cart = await Cart.findOne({ user: req.user.userId })
    if (!cart) {
      cart = new Cart({ user: req.user.userId, items: [] })
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId)
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity
    } else {
      cart.items.push({ product: productId, quantity })
    }

    await cart.save()
    await cart.populate('items.product')
    res.json(cart)
  } catch (error) {
    res.status(400).json({ message: 'Dữ liệu không hợp lệ', error })
  }
})

// Update product quantity in cart
router.put('/update', auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' })
    }
    if (quantity <= 0) {
      return res.status(400).json({ message: 'Số lượng phải lớn hơn 0' })
    }
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Số lượng tồn kho không đủ' })
    }

    const cart = await Cart.findOne({ user: req.user.userId })
    if (!cart) {
      return res.status(404).json({ message: 'Giỏ hàng không tồn tại' })
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId)
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Sản phẩm không có trong giỏ hàng' })
    }

    cart.items[itemIndex].quantity = quantity
    await cart.save()
    await cart.populate('items.product')
    res.json(cart)
  } catch (error) {
    res.status(400).json({ message: 'Dữ liệu không hợp lệ', error })
  }
})

// Remove product from cart
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId })
    if (!cart) {
      return res.status(404).json({ message: 'Giỏ hàng không tồn tại' })
    }

    cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId)
    await cart.save()
    await cart.populate('items.product')
    res.json(cart)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error })
  }
})

module.exports = router
