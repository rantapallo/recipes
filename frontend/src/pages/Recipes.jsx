import {useEffect} from 'react'
//import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {getRecipes, reset} from '../features/recipes/recipeSlice'
import Spinner from '../components/Spinner'
import RecipeItem from '../components/RecipeItem'

function Dashboard() {
  //const navigate = useNavigate()
  const dispatch = useDispatch()

  //const {user} = useSelector((state) => state.auth)
  const {recipes, isLoading, isError, message} = useSelector((state) => state.recipes)

  useEffect(() => {
    if(isError){
      console.log(message)
    }
    dispatch(getRecipes())

    // return a function if needed to do something when component unmounts 
    return () => {
      dispatch(reset())
    }
  }, [isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <h1>Recipes</h1>
      <section className="content">
        {recipes.length > 0 ? (
          <div className="recipes">
            {recipes.map((recipe) => (
              <RecipeItem key={recipe._id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <h3>No recipes</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard