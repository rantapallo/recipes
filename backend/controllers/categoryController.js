const asyncHandler = require('express-async-handler')

const Category = require('../models/categoryModel')

// @desc Get recipes
// @route GET /api/recipes
// @access Public

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find()
  
  res.status(200).json(categories)
})

// @desc Set recipe
// @route POST /api/category
// @access Private

const setCategory = asyncHandler(async (req, res) => {
  throw new Error('Not available')
  if(!req.body.name) {
    res.status(400)
    throw new Error('Please add category')
  }

  const category = await Category.create({
    name: req.body.name,
  })
  res.status(200).json(category)
})

module.exports = {
  getCategories,
  setCategory
  
}