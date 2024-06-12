
import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducers/blogsReducer'
import loginReducer from './reducers/loginReducer'
import notificationReducer from './reducers/notificationReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    users: usersReducer,
    login : loginReducer,
    notification : notificationReducer
  }
})

export default store