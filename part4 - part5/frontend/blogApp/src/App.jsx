

import { useState, useEffect, useRef} from 'react'
import Blogs from './components/Blogs'
import blogServices from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm  from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newMessage, setMessage] = useState(null)
  const [newMessageType, setMessageType] = useState(null)
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogServices
      .getAll()
      .then(blogData => {        
        setBlogs(blogData)
      })
  }, [])

  useEffect(() => {    
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')    
    if (loggedUserJSON) {      
      const user = JSON.parse(loggedUserJSON)      
      setUser(user)      
      blogServices.setToken(user.token)    
    }  
  }, [])

  const deleteMessage = () => {
    setTimeout(() => {        
      setMessage(null)      
    }, 5000) 
  }

  const addBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const response = await blogServices.create(newBlog)
      setBlogs(blogs.concat(response))

      setMessage(`a new blog: ${newBlog.title} by ${newBlog.author} added`)   
      deleteMessage()
    }
    catch (exception) {
      setMessage('error: ', exception.message)   
      setMessageType('error')   
      deleteMessage()
    }
  }

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
      setMessage('Wrong credentials')   
      setMessageType('error')   
      deleteMessage() 
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

  const blogForm = () => {
    return (
      <Togglable buttonLabel='New blog' ref={blogFormRef}>
        <BlogForm 
          createBlog={addBlog} 
          user={user}
        ></BlogForm>
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

        <Notification message={newMessage} result={newMessageType} />


        {
        user === null ?
        loginForm() : 
        <div>
          <div>Logged as: {user.name} <button onClick={() => signOut()}>logout</button></div><br />
          {blogForm()}
        </div>
        }

        <h2>blogs</h2>
        <Blogs blogs={blogs} ></Blogs>
        
      </div>
  )
}

export default App
