import { useState } from 'react'

const Statistics = ({good,neutral,bad}) => {
  const all = good+bad+neutral
  const avg = (good-bad)/all
  const pos = good/all*100
  if(all === 0){
    return(<div><p>No feedback given</p></div>)
  }
  return(  
    <table>
      <tbody>
      <StaticLine text="good" value={good}/>
      <StaticLine text="neutral" value={neutral}/>
      <StaticLine text="bad" value={bad}/>
      <StaticLine text="all" value={all}/>
      <StaticLine text="average" value={avg}/>
      <StaticLine text="positive" value={pos}/>
      </tbody>
    </table>
  )
}

const StaticLine = (props) =>{

  if(props.text === "positive"){
    return(
      <tr><td>{props.text} {props.value} %</td></tr>
    )
    
  }
  return(
      <tr><td>{props.text} {props.value}</td></tr>
  )
}

const Button = (props) =>{
  return(
    <button onClick={props.handelClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good+1)
  const increaseNeutral = () => setNeutral(neutral+1)
  const increaseBad = () => setBad(bad+1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handelClick={increaseGood} text="good"/>
      <Button handelClick={increaseNeutral} text="neutral"/>
      <Button handelClick={increaseBad} text="bad"/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
