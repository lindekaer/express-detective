/*
-----------------------------------------------------------------------------------
|
| Imports
|
-----------------------------------------------------------------------------------
*/

const express = require('express')
const bodyParser = require('body-parser')
const detective = require('./index')

/*
-----------------------------------------------------------------------------------
|
| Simple Express application
|
-----------------------------------------------------------------------------------
*/

const PORT = process.env.PORT || 3000

const app = express()
app.use(bodyParser.json())
app.use(detective())
app.post('/create-user', createUser)
app.get('/get-user', getUser)

function createUser (req, res, next) {
  res.send('User created!')
}

function getUser (req, res, next) {
  res.json({ username: req.query.username, name: 'Mikael Nigelway', age: 42 })
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
