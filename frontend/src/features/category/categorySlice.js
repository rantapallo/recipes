// reducers and initial state
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import categoryService from './categoryService'

const initialState = {
  categories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// get categories
export const getCategories = createAsyncThunk('categories/getAll', async (_, thunkAPI) => {
  try {
    return await categoryService.getCategories()
  } catch (error) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) || 
      error.message || 
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.categories = action.payload.sort(
          (a, b) => {
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
          }
        )
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const {reset} = categorySlice.actions
export default categorySlice.reducer