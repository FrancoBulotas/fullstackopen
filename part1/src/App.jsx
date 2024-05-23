import { useState } from 'react'

const Header = (props) => {
  return(
    <div>
      <h1>{props.text}</h1>
    </div>
  )
}

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>
let points = []

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  if (points.length === 0){
    points = Array(anecdotes.length).fill(0)
  }
  
  let maxIndexOfPoints = points.indexOf(Math.max(...points))

  const [selected, setSelected] = useState(0)

  const handleVoteClick = () =>{        
    points[selected] += 1  
  }

  const handleRandomClick = () => {
    const updatedSelected = Math.floor(Math.random() * anecdotes.length)
    setSelected(updatedSelected)    
  }
  
  return (
    <div>
      <Header text={'Anecdote of the day'} />
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <Button handleClick={handleVoteClick} text={'vote'} />
      <Button handleClick={handleRandomClick} text={'next anecdote'} />
      <Header text={'Anecdote with most votes'} />
      <div>{anecdotes[maxIndexOfPoints]}</div>
      <div>has {points[maxIndexOfPoints]} votes</div>
    </div>
  )
}

export default App