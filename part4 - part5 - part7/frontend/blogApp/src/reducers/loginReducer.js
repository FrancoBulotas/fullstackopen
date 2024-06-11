
import { createSlice, current } from '@reduxjs/toolkit'
import loginService from '../services/login'


const loginSlice = createSlice({
    name : 'login',
    initialState: null,
    reducers : {
        setNewUser(state, action) {
            return action.payload
        }
    }
})

export const setUser = (input) => {
    return dispatch =>  {
        dispatch(setNewUser(input))
    }
}

export const { setLogin, setNewUser } = loginSlice.actions
export default loginSlice.reducer