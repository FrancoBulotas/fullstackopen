
import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name : 'anecdotes',
  initialState: [],
  reducers : {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    addVote(state, action) {
      const anecChanged = action.payload
      return state.map(anec => anec.id !== action.payload.id ? anec : anecChanged).sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }

})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anec = await anecdoteService.getAll()
    anec.sort((a,b) => b.votes - a.votes)
    dispatch(setAnecdotes(anec))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnec = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnec))
  }
}

export const addNewVote = (object) => {
  return async dispatch => {
    const anecUpdated = await anecdoteService.update(object)    
    dispatch(addVote(anecUpdated))
  }
}

export const { appendAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer