import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'


function Header() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
    
  }

  return (
    <header className='header'>
      <div className="logo">
        <Link to='/'>Recipes</Link>
      </div>
      <ul>
        {user ? (
          <>
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
    </header>
  )
}

export default Header