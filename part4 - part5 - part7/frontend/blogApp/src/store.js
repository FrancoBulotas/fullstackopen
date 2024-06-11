
import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducers/blogsReducer'
import loginReducer from './reducers/loginReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    login : loginReducer,
    notification : notificationReducer
  }
})

export default store