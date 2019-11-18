import React from 'react'

const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => s += p.exercises, 0)
  return (
    <div>
      <strong>total of {total} exercises</strong>
    </div>
  )
}

const Part = ({ part, exercises }) => <div><p>{part} {exercises}</p></div>

const Content = ({ parts }) => {
  const row = () => 
    parts.map((e) => 
      <Part key={e.id} part={e.name} exercises={e.exercises} />
    )
  
  return (
    <div>
      {row()}
    </div>
  )
}

const Header = ({ course }) => <div><h3>{course.name}</h3></div>

const Course = ({ course }) =>  (
  <div>
   <Header course={course} />
   <Content parts={course.parts} />
   <Total parts={course.parts} />
  </div>
)

export default Course