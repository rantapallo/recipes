import axios from 'axios'


const API_URL = '/api/recipes/'

// create new recipe
const createRecipe = async(recipeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(API_URL, recipeData, config)
  return response.data
}

// edit recipe
const editRecipe = async(recipeData, token) => {
  let recipeId = recipeData._id
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  
  const response = await axios.put(API_URL + recipeId, recipeData, config)
  return response.data
}

// get recipes
const getRecipes = async() => {
  
  const response = await axios.get(API_URL)
  return response.data
}

// get recipe
const getRecipe = async(recipeId) => {

  const response = await axios.get(API_URL + recipeId)
  return response.data
}

// delete recipe
const deleteRecipe = async(recipeId, token) => {
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.delete(API_URL + recipeId, config)
  return response.data
}


const recipeService = {
  createRecipe,
  editRecipe,
  getRecipes,
  getRecipe,
  deleteRecipe
}

export default recipeService