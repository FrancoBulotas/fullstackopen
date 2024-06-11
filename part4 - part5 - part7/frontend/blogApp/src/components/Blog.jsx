
import { useState } from 'react'
import blogServices from '../services/blogs'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from '../reducers/blogsReducer'

const Blog = (props) => {
    const [visible, setVisible] = useState(false)
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const [amountLikes, setAmountLikes] = useState(props.like)
    const dispatch = useDispatch()

    const toggleVisibility = async () => {
        setVisible(!visible)    
        dispatch(initializeBlogs())
    }

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
            if(window.confirm(`Are you sure you want to delete ${props.title}?`)){
                blogServices.setToken(props.user.token)
                await blogServices.deleteBlog(id)
                dispatch(initializeBlogs())
            }
        }
        catch(exception){
            console.error(exception)
        }
    }

    const buttonVisibility = (text) => (
        <div>{props.title} by {props.author}<button onClick={toggleVisibility}>{text}</button></div>
    )

    return (
        <div>
            <div style={hideWhenVisible}>
                {buttonVisibility('view')}
            </div>
            <div style={showWhenVisible}>
                {buttonVisibility('hide')}
                <div>{props.url}</div>
                <div>{amountLikes}<button onClick={() => addOneLike(props.id)}>like</button></div>
                <div>{props.blogUser.username}</div>
                {
                props.user !== null ? 
                    props.user.username === props.blogUser.username ?
                    <button onClick={() => removeBlog(props.id)}>remove</button> :
                    <div></div> :
                <div></div>
                }
            </div>
        </div>
    )
}

export default Blog