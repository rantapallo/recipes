import {useState, useEffect} from 'react'
// useSelector is used to select something from the state, user, isloading, iserror etc
// useDispatch if we want to dispatch a function like register thunk, reset etc
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const {email, password} = formData
  const [errorMsg, setErrorMsg] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {
      email,
      password
    }
    dispatch(login(userData))
  }

  useEffect(() => {
    if (isError){
      setErrorMsg(message)
    }

    if (isSuccess || user){
      navigate('/')
    }

    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h4>
          Login
        </h4>
        {errorMsg && 
          <span className='error-msg'>{errorMsg}</span>
        }
        <section className='form'>
          <form onSubmit={onSubmit}>

            <div className="form-group">
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                name="email" 
                value={email} 
                placeholder="Enter your email" 
                onChange={onChange} />
            </div>

            <div className="form-group">
              <input 
                type="password" 
                className="form-control" 
                id="password" 
                name="password" 
                value={password} 
                placeholder="Enter your password" 
                onChange={onChange} />
            </div>

            <div className="form-group">
              <button type="submit" className='btn btn-block'>
                Submit
              </button>
            </div>
          </form>
        </section>
      </section>
    
    </>
  )
}

export default Login