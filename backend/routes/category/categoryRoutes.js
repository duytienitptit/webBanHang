const express = require('express')
const router = express.Router()
const Category = require('../../models/Category')
const { auth, admin } = require('../../middleware/auth')

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find()
    res.json(categories)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error })
  }
})

// Get single category by ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    if (!category) {
      return res.status(404).json({ message: 'Danh mục không tồn tại' })
    }
    res.json(category)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error })
  }
})

// Create a category
router.post('/', auth, admin, async (req, res) => {
  try {
    const { name, description } = req.body
    const category = new Category({ name, description })
    await category.save()
    res.status(201).json(category)
  } catch (error) {
    res.status(400).json({ message: 'Dữ liệu không hợp lệ', error })
  }
})

// Update a category
router.put('/:id', auth, admin, async (req, res) => {
  try {
    const { name, description } = req.body
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    )
    if (!category) {
      return res.status(404).json({ message: 'Danh mục không tồn tại' })
    }
    res.json(category)
  } catch (error) {
    res.status(400).json({ message: 'Dữ liệu không hợp lệ', error })
  }
})

// Delete a category
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id)
    if (!category) {
      return res.status(404).json({ message: 'Danh mục không tồn tại' })
    }
    res.json({ message: 'Danh mục đã được xóa' })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error })
  }
})

module.exports = router
