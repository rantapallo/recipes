import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import {getRecipe, deleteRecipe, reset} from '../features/recipes/recipeSlice'
import Spinner from '../components/Spinner';

function RecipeDetails() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const {user} = useSelector((state) => state.auth)
  const {recipes, isLoading, isError, message} = useSelector((state) => state.recipes)
  const {id} = useParams()

  const handleDelete = () => {
    dispatch(deleteRecipe(id))
    setTimeout(() => navigate('/recipes'), 300)
    //navigate('/')
  }

  const handleEdit = () => {
    navigate('/recipes/edit/'+id)
  }

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
    <div className="form-group">
      <div className="heading">{recipes.name}</div>
      <div className='details-description'>
        {recipes.description}
      </div>
      <div className='details-recipe'>
        
        <div className='details-ingredients'>
          <h4>Ingredients</h4>
          {recipes.ingredients && recipes.ingredients.map(ing => (
            <p key={ing._id}>{ing.amount} {ing.ingredient}</p>
          ))}
        </div>
        <div className='details-instructions'>
          <h4>Instructions</h4>
          <p>{recipes.instructions}</p>
        </div>
      </div>
      {recipes.categories && recipes.categories.map(cat => (
        <span key={cat}>{cat} </span>
      ))}
      <div>made by {recipes.user && recipes.user.name}</div>
      <div>created at {new Date(recipes.createdAt).toLocaleString('en-GB', {year: 'numeric', month: 'numeric', day: 'numeric'})}</div>
      {recipes.createdAt !== recipes.updatedAt ? (
        <div>modified at {new Date(recipes.updatedAt).toLocaleString('en-GB', {year: 'numeric', month: 'numeric', day: 'numeric'})}</div>
      ) : ''}
      
      {recipes.user && user && (
        recipes.user._id === user._id ? 
        (<>
        <div className="btn btn-small" onClick={() => handleDelete()}>Delete recipe</div>
        <div className="btn btn-small" onClick={() => handleEdit()}>Edit recipe</div>
        </>) : ''
      )}
    </div>
  )
}

export default RecipeDetails