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

app.post('/users', createUser)
app.get('/users/:username', getUser)

app.listen(8000)
```

## Configuration
You can pass an options object to `express-detective` when mounting the middleware.

| Key           | Type          | Description  |
| :------------- |:-------------| :-------------|
| `timeFormat`         | string      | The time format used for output. Uses formats from `moment` |
| `jsonColorOptions`   | object      | The coloring of the JSON output. Uses options from `prettyjson` |
| `includeHeaders`     | boolean     | Whether to print headers of request |
| `includeBody`        | boolean     | Whether to print body of request, if POST |
| `includeQueryString` | boolean     | Whether to print query string of request, if GET |

## License
MIT © [Theodor Lindekaer](http://lindekaer.com)
