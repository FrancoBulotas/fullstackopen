
import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { appendBlog, initializeBlogs } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogServices from '../services/blogs'
import Togglable from './Togglable'
import { useNavigate } from 'react-router-dom'


const BlogForm = () => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
 
  const user = useSelector(state => state.login)
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const navigate = useNavigate()

  const addBlog = async (event) => {
    event.preventDefault()  

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: Math.floor(Math.random()*1000),
      user: user,
      comments: []
    }

    try {
      blogFormRef.current.toggleVisibility()
      const response = await blogServices.create(newBlog)
      dispatch(appendBlog(response))
      dispatch(initializeBlogs())
      navigate('/')
      dispatch(setNotification({message: `a new blog: ${newBlog.title} by ${newBlog.author} added`, error: false}, 5))
    }
    catch (exception) {
      dispatch(setNotification({message: `error:  ${exception.message}`, error: true }, 5))
    }
  }
  
  return (
    <div>
      <Togglable buttonLabel='New blog' ref={blogFormRef}>
        <h2>add a new blog</h2>
        <form onSubmit={addBlog}>
          <div>Tilte: <input
            value={newTitle}
            onChange={event => setNewTitle(event.target.value)}
          /></div>
          <div>Author: <input
            value={newAuthor}
            onChange={event => setNewAuthor(event.target.value)}
          /></div>
          <div>URL: <input
            value={newUrl}
            onChange={event => setNewUrl(event.target.value)}
          /></div>
          <button type="submit">save blog</button>
        </form> 
     </Togglable>
    </div>
  )}

export default BlogForm