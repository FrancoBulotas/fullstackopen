
import LoginForm  from './LoginForm'
import BlogForm from './BlogForm'
import { setUser } from '../reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'

const Forms = () => {
    const user = useSelector(state => state.login)
    const dispatch = useDispatch()

    return (
        <div>
            <div>Logged as: {user.name} <button onClick={() => signOut()}>logout</button></div>
            {
                user === null ?
                <LoginForm /> :  
                <BlogForm />
            }
        </div>
    )
}

export default Forms