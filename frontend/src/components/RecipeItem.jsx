import { Link } from 'react-router-dom'

function RecipeItem({recipe}) {
  return (
    <>
      <Link to={`/recipes/${recipe._id}`}>
        <div className="recipe">    
          <h2>{recipe.name}</h2>
        </div>
      </Link>
    </>
  )
}

export default RecipeItem