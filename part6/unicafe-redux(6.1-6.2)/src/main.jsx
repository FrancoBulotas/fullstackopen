import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const buttonForStats = (actionType) => {
    store.dispatch({
      type: actionType
    })
  }
  
  return (
    <div>
      <button onClick={() => buttonForStats('GOOD')}>good</button> 
      <button onClick={() => buttonForStats('OK')}>ok</button> 
      <button onClick={() => buttonForStats('BAD')}>bad</button>
      <button onClick={() => buttonForStats('ZERO')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
