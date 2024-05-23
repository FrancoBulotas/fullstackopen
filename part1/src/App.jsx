
import { useState } from 'react'

const Header = (props) =>{
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  )
}

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Display = ({text, amount}) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{amount}</td>
      </tr>
    </tbody>
  )
}

const Statictis = (props) => {

  if(props.total == 0){
    return (
      <div>
        <Header text={'statistics'} />
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <Header text={'statistics'} />
      <table>
        <Display text={'good'} amount={props.good} />
        <Display text={'neutral'} amount={props.neutral} />
        <Display text={'bad'} amount={props.bad} />
        <Display text={'total'} amount={props.total} />
        <Display text={'positive'} amount={props.positive} />
      </table>
    </div>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  let positive = [0, ' %'];

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setTotal(total + 1)
  }
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(total + 1)
  } 
  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(total + 1)
  }
  
  if(total>0){
    positive = [good/total, " %"]
  }

  return (
    <div>
      <Header text={'give feedback'} />
      <Button handleClick={handleGoodClick} text={'good'} />
      <Button handleClick={handleNeutralClick} text={'neutral'} />
      <Button handleClick={handleBadClick} text={'bad'} />
      <Statictis good={good} neutral={neutral} bad={bad} total={total} positive={positive} />
    </div>
  )
}

export default App