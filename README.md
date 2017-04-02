# express-detective
A simple Express middleware to pretty print the details of incoming requests.

## Installation
```
npm install --save express-detective
```

## Usage
```js
const express = require('express')
const detective = require('express-detective')
const app = express()

app.use(detective())

app.post('/create-user', createUser)
app.get('/get-user', getUser)

app.listen(8000)
```

## Configuration
TODO

## License
MIT © [Theodor Lindekaer](http://lindekaer.com)
