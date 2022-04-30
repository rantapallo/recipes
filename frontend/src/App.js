import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Recipes from './pages/Recipes'
import Login from './pages/Login'
// import Register from './pages/Register'
import AddRecipe from './pages/AddRecipe'
import RecipeDetails from './pages/RecipeDetails'

function App() {
  return (
    <>
    <Router>
      <div className='container'>
        <Header />
        <Routes>
          <Route path='/' element={<Recipes />} />
          <Route path='/recipes/:id' element={<RecipeDetails />} />
          <Route path='/login' element={<Login />} />
          <Route path='/addrecipe' element={<AddRecipe />} />
          {/* <Route path='/register' element={<Register />} /> */}
        </Routes>
      </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App;
