import ReactDOM from 'react-dom/client'
import App from './App'

const notes = [
{
  id : 1,
  content: 'HTML is easy',
  important: true
},
{
  id : 2,
  content: 'Browser can execute only JS',
  important : false
},
{
  id : 3,
  content: 'Most important methods of HTTP-protocol are GET and POST',
  important : true
}
]

ReactDOM.createRoot(document.getElementById('root')).render(<App notes={notes} />)
