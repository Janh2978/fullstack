import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Anecdote = ({anecdote, votes}) => <><div>{anecdote}</div><div>has {votes} votes</div></>

const App = ({anecdotes}) => {    
  const [selected, setSelected] = useState(0)
  const [first, setFirst] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const next = () => 
    setSelected(
      Math.floor(Math.random() * (anecdotes.length))
    )

  const vote = () => {
    let copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  useEffect(() => {    
    setFirst(points.reduce((indexMax, element, index, points) => 
      element > points[indexMax] ? index : indexMax
    , 0))
  }, [points])

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={points[selected]} />
      <Button handleClick={vote} text={'vote'}/>
      <Button handleClick={next} text={'next anecdote'}/>      
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={anecdotes[first]} votes={points[first]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)