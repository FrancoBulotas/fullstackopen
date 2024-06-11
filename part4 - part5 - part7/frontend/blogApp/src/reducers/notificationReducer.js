

import { createSlice, current } from '@reduxjs/toolkit'

const initialState = [
        {   style : 
            {
                width: '100%',
                border: '3px green solid',
                borderRadius: 6,
                color: 'green',
                backgroundColor: 'gray',
                padding: 20,
                marginBottom: 10,
                fontSize: 22,
                display: 'none'
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
            if(action.payload.error){ 
                state[0].style.color = 'red' 
                state[0].style.border = '3px red solid' 
            }
            else { 
                state[0].style.color = 'green' 
                state[0].style.border = '3px green solid' 
            }
            state[0].style.display = 'block'
            state[1].message = action.payload.message
            return state
        },
        deleteNotification(state, action) {
            state[0].style.display = 'none'
            state[1].message = action.payload
            return state
        }
    }

})

export const setNotification = (content, time) => {
    return dispatch => {
        dispatch(setNewNotification(content))
        setTimeout(() => {
            dispatch(deleteNotification())
        }, time * 1000)
    }
}

export const { setNewNotification, deleteNotification } = notificationSlice.actions
export default notificationSlice.reducer