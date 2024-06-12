
import { useState } from 'react'
import blogServices from '../services/blogs'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from '../reducers/blogsReducer'
import { useNavigate } from 'react-router-dom'

const Blog = ({blog, user}) => {

    if(!user || !blog) {
        return null
    }
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [amountLikes, setAmountLikes] = useState(blog.likes)
    const [comment, setComment] = useState('')

    const addOneLike = async (id) => {
        try{
            const response = await blogServices.update(id, {"likes" : amountLikes + 1})
            setAmountLikes(response.likes)
            dispatch(initializeBlogs())
        }
        catch(exception){
            console.error(exception)
        }
    }

    const removeBlog = async (id) => {
        try {
            if(window.confirm(`Are you sure you want to delete ${blog.title}?`)){
                blogServices.setToken(user.token)
                await blogServices.deleteBlog(id)
                navigate('/')
                dispatch(initializeBlogs())
            }
        }
        catch(exception){
            console.error(exception)
        }
    }

    const addComment = async (e) => {
        e.preventDefault()

        try{
            await blogServices.update(blog.id, {"comments": blog.comments.concat(comment)})
            setComment('')
            dispatch(initializeBlogs())
        }
        catch(exception){
            console.error('error: ', exception)
        }

    }

    return (
        <div>
            <h2>{blog.title}</h2>
            <div>{blog.url}</div>
            <div>{amountLikes}<button onClick={() => addOneLike(blog.id)}>like</button></div>
            <div>{blog.user.username}</div>
            {
            blog.user !== null ? 
                user.username === blog.user.username ?
                <button onClick={() => removeBlog(blog.id)}>remove</button> :
                <div></div> :
            <div></div>
            }
            <br />
            <h3>comments</h3>
            <form onSubmit={addComment} style={{display: 'flex'}}>
                <div><input value={comment} onChange={event => setComment(event.target.value)} /></div>
                <button type='sumbit'>add comment</button>
            </form>
            <ul>
                {blog.comments.map((comment, i) => 
                    <li key={i}>{comment}</li>
                )}                
            </ul>
            
        </div>
    )
}

export default Blog