
import { createSlice, current } from '@reduxjs/toolkit'
import blogService from '../services/blogs'


const blogSlice = createSlice({
  name : 'blogs',
  initialState: [],
  reducers : {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    addLike(state, action) {
      const blogChanged = action.payload
      console.log(blogChanged)
      return state.map(blog => blog.id !== action.payload.id ? blog : blogChanged).sort((a, b) => b.likes - a.likes)
    },
    // getLikes(state, action){
    //   console.log(action.payload.id)
    //   return action.payload.id
    // },
    setBlogs(state, action) { 
      return action.payload
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    blogs.sort((a,b) => b.likes - a.likes)
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const addNewLike = (id, object) => {
  return async dispatch => {
    const blogUpdated = await blogService.update(id, object)    
    dispatch(addLike(blogUpdated))
  }
}

export const getAmountLikes = async (id) => {

    const blog = await blogService.getById(id)
    console.log(blog.likes)
    return blog.likes
  
}


export const { appendBlog, addLike, setBlogs, getLikes } = blogSlice.actions
export default blogSlice.reducer