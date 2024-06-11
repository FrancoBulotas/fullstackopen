
import LoginForm  from './LoginForm'
import BlogForm from './BlogForm'
import { setUser } from '../reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'

const Forms = () => {
    const user = useSelector(state => state.login)
    const dispatch = useDispatch()
    
    const signOut = () => {
        window.localStorage.clear()
        dispatch(setUser(null))
      }

    return (
        <div>
            {
                user === null ?
                <LoginForm /> : 
                <div>
                    <div>Logged as: {user.name} <button onClick={() => signOut()}>logout</button></div><br />
                    {<BlogForm />}
                </div>
            }
        </div>
    )
}

export default Forms