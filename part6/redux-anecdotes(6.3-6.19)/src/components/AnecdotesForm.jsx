
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNewNotification, deleteNotification } from '../reducers/notificationReducer'

const AnecdotesForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

        dispatch(createAnecdote(content))
        dispatch(setNewNotification(`Added ${content}`))

        setTimeout(() => {
            dispatch(deleteNotification(""))
        }, 5000)
    }

    return ( 
    <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <div><input name='anecdote' /></div>
            <button type='submit'>create</button>
        </form>
    </div>
    )
}

export default AnecdotesForm