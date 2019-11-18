import React, { useState, useEffect } from 'react'

import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [selected, setSelected] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personsService
    .getAll()
    .then(returnedPersons => {
      setPersons(returnedPersons)
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newObject = {
      name: newName,
      number: newNumber
    }
    const filteredPersons = persons.filter(person => 
      person.name.toLowerCase().includes(newName.toLowerCase())
    )

    if(filteredPersons.length > 0){
      const registeredPerson = filteredPersons[0]
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const message = { 
          text: `Updated ${registeredPerson.name}`, 
          type: 'success'
        }
        personsService
        .update(registeredPerson.id, { ...newObject, name: registeredPerson.name })
        .then(returnedPerson=>{
          setPersons(persons.map(person => 
            person.id !== returnedPerson.id 
            ? person 
            : {...person, number: returnedPerson.number})
          )
          setNewName('')
          setNewNumber('')
          setMessage(message)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      }
    } else {
      personsService
      .create(newObject)
      .then(newPerson => {
        const message = { 
          text: `Added ${newPerson.name}`, 
          type: 'success' 
        }
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
        setMessage(message)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }      
  }

  const handleChange = (e) => 
    setNewName(e.target.value)
  
  const handleChangeNumber = (e) => 
    setNewNumber(e.target.value)

  const handleChangeFilter = (e) => {
    setSelected(e.target.value)
    e.target.value.length === 0
    ? setShowAll(true) 
    : setShowAll(false)
  }

  const handleDelete = (personObject) => {
    if(window.confirm(`Delete ${personObject.name}`)){
      personsService
      .deletePerson(personObject.id)
      .catch(err => {
        const message = { 
          text: `Information of ${personObject.name} has already been removed from server`, 
          type: 'error' 
        }
        setMessage(message)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      const newPersons = persons.filter((person) => person.id !== personObject.id)
      setPersons(newPersons)
    }
  }
     
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter
        handleChangeFilter={handleChangeFilter}
        selected={selected}
      />

      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        newName={newName}
        handleChangeNumber={handleChangeNumber}
        newNumber={newNumber}
      />

      <h3>Numbers</h3>
      <Persons
        persons={persons}
        showAll={showAll}
        selected={selected}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App