import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'


const App = () => {
  const queryClient = useQueryClient()
  const newVoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => queryClient.invalidateQueries({queryKey : ['anecdotes']}) 
  })
  const newAnecMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: () => queryClient.invalidateQueries({queryKey : ['anecdotes']}) 
  })

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ' '
    newAnecMutation.mutate({ content })
  }

  const handleVote = (anecdote) => {
    const newVotesAnec = { ...anecdote, votes: anecdote.votes += 1}
    newVoteMutation.mutate({ newVotesAnec })
  }

  const result = useQuery({    
    queryKey: ['anecdotes'],    
    queryFn: getAnecdotes
  })  
  // console.log(JSON.parse(JSON.stringify(result)))
  
  if ( result.isLoading || result.isError) {    
    return <div>anecdote service not available due to problems in the sever</div>  
  }
  
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm addAnecdote={addAnecdote} />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
