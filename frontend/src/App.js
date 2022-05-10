import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Nav from './components/Nav'
import Recipes from './pages/Recipes'
import Login from './pages/Login'
// import Register from './pages/Register'
import AddRecipe from './pages/AddRecipe'
import Home from './pages/Home'
import ModifyRecipe from './pages/ModifyRecipe'
import RecipeDetails from './pages/RecipeDetails'

function App() {
  return (
    <>
    <Router>
      <div className='container'>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/recipes' element={<Recipes />} />
          <Route path='/recipes/:id' element={<RecipeDetails />} />
          <Route path='/recipes/edit/:id' element={<ModifyRecipe />} />
          <Route path='/login' element={<Login />} />
          <Route path='/addrecipe' element={<AddRecipe />} />
          {/* <Route path='/register' element={<Register />} /> */}
        </Routes>
      </div>
      </Router>
    </>
  )
}

export default App;
