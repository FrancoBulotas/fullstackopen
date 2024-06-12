
import { useEffect } from 'react'
import Blogs from './components/Blogs'
import blogServices from './services/blogs'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/loginReducer'
import LoginForm  from './components/LoginForm'
import Blog from './components/Blog'
import Menu from './components/Menu'
import Users from './components/Users'
import User from './components/User'
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom'

import { createSelector } from 'reselect';

const selectUsers = state => state.users
const selectFilter = state => 'root'
const selectFilteredUsers = createSelector(
  [selectUsers, selectFilter],
  (users, filter) => {
    return users.filter(user => user.username !== 'root')
  }
)

const App = () => {
  // const users = useSelector(state => state.users.filter(user => user.username !== 'root'))
  const users = useSelector(selectFilteredUsers)
  const blogs = useSelector(state => state.blogs)
  const userLogged = useSelector(state => state.login)
  const dispatch = useDispatch()

  const matchUser = useMatch('/users/:id')  
  const userToShow = matchUser     
    ? users.find(user => user.id === matchUser.params.id)    
    : null
  
  const matchBlog = useMatch('/blogs/:id')  
  const blogToShow = matchBlog     
    ? blogs.find(blog => blog.id === matchBlog.params.id)    
    : null

  useEffect(() => {
      dispatch(initializeBlogs())
      dispatch(initializeUsers())
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
        <Menu />
        <h1>Blogs App</h1>
        <Notification />
        <Routes>
          <Route path='/' element={<Blogs />}></Route>
          <Route path='/blogs/:id' element={<Blog blog={blogToShow} user={userLogged} />}></Route>
          <Route path='/loginForm' element={<LoginForm />}></Route>
          <Route path='/users' element={<Users />}></Route>
          <Route path='/users/:id' element={<User user={userToShow} />}></Route>
        </Routes>
      </div>
  )
}

export default App
