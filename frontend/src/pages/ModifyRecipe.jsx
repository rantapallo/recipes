import RecipeForm from '../components/RecipeForm'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getRecipe, reset } from '../features/recipes/recipeSlice'
import { useEffect } from 'react'
import Spinner from '../components/Spinner';

function ModifyRecipe() {
  const dispatch = useDispatch()
  
  const {user} = useSelector((state) => state.auth)
  const {recipes, isLoading, isError, message} = useSelector((state) => state.recipes)
  const {id} = useParams()

  useEffect(() => {
    

    if(isError){
      console.log(message)
    }
    dispatch(getRecipe(id))

    // return a function if needed to do something when component unmounts 
    return () => {
      dispatch(reset())
    }
  }, [user, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }
  
  return (
    <div>
      <section className='heading'>
        Edit Recipe
      </section>
      {recipes &&
        <RecipeForm recipe={recipes} recipeid={id} />
      }
      
    </div>
  )
}

export default ModifyRecipe