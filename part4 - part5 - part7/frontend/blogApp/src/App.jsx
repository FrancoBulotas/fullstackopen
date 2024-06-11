

import { useState, useEffect} from 'react'
import Blogs from './components/Blogs'
import blogServices from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm  from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { useDispatch } from 'react-redux'


const App = () => {
  // const [blogss, setBlogs] = useState([])
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  // const blogFormRef = useRef()

  useEffect(() => {
      dispatch(initializeBlogs())
  }, [])
  

  useEffect(() => {    
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')    
    if (loggedUserJSON) {      
      const user = JSON.parse(loggedUserJSON)      
      setUser(user)      
      blogServices.setToken(user.token)    
    }  
  }, [])

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
      setUser(user)      
      setUsername('')      
      setPassword('')    
    } 
    catch (exception) {  
      console.log(exception)    
      dispatch(setNotification({message:'Wrong credentials', error: true }, 5))
    }
      
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='Login'>
        <LoginForm
          username={username}
          password={password}
          setPassword={setPassword}
          setUsername={setUsername}
          handleLogin={handleLogin}
        />
      </Togglable>       
    )
  }

  const signOut = () => {
    window.localStorage.clear()
    setUser(null)
  }

  return (
      <div>
        <h1>Blogs App</h1>

        <Notification />

        {
        user === null ?
        loginForm() : 
        <div>
          <div>Logged as: {user.name} <button onClick={() => signOut()}>logout</button></div><br />
          {<BlogForm user={user} />}
        </div>
        }

        <Blogs user={user} />  
      </div>
  )
}

export default App
