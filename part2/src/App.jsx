
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

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]) 
  const [newName, setNewName] = useState('')

  const addNewName = (event) =>{
    event.preventDefault()
    const updatedPerson = {
      name: newName
    }
    setPersons(persons.concat(updatedPerson))
    setNewName('')
  }

  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }

  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person =>
          <p key={person.name}>{person.name}</p>
        )}
    </div>
  )
}

export default App
