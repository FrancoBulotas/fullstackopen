
// import { useState } from 'react'
// import Note from './components/Note'


// const App = (props) => {
//   const [notes, setNotes] = useState(props.notes)
//   const [newNote, setNewNote] = useState('a new note...') 
//   const [showAll, setShowAll] = useState(true)

//   const addNote = (event) => {
//     event.preventDefault()
//     const noteObject = {
//       content: newNote,
//       important: Math.random() < 0.5,
//       id: notes.length + 1,
//     } 

//     setNotes(notes.concat(noteObject))
//     setNewNote('')
//   }

//   const handleNoteChange = (event) => {
//    setNewNote(event.target.value)  
//   }

  
//   const notesToShow = showAll ? notes : notes.filter(note => note.important)

//   return (
//     <div>
//       <h1>Notes</h1>
//       <div>
//           <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
//       </div>
//       <ul>
//         {notesToShow.map(note =>
//           <Note key={note.id} note={note} />
//         )}
//       </ul>
//       <form onSubmit={addNote}>
//         <input value={newNote} onChange={handleNoteChange} />
//         <button type="submit">save</button>
//       </form>
//     </div>
//   )
// }

// export default App 
import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newPersonsFilter, setNewPersonsFilter] = useState(persons)

  const addNewPerson = (event) =>{
    event.preventDefault()

    const updatedPerson = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }

    const namesExists = (persons.map(person => person.name === newName))
    let nameExist = false
    namesExists.forEach(value =>{
      if(value === true){
        nameExist = true
      }
    })

    if(nameExist){
      alert(`${newName} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat(updatedPerson))
      setNewPersonsFilter(newPersonsFilter.concat(updatedPerson))
    }

    setNewName('')
    setNewNumber('')
    setNewFilter('')
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
      
      <Persons newPersonsFilter={newPersonsFilter} />

    </div>
  )
}

export default App
