import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'
import {GiNoodles} from 'react-icons/gi'


function Nav() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
    
  }

  return (
    <nav className='nav'>
      <div className="logo">
        <Link to='/'>
          Recipes
          <GiNoodles />
        </Link>
        
      </div>
      <ul>
        {user ? (
          <>
          <li>
            <Link to='/recipes'>
              Recipes
            </Link>
          </li>
          <li>
            <Link to='/addrecipe'>
              Add Recipe
            </Link>
          </li>
          <li>
            <div className="logout" onClick={onLogout}>
              Logout
            </div>
          </li>
          </>
        ) : (
          <>
          <li>
            <Link to='/recipes'>
              Recipes
            </Link>
          </li>
          <li>
            <Link to='/login'>
              Login
            </Link>
          </li>
          {/* <li>
            <Link to='/register'>
              Register
            </Link>
          </li> */}
          </>
        )}
          
        
        
      </ul>
    </nav>
  )
}

export default Nav