

import { useState, useEffect} from 'react'
import Blogs from './components/Blogs'
import blogServices from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm  from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const [newMessage, setMessage] = useState(null)
  const [newMessageType, setMessageType] = useState(null)
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

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
      blogServices.setToken(user.token)    }  }, [])

  const addBlog = async (event) => {
    event.preventDefault()  

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: Math.floor(Math.random()*1000),
      user: user
    }

    try {
      const response = await blogServices.create(newBlog)
      setBlogs(blogs.concat(response))

      setMessage(`a new blog: ${newBlog.title} by ${newBlog.author} added`)   
      setTimeout(() => {        
        setMessage(null)      
      }, 5000) 
      
    }
    catch (exception) {
      setMessage(exception.message)   
      setMessageType('error')   
      setTimeout(() => {        
        setMessage(null)      
      }, 5000) 
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
    } catch (exception) {      
      setMessage('Wrong credentials')   
      setMessageType('error')   
      setTimeout(() => {        
        setMessage(null)      
      }, 5000)    
    }
      
  }

  const handleNewTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleNewAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleNewUrlChange = (event) => {
    setNewUrl(event.target.value)
  }


  return (
      <div>
        <h1>Blogs App</h1>

        <Notification message={newMessage} result={newMessageType} />

        { user === null ? 
          <LoginForm handleLogin={handleLogin} username={username} password={password} setPassword={setPassword} setUsername={setUsername} ></LoginForm> : 
          <div>
            <p>Logged as: {user.name}</p>
            {<BlogForm addBlog={addBlog} 
              newTitle={newTitle} handleNewTitleChange={handleNewTitleChange} 
              newAuthor={newAuthor} handleNewAuthorChange={handleNewAuthorChange}
              newUrl={newUrl} handleNewUrlChange={handleNewUrlChange}
            ></BlogForm>}
          </div> 
        }

        <h2>blogs</h2>
        <Blogs blogs={blogs} ></Blogs>
      </div>
  )
}

export default App
