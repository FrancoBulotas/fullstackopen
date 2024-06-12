
import { useState} from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import Togglable from './Togglable'
import loginService from '../services/login'
import blogServices from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/loginReducer'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('') 

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (event) => {    
    event.preventDefault()  

    try {      
      const user = await loginService.login({        
        username, password,      
      })    

      window.localStorage.setItem(        
        'loggedBlogAppUser', JSON.stringify(user)      
      ) 
  
      blogServices.setToken(user.token)
      dispatch(setUser(user))     
      navigate('/')
      setUsername('')      
      setPassword('')    
    } 
    catch (exception) {  
      console.log(exception)    
      dispatch(setNotification({message:'Wrong credentials', error: true }, 5))
    }
      
  }

  return (
  <div>
    {/* <Togglable buttonLabel='Login'> */}
      <h2>Login</h2>
      <form onSubmit={handleLogin}>    
        <div>          
          username            
          <input            
            type="text"            
            value={username}            
            name="Username"            
            onChange={({ target }) => setUsername(target.value)}          
          />        
        </div>        
        <div>          
          password            
          <input            
            type="password"            
            value={password !== undefined ? password : ''}            
            name="Password"            
            onChange={({ target }) => setPassword(target.value)}          
          />        
        </div>        
        <button type="submit">login</button>      
      </form>
    {/* </Togglable> */}
  </div>
  )}

// LoginForm.propTypes = {
//   handleLogin: PropTypes.func.isRequired,
//   setPassword: PropTypes.func.isRequired,
//   setUsername: PropTypes.func.isRequired,
//   username: PropTypes.string.isRequired,
//   password: PropTypes.string.isRequired
// }

export default LoginForm