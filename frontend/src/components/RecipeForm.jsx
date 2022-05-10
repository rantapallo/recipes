import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createRecipe, editRecipe, reset} from '../features/recipes/recipeSlice'
import {getCategories} from '../features/category/categorySlice'
import {TiDeleteOutline} from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'

function RecipeForm({recipe, recipeid}) {
  const [name, setName] = useState('')
  const [instructions, setInstructions] = useState('')
  const [ingredient, setIngredient] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [ingredientList, setIngredientList] = useState([])
  const [category, setCategory] = useState([])
  const [categoryValue, setCategoryValue] = useState({})
  const [errorMsg, setErrorMsg] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [isChanged, setIsChanged] = useState(false)


  const {categories} = useSelector((state) => state.categories)
  //const {isSuccess, isError, message} = useSelector((state) => state.recipes)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addIngredient = (e) => {
    e.preventDefault()
    setIngredientList(prevState => [...prevState, {amount, ingredient}])
    setAmount('')
    setIngredient('')
  }

  const removeIngredient = (e, id) => {
    e.preventDefault()
    const temp = [...ingredientList];
    temp.splice(id, 1);
    setIngredientList(temp);
  }

  const removeCategory = (e, id) => {
    e.preventDefault()
    const temp = [...category];
    temp.splice(id, 1);
    setCategory(temp);
  }

  const handleSelect = (option) => {
    if (option !== 'default') {
      setCategory(prevState => [...prevState, option])
      setCategoryValue({selected: option})
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (name !== '' && instructions !== '') {
      const submitData = {
        name,
        description,
        instructions,
        ingredients: ingredientList,
        categories: category
      }
      if(isEdit){
        submitData['_id'] = recipeid
        //console.log(submitData)
        dispatch(editRecipe(submitData))
      } else {
        dispatch(createRecipe(submitData))
      }
      setTimeout(() => navigate('/recipes'), 300)
    } else {
      setErrorMsg('Please add name and instruction fields')
    }
  }

  const fillRecipeData = (recipe) => {
    setName(recipe.name)
    setDescription(recipe.description)
    setInstructions(recipe.instructions)
    recipe.categories.forEach((cat) => {
      setCategory(prevState => [...prevState, cat])
    })
    recipe.ingredients.forEach((ing) => {
      setIngredientList(prevState => [...prevState, {amount: ing['amount'], ingredient: ing['ingredient']}])
    })
  }

  useEffect(() => {
    //setName(recipe.name)
    if(!isChanged && Object.prototype.toString.call(recipe) === '[object Object]'){
      //setTimeout(() => setIsEdit(true), 300)
      setIsEdit(true)
      setIsChanged(true)
      fillRecipeData(recipe)
    }
  }, [recipe])

  useEffect(() => {
    dispatch(getCategories())
    return () => {
      dispatch(reset())
    }
    

  }, [dispatch])
  return (
    <section className='form'>
      {errorMsg && 
        <span className='error-msg'>{errorMsg}</span>
      }
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Recipe name</label>
          <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input 
            type="text" 
            name="description" 
            id="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </div>

        <div className="form-group item-list">
        {ingredientList.map((ing, idx) => (
          <div key={idx} className="item-list-item">
            <span>{ing.amount} {ing.ingredient}</span>
            <span onClick={(e) => removeIngredient(e, idx)} className="remove-item"><TiDeleteOutline /></span>
          </div>
        ))}
        </div>

        <div className="form-group ingredients">
          <div className="amount">
          <label htmlFor="amount">Amount</label>
          <input 
            type="text" 
            name="amount" 
            id="amount" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
          />
          </div>
          <div className="ingredient">
          <label htmlFor="ingredient">Ingredient</label>
          <input type="text" 
            
            name="ingredient" 
            id="ingredient" 
            value={ingredient} 
            onChange={(e) => setIngredient(e.target.value)} 
          />
          </div>
        </div>
        <div className="form-group">
          <button className="btn btn-block" onClick={addIngredient}>Add ingredient</button>
        </div>

        <div className="form-group">
          <label htmlFor="instructions">Instructions</label>
          <textarea 
            name="instructions" 
            id="instructions" 
            value={instructions} 
            onChange={(e) => setInstructions(e.target.value)} 
          />
        </div>

        <div className="form-group item-list">
        {category.map((cat, idx) => (
          <div key={cat} className="item-list-item">
            <span>{cat}</span>
            <span onClick={(e) => removeCategory(e, idx)} className="remove-item"><TiDeleteOutline /></span>
          </div>
        ))}
        </div>
        <div className="form-group">
          <select name="category" id="category" value={categoryValue} onChange={(e) => handleSelect(e.target.value)}>
            <option value="default">
              Choose a category
            </option>
            {categories && categories.map(option => (
              <option key={option.name} value={option.name}>{option.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">{isEdit ? 'Edit' : 'Add'} Recipe</button>
        </div>
      </form>
    </section>
  )
}

export default RecipeForm