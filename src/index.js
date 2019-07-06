const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./conn')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/shoe', db.getShoes)
app.post('/shoe', db.createShoe)
app.put('/shoe/:id', db.updateShoe)
app.delete('/shoe/:id', db.deleteShoe)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

module.exports.app = app;