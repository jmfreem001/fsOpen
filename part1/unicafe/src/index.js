import React, {useState} from 'react';
import ReactDOM from 'react-dom';

// Need a Header that says give feedback
//Need 3 buttons that add one to good bad or neutral
// Need a header that says statistics

// Display text and then the coutn that relates to text.
const Header = ({title}) => <h3>{title}</h3>
const Button = ({text, clickHandler}) => <button onClick={clickHandler}>{text}</button>
const Statisitic = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td> 
    </tr>
  )
}

const Statistics = ({good, bad, neutral}) => {
  // Total Feedback
  const total = good + bad + neutral
  // Positive feedback
  const positive = (good/total) * 100
  // average between 1 and -1 
  const average = (good - bad) / total
  if (total === 0) {
    return (
      <div>
        <Header title='Statistics' />
        <p>No Feedback provided. </p>
      </div>
    )
  }
  return (
    <div>
      <Header title='Statistics' />
      <table>
        <tbody>
          <Statisitic text='good' value={good} />
          <Statisitic text='neutral' value={neutral} />
          <Statisitic text='bad' value={bad} />
          <Statisitic text='all' value={total} />
          <Statisitic text='average' value={average} />
          <Statisitic text='positive' value={`${positive} %`} />
        </tbody>
      </table>
    </div>  
  )
}


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const addOne = (value, setValue) => () => setValue(value + 1)

  return (
    <div>
      <div>
        <Header title='Feedback' />
        <Button text='good' clickHandler={addOne(good, setGood)} />
        <Button text='neutral' clickHandler={addOne(neutral, setNeutral)} />
        <Button text='bad' clickHandler={addOne(bad, setBad)} />
      </div>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

