import React from 'react'

const Person = ({person, handleDelete}) => (
  <div>
    {person.name} {person.number}
    <button onClick={() => handleDelete(person)}>delete</button>
  </div>
)

const Persons = ({ persons, showAll, selected, handleDelete }) => 
  showAll
  ? persons.map((person) => (
    <Person key={person.id} person={person} handleDelete={handleDelete}/>
  ))
  : persons.filter((person) => 
    person.name.toLowerCase().includes(selected)
  ).map((person) => (
    <Person key={person.id} person={person} handleDelete={handleDelete}/>
  ))

export default Persons