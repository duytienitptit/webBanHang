const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const routes = require('./routes')
const cors = require('cors')

// Load environment variables
dotenv.config()

// Initialize Express app
const app = express()

// Connect to MongoDB
connectDB()

// Middleware to parse JSON
app.use(express.json())

// Enable CORS
app.use(cors())

// Routes
app.use('/api', routes)

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
