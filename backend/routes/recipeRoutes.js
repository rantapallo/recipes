const express = require('express');
const router = express.Router();
const { getRecipes, getRecipe, getCategory, setRecipe, updateRecipe, deleteRecipe } = require('../controllers/recipeController')

const {protect} = require('../middleware/authMiddleware')

//router.route('/').get(getGoals).post(setGoal) // shorter version

//router.get('/', protect, getRecipes);
router.get('/', getRecipes);
router.get('/:id', getRecipe);
router.get('/category/:name', getCategory);
router.post('/', protect, setRecipe)
router.put('/:id', protect, updateRecipe)
router.delete('/:id', protect, deleteRecipe)

module.exports = router