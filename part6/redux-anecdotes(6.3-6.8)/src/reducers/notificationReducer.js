
import { createSlice, current } from '@reduxjs/toolkit'

const initialState = [
        {   style : 
            {
                display : 'none',
                border: 'solid',
                padding: 10,
                borderWidth: 1
            }
        }, 
        {   
            message : ''
        }]

const notificationSlice = createSlice({
    name : 'notification',
    initialState,
    reducers : {
        setNewNotification(state, action){
            state[0].style.display = 'block'
            state[1].message = action.payload
            return state
        },
        deleteNotification(state, action) {
            state[0].style.display = 'none'
            state[1].message = action.payload
            return state
        }
    }

})

export const { setNewNotification, deleteNotification } = notificationSlice.actions
export default notificationSlice.reducer