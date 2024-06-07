import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNewNotification, deleteNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    const anecdotes = useSelector(state => {      
        console.log(state.anecdotes.filter(anec => anec.content.includes(state.filter)))
        return state.anecdotes.filter(anec => anec.content.includes(state.filter))
    })

    const dispatch = useDispatch()
    const newVote = (id, content) => {    
        dispatch(addVote(id))
        
        dispatch(setNewNotification(`You voted ${content}`))

        setTimeout(() => {
            dispatch(deleteNotification(""))
        }, 5000)
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => newVote(anecdote.id, anecdote.content)}>vote</button>
                </div>
            </div>
            )}
        </div>
    )
}

export default AnecdoteList