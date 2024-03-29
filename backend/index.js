const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json()) 

// Middleware that allows side actions to perfom without effecting state updates

//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

// app.get('/', (req, res) => {
//   res.send('Hello Ayu!')
// })

app.listen(port, () => {
  
  console.log(`iNotebook backend listening at http://localhost:${port}`)  // print terminal mei ho rha yeh using console.log. Nodemon data save krte hei ussey restart kr de rha.
})



