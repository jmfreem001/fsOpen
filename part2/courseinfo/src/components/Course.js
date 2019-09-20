import React from 'react';

const Header = ({course}) => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}

const Content = ({parts}) => {

  const rows = () => parts.map(part => 
    <Part 
      key={part.id}
      part={part.name}
      exercise={part.exercises}
    />
  )

  return (
    <div>
      {rows()}        
    </div>
  )

}

const Part = ({part, exercise}) => {
  return (
  <div>
    <p>
      {part} {exercise}
    </p>
  </div> 
  ) 
}

const Total = ({exercises}) => {
  const total = exercises
    .map(part => part.exercises)
    .reduce((total,value) => total + value ) 
  
  return (
    <h4>Total of {total} exercises</h4>
  )
}

const Course = ({name, parts}) => {
  return (
    <div>
      <Header course={name}/>
      <Content parts={parts} />
      <Total exercises={parts} />   
    </div> 
  )
}

export default Course