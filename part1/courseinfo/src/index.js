import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  console.log(props.parts[0]['name'])
  return (
    <div>

        <Part part={props.parts[0]['name']} exercise={props.parts[0]['exercises']} />
        <Part part={props.parts[1]['name']} exercise={props.parts[1]['exercises']} />
        <Part part={props.parts[2]['name']} exercise={props.parts[2]['exercises']} />
    </div>
  )

}

const Part = (props) => {
  return (
  <div>
    <p>
      {props.part} {props.exercise}
    </p>
  </div> 
  ) 
}

const Total = (props) => {
  return (
  <div>
    <p>
      Number of exercises {props.exercises
          .map(part => part.exercises)
          .reduce((total,value) => total + value )} 
    </p>
  </div>
  )
}

const App = () => {
  const course = {
  name:'Half stack application development',
  parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name:'Using props to pass data',
      exercises: 7
    },
    {
      name:'State of a component',
      exercises: 14
    }
  ]
}

  return (
    <>
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total exercises={course.parts} />              
     </>
  )
}


ReactDOM.render(<App />, document.getElementById('root'));


