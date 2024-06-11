
import { useEffect } from 'react'
import Blogs from './components/Blogs'
import blogServices from './services/blogs'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogsReducer'
import { useDispatch } from 'react-redux'
import { setUser } from './reducers/loginReducer'
import Forms from './components/Forms'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(initializeBlogs())
  }, [])
  
  useEffect(() => {    
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')    
    if (loggedUserJSON) {      
      const user = JSON.parse(loggedUserJSON)      
      dispatch(setUser(user))    
      blogServices.setToken(user.token)    
    }  
  }, [])

  return (
      <div>
        <h1>Blogs App</h1>
        <Notification />
        <Forms />
        <Blogs />  
      </div>
  )
}

export default App
