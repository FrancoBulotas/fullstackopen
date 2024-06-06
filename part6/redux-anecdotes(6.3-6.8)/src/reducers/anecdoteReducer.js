const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {

  switch(action.type) {
    case 'VOTE':
      // const newState = state.map(anec => {
      //   if(anec.id !== action.payload){
      //     return anec
      //   }
      //   else {
      //     anec.votes + 1
      //     return anec
      //   }
      // })
      // return newState.sort((a, b) => b.votes - a.votes)
      const anecToChange = state.find(anec => anec.id === action.payload)
      const anecChanged = {
        ...anecToChange, 
        votes : anecToChange.votes + 1
      }
      return state.map(anec => anec.id !== action.payload ? anec : anecChanged).sort((a, b) => b.votes - a.votes)

    case 'NEW_ANEC':
      return [...state, asObject(action.payload)]

    default: return state
  }
}


export const createAnecdote = (content) => {
  return {
    type : 'NEW_ANEC',
    payload : content
  }
}

export const addVote = (id) => {
  return {
    type: 'VOTE',
    payload: id
  }
}
export default anecdoteReducer