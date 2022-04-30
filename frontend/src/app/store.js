import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import recipeReducer from '../features/recipes/recipeSlice'
import categoryReducer from '../features/category/categorySlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipeReducer,
    categories: categoryReducer
  },
});
