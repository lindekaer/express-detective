/*
-----------------------------------------------------------------------------------
|
| Imports
|
-----------------------------------------------------------------------------------
*/

const colors = require('colors')
const moment = require('moment')
const prettyjson = require('prettyjson')

/*
-----------------------------------------------------------------------------------
|
| Express Detective module
|
-----------------------------------------------------------------------------------
*/

function expressDetective (userOptions = {}) {
  // Default options
  const options = {
    timeFormat: 'MMMM Do, hh:mm:ss A',
    jsonColorOptions: { keysColor: 'cyan', numberColor: 'yellow', dashColor: 'magenta' },
    includeHeaders: false,
    includeBody: true,
    includeQueryString: true
  }

  // Check if user has provided illegal options
  for (const option of Object.keys(userOptions)) {
    if (options[option] === undefined) throw Error(`The option '${option}' is not allowed`)
    const value = userOptions[option]
    if (option === 'timeFormat' && typeof value !== 'string') throw new Error(`'timeFormat' must be a string`)
    if (option === 'jsonColorOptions' && typeof value !== 'object') throw new Error(`'jsonColorOptions' must be an object`)
    if (option === 'includeHeaders' && typeof value !== 'boolean') throw new Error(`'includeHeaders' must be a boolean`)
    if (option === 'includeBody' && typeof value !== 'boolean') throw new Error(`'includeBody' must be a boolean`)
    if (option === 'includeQueryString' && typeof value !== 'boolean') throw new Error(`'includeQueryString' must be a boolean`)
    // Override default options with user options
    options[option] = userOptions[option]
  }

  // Return valid Express middleware
  return function (req, res, next) {
    const { url, method, query, body, headers } = req
    const timestamp = moment().format(options.timeFormat)
    const data = []

    data.push({
      title: 'REQUEST',
      content: prettyjson.render({
        time: timestamp,
        url: `${method} ${url}`
      }, options.jsonColorOptions)
    })

    if (options.includeHeaders) {
      data.push({
        title: 'HEADERS',
        content: prettyjson.render(headers, options.jsonColorOptions)
      })
    }

    if (options.includeBody && method === 'POST' && body !== undefined && Object.keys(body).length !== 0) {
      data.push({
        title: 'BODY',
        content: prettyjson.render(body, options.jsonColorOptions)
      })
    } else if (options.includeBody && method === 'POST' && body === undefined) {
      data.push({
        title: 'BODY',
        content: 'Undefined'
      })
    }

    if (options.includeQueryString && method === 'GET' && Object.keys(query).length !== 0) {
      data.push({
        title: 'QUERYSTRING',
        content: prettyjson.render(query, options.jsonColorOptions)
      })
    }

    const msg = createMessage(data)
    console.log(msg)
    next()
  }
}

function createMessage (data) {
  let str = '\n'
  for (const item of data) {
    str +=
`${colors.yellow.bold(item.title)}
${item.content}
`
  }
  return str
}

/*
-----------------------------------------------------------------------------------
|
| Exports
|
-----------------------------------------------------------------------------------
*/

module.exports = expressDetective
