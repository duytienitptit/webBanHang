const express = require('express')
const router = express.Router()
const Product = require('../../models/Product')
const Category = require('../../models/Category')
const { auth, admin } = require('../../middleware/auth')

// Get all products with search and filter
router.get('/', async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, sort } = req.query
    const query = {}

    // Search by name
    if (search) {
      query.name = { $regex: search, $options: 'i' } // Case-insensitive
    }

    // Filter by category
    if (category) {
      const categoryExists = await Category.findById(category)
      if (!categoryExists) {
        return res.status(400).json({ message: 'Danh mục không tồn tại' })
      }
      query.category = category
    }

    // Filter by price
    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = Number(minPrice)
      if (maxPrice) query.price.$lte = Number(maxPrice)
    }

    // Sorting
    let sortOption = {}
    if (sort === 'price_asc') sortOption.price = 1
    if (sort === 'price_desc') sortOption.price = -1
    if (sort === 'name_asc') sortOption.name = 1
    if (sort === 'name_desc') sortOption.name = -1

    const products = await Product.find(query).populate('category', 'name').sort(sortOption)
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error })
  }
})

// Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name')
    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' })
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error })
  }
})

// Create a product
router.post('/', auth, admin, async (req, res) => {
  try {
    console.log('Request body:', req.body)
    console.log('User:', req.user)

    const { name, price, description, category, stock, image } = req.body
    const categoryExists = await Category.findById(category)
    if (!categoryExists) {
      return res.status(400).json({ message: 'Danh mục không tồn tại' })
    }
    const product = new Product({
      name,
      price,
      description,
      category,
      stock,
      image
    })
    console.log('Product data before saving:', product)

    await product.save()
    res.status(201).json(product)
  } catch (error) {
    console.error('Product creation error:', error)
    res.status(400).json({ message: 'Dữ liệu không hợp lệ', error: error.message })
  }
})

// Update a product
router.put('/:id', auth, admin, async (req, res) => {
  try {
    const { name, price, description, category, stock, image } = req.body
    const categoryExists = await Category.findById(category)
    if (!categoryExists) {
      return res.status(400).json({ message: 'Danh mục không tồn tại' })
    }

    const updateData = { name, price, description, category, stock, image }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    })

    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' })
    }
    res.json(product)
  } catch (error) {
    res.status(400).json({ message: 'Dữ liệu không hợp lệ', error: error.message })
  }
})

// Delete a product
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' })
    }
    res.json({ message: 'Sản phẩm đã được xóa' })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error })
  }
})

module.exports = router
