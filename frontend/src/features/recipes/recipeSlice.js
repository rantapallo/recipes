// reducers and initial state
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import recipeService from './recipeService'

const initialState = {
  recipes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// create new recipe
export const createRecipe = createAsyncThunk('recipes/create', async (recipeData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await recipeService.createRecipe(recipeData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// delete recipe
export const deleteRecipe = createAsyncThunk('recipe/delete', async (id, thunkAPI) => {
  try {
    // fetch user token from thunkAPI and pass it to the deleteRecipe function to verify the user
    const token = thunkAPI.getState().auth.user.token
    return await recipeService.deleteRecipe(id, token)
  } catch (error) {
    const message = (error.response && 
        error.response.data && 
        error.response.data.message) || 
      error.message || 
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// get recipes
export const getRecipes = createAsyncThunk('recipes/getAll', async (_, thunkAPI) => {
  try {
    // fetch user token from thunkAPI and pass it to the getRecipes function to verify the user
    //const token = thunkAPI.getState().auth.user.token
    //return await recipeService.getRecipes(token)
    return await recipeService.getRecipes()
  } catch (error) {
    const message = (error.response && 
        error.response.data && 
        error.response.data.message) || 
      error.message || 
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// get recipe
export const getRecipe = createAsyncThunk('recipes/getDetails', async (id, thunkAPI) => {
  try {
    // fetch user token from thunkAPI and pass it to the getRecipes function to verify the user
    //const token = thunkAPI.getState().auth.user.token
    //return await recipeService.getRecipe(id, token)
    return await recipeService.getRecipe(id)
  } catch (error) {
    const message = 'assda'
    /*const message = (error.response && 
        error.response.data && 
        error.response.data.message) || 
      error.message || 
      error.toString()*/
    return thunkAPI.rejectWithValue(message)
  }
})

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRecipe.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // new created recipe
        state.recipes.push(action.payload)
        state.message = action.payload._id
      })
      .addCase(createRecipe.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(getRecipes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getRecipes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.recipes = action.payload
      })
      .addCase(getRecipes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(getRecipe.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getRecipe.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.recipes = action.payload
      })
      .addCase(getRecipe.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(deleteRecipe.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // removing from state removes it from UI, no need for refresh
        state.recipes = state.recipes.filter(
          (recipe) => recipe._id !== action.payload.id
        )
      })
      .addCase(deleteRecipe.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const {reset} = recipeSlice.actions
export default recipeSlice.reducer