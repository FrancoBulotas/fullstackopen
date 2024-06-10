import { useState } from 'react'

const BlogForm = ({createBlog,  user}) => {
  
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()  

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: Math.floor(Math.random()*1000),
      user: user
    }

    createBlog(newBlog)
  }
  
  return (
    <div>
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
    </div>
  )}

export default BlogForm