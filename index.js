const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static('dist'))

let notes = [
    {
        id: "1",
        content: "HTML is easy",
        important: true
    },
    {
        id: "2",
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: "3",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

app.use(express.json())

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})
  
app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === id)
    
  
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  })

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})
/*
app.post('/api/notes', (request, response) => {
    const note = request.body
    console.log(note)
    response.json(note)
  })*/

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => Number(n.id)))
        : 0
    return String(maxId + 1)
}

app.post('/api/notes', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = {
      content: body.content,
      important: Boolean(body.important) || false,
      id: generateId(),
    }

    console.log(note)
  
    notes = notes.concat(note)
  
    response.json(note)
  })

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})