import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {random} from 'lodash';

const Vote = ({selected, points}) =><p>has {points[selected]} votes</p>

const Button = ({clickHandler, text}) => <button onClick={clickHandler}>{text}</button>

const Header = ({text}) => <h1>{text}</h1>

const App = ({anecdotes, length}) => {

  const getRandomItem = () => random(0, (length-1))
  const nextAnecdote = () => setSelected(getRandomItem())

  const addVote = () => {
    let updatedPoints = [...points]
    updatedPoints[selected] += 1
    setPoints(updatedPoints)
  }

  const [selected, setSelected] = useState(getRandomItem())
  const [points, setPoints] = useState(new Array(length).fill(0))

  // Find highest value and then find the index where highest value is. 
  const maxValue = points.reduce( (max,b) => Math.max(max,b))
  const max = points.indexOf(maxValue)


  return (
    <div>
      <Header text="Anecdote of the day" />
      <p>{anecdotes[selected]}</p>
      <Vote selected={selected} points={points} />
      <Button clickHandler={addVote} text='vote' />
      <Button clickHandler={nextAnecdote} text='next anecdote'/>
      <Header text="Anecdote with most votes" />
      <p>{anecdotes[max]}</p>
      <Vote selected={max} points={points}/>
      
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


ReactDOM.render(<App anecdotes={anecdotes} length={anecdotes.length}/>, document.getElementById('root'));


