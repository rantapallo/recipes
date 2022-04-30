const path = require('path')
const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/recipes', require('./routes/recipeRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/category', require('./routes/categoryRoutes'))

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  // static frontend path
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  // point index.html location
  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  )
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))