import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  // State to manage the list of notes
  const [notes, setNotes] = useState(props.notes)
  // State to manage the value of the new note input field
  const [newNote, setNewNote] = useState('')
  // State to toggle between showing all notes or only important ones
  const [showAll, setShowAll] = useState(true)

  const addNote = (event) => {
    event.preventDefault() // Prevents the default form submission behavior
    console.log('button clicked', event.target) // Debugging log (should be removed in production)
    const noteObject = {
      content: newNote, // Content of the new note
      important: Math.random() > 0.5, // Randomly assigns importance to the note
      id: String(notes.length + 1), // Generates a new ID based on the length of the notes array
    }

    setNotes(notes.concat(noteObject)) // Adds the new note to the notes array
    setNewNote('') // Resets the input field
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value) // Debugging log (should be removed in production)
    setNewNote(event.target.value) // Updates the state with the current input value
  }

  // Determines which notes to display based on the `showAll` state
  const notesToShow = showAll
    ? notes // Show all notes
    : notes.filter(note => note.important === true) // Show only important notes

  return (
    <div> 
      <h1>Notes</h1>
      <div>
        {/* Button to toggle between showing all notes and important notes */}
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {/* Renders the list of notes using the Note component */}
        {notesToShow.map(note =>
          <Note key={note.id} note={note} /> // Key is set to note.id for efficient rendering
        )}
      </ul>
      <form onSubmit={addNote}>
        {/* Controlled input field for adding a new note */}
        <input 
        value={newNote} 
        onChange={handleNoteChange}
        />
        
        {/* Button to save the new note */}
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App