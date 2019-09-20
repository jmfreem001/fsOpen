import React, { useState, useEffect } from 'react';
import personService from './services/persons'
import './index.css'

const Form = ({newName, newPerson, handleNameChange, newNumber,handleNumberChange }) => {
  return (
    <form onSubmit={newPerson}>
      <div>
        name: <input required
          value={newName}
          onChange={handleNameChange}/>
        <br />
        number: <input required
          value={newNumber}
          onChange={handleNumberChange}
          />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Entry = ({person, setPersons, persons, setMessage, setType}) => {
  const handleDelete = (e) => {
    const id = Number(e.target.dataset.id)
    const selected = persons.filter(person => person.id === id)
    const name = selected[0]['name']
    const confirmed = window.confirm(`Remove ${name}?`)

    if (confirmed){
      personService
        .remove(id)
        .then( () => {
          setPersons(persons.filter(person => person.id !== id)) 
          setType('success')
          setMessage(`Deleted ${name}`)

          setTimeout( () => {
            setMessage(null)
          }, 5000)
        })

        .catch(e => console.log(e.message))
    }

  }
  return (
    <div>
      <p>
        {person.name} {person.number} 
        <button data-id={person.id} onClick={handleDelete}>delete</button> 
      </p>
    </div>
   
  )
    
}

const Numbers = ({persons, filtered, newSearch, setPersons, setMessage, setType}) => {
  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(newSearch.toLowerCase()))
  const searchArray = filtered ? filteredPersons: persons;
  const rows = () => searchArray.map(person => 
    <Entry 
      key={person.name}
      person={person} 
      setPersons={setPersons} 
      persons={persons} 
      setMessage={setMessage}
      setType={setType}
    />)


  if (searchArray.length === 0){
    return (
      <p>No numbers matching those search terms.</p>
    )
  }
  else{
    return (
      rows()
    )
  }

}

const Notification = ({message, type}) => {
  if (message === null){
    return null
  }
  if (type === 'success'){
    return (
      <div className='success'>
        {message}
      </div>
    )
  } else {
    return (
      <div className='error'>
        {message}
      </div>
    )
  }

  
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')  
  const [ filtered, setFiltered ] = useState(false)
  const [ message, setMessage ] = useState(null)
  const [ type, setType ] = useState(null)

  useEffect( () => {
    personService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      }) 
  }, [])

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }
  const handleSearchChange = (e) => {
    setNewSearch(e.target.value)
    setFiltered((e.target.value === '') ? false:true)
  }

  
  const newPerson = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const name = personObject.name
    const number = personObject.number
    const personExists = persons.some(person => person.name === name)

    if (personExists){
      const confirmed = window.confirm(`${name} already in phone book. Replace old number with a new one?`)
      if (confirmed) {
        // post new number
        const  person= persons.find(p => p.name === name)
        const id = person.id
        const changedPerson = {...person, number:number}
        personService
          .update(person.id, changedPerson)
          .then(updatedPerson => setPersons(persons.map(person => person.id !== id ? person: updatedPerson)))
          .catch(e => {
            console.log(e.message)
            setMessage(`Information for ${name} has already been removed from the server`)
            setType('error')
          })
        
        setMessage(`Updated phone number for ${name}`)
        setType('success')
        setTimeout( () => {
          setMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      }
      setNewName('')
      setNewNumber('')
      return
    }
    
    // Create new person in phone book
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setMessage(`Added ${name}`)
        setType('success')
        setTimeout( () => {
          setMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
    }) 


  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} type={type}/>

      <div>
        filter shown with <input 
          value={newSearch}
          onChange={handleSearchChange}/>

      </div>
      <h2>Add New</h2>
      <Form 
        newPerson={newPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Numbers 
        persons={persons}
        filtered={filtered}
        newSearch={newSearch}
        setPersons={setPersons}
        setMessage={setMessage}
        setType={setType}
      />
    </div>
  );
}

export default App;
