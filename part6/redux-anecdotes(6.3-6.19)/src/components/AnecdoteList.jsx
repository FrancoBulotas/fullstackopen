
import { createSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux'
import { addNewVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const selectAnecdotes = state => state.anecdotes
// Selector para obtener el estado del filtro
const selectFilter = state => state.filter
// Selector memoizado para filtrar anécdotas basadas en el filtro
const selectFilteredAnecdotes = createSelector(
  [selectAnecdotes, selectFilter],
  (anecdotes, filter) => {
    return anecdotes.filter(anec => anec.content.includes(filter))
  }
);

const AnecdoteList = () => {
    const anecdotes = useSelector(selectFilteredAnecdotes)
    const dispatch = useDispatch()
    
    const newVote = (id, content, votes) => {    
        dispatch(addNewVote({ id, content, votes: votes + 1 }))
        dispatch(setNotification(`You voted ${content}`, 5))
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
                    <button onClick={() => newVote(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
                </div>
            </div>
            )}
        </div>
    )
}

export default AnecdoteList