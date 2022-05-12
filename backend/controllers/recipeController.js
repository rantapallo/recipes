const asyncHandler = require('express-async-handler')

const Recipe = require('../models/recipeModel')
const User = require('../models/userModel')

// @desc Get recipes
// @route GET /api/recipes
// @access Public

const getRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find().sort({'createdAt': -1})
  .populate({
    path: 'user',
    select: 'name'
  })
  res.status(200).json(recipes)
})

// @desc Get recipe
// @route GET /api/recipe
// @access Public

const getRecipe = asyncHandler(async (req, res) => {
  
  const recipe = await Recipe.findById(req.params.id)
  .populate({
    path: 'user',
    select: 'name'
  })
    
  //const user = await Recipe.findById(req.user.name)

  if(!recipe) {
    res.status(400)
    throw new Error('Recipe not found')
  }

  res.status(200).json(recipe)
})

// @desc Get categories
// @route GET /api/recipes/category/:name
// @access Public

const getCategory = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({categories: req.params.name})
  .populate({
    path: 'user',
    select: 'name'
  })
  if(!recipes) {
    res.status(400)
    throw new Error('Recipes not found')
  }
  res.status(200).json(recipes)
})

// @desc Set recipe
// @route POST /api/recipe
// @access Private

const setRecipe = asyncHandler(async (req, res) => {
  if(!req.body.name && !req.body.instructions) {
    res.status(400)
    throw new Error('Please add name and instruction fields')
  }

  const recipe = await Recipe.create({
    user: req.user.id,
    name: req.body.name,
    instructions: req.body.instructions,
    description: req.body.description,
    ingredients: req.body.ingredients,
    categories: req.body.categories
  })
  res.status(200).json(recipe)
})

// @desc Update recipe
// @route PUT /api/recipe/id
// @access Private

const updateRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id)
  if(!recipe) {
    res.status(400)
    throw new Error('Recipe not found')
  }

  
  // check for user
  if(!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // make sure the logged in user matches the recipe maker
  if (recipe.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }
  console.log(req.body)
  const updatedRecipe = await Recipe.findByIdAndUpdate(
    req.params.id, 
    {
      user: req.user.id,
      name: req.body.name,
      instructions: req.body.instructions,
      description: req.body.description,
      ingredients: req.body.ingredients,
      categories: req.body.categories
    }, 
    {new: true}
  )
  res.status(200).json(updatedRecipe)
})

// @desc Delete recipe
// @route DELETE /api/recipe/id
// @access Private

const deleteRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe){
    res.status(400)
    throw new Error('Recipe not found')
  }
  
  // check for user
  if(!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // make sure the logged in user matches the recipe maker
  if (recipe.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await recipe.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getRecipes,
  getRecipe,
  getCategory,
  setRecipe,
  updateRecipe,
  deleteRecipe
}