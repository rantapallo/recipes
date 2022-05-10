import RecipeForm from '../components/RecipeForm'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {useEffect} from 'react'

function AddRecipe() {
  const navigate = useNavigate()

  const {user} = useSelector((state) => state.auth)

  useEffect(() => {
    
    if (!user) {
      navigate('/')
    }
  }, [])
  
  return (
    <div>
      <section className='heading'>
        Add New Recipe
      </section>
      <RecipeForm />
    </div>
  )
}

export default AddRecipe