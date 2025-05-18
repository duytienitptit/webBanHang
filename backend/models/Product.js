const mongoose = require('mongoose')
const slugify = require('slugify')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Product category is required']
  },
  stock: {
    type: Number,
    required: [true, 'Product stock is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  image: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Generate slug before saving
productSchema.pre('save', async function (next) {
  if (this.isModified('name') || !this.slug) {
    let slugBase = slugify(this.name, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    })

    // Check if the slug already exists
    let slug = slugBase
    let counter = 1
    let slugExists = await mongoose.model('Product').findOne({ slug: slugBase })

    // If slug exists, append a number to make it unique
    while (slugExists) {
      slug = `${slugBase}-${counter}`
      counter++
      slugExists = await mongoose.model('Product').findOne({ slug })
    }

    this.slug = slug
  }
  next()
})

module.exports = mongoose.model('Product', productSchema)
