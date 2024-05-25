
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personServices from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newPersonsFilter, setNewPersonsFilter] = useState(persons)
  
  useEffect(() => {
    personServices
      .getAll()
      .then(presonData => {        
        setPersons(presonData)
        setNewPersonsFilter(presonData)
      })
  }, [])

  const addNewPerson = (event) => {
    event.preventDefault()

    const updatedPerson = {
      name: newName,
      number: newNumber
    }

    const nameExist = (persons.find(person => person.name.toLowerCase() === newName.toLowerCase()))
    console.log(nameExist)

    if(nameExist){
      if(window.confirm(`${newName} is already added to phonebook, do you want to update the number?`)){
        personServices
          .update(nameExist.id, updatedPerson)
          .then(personData => {
            personServices
              .getAll()
              .then(presonData => {
                setPersons(presonData)
                setNewPersonsFilter(presonData)
              })
          })
      }
    }
    else{
      personServices
      .create(updatedPerson)
      .then(personData => {
        setPersons(persons.concat(personData))
        setNewPersonsFilter(newPersonsFilter.concat(personData))
      })
    }

    setNewName('')
    setNewNumber('')
    setNewFilter('')
  }

  const deleteOnePerson = (id) => {

    personServices
      .deletePerson(id)
      .then(data => {
        console.log(`${id} eliminado correctamente`)
        setPersons(persons.filter(person => person.id !== id))
        setNewPersonsFilter(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        alert(`${id} was already deleted from server`)
        console.error('error', error)
      })
  }


  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) =>{
    const newFilterValue = event.target.value
    setNewFilter(newFilterValue)

    let namesFiltred = persons.filter(person => person.name.toLowerCase().includes(newFilterValue.toLowerCase()))
    setNewPersonsFilter(namesFiltred)
  }
  
  return (
    <div>
      <h1>Phonebook</h1>

      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h2>Add a new</h2>

      <PersonForm addNewPerson={addNewPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      
      <Persons newPersonsFilter={newPersonsFilter} deletePerson={deleteOnePerson} />

    </div>
  )
}

export default App
