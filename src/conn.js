const {Client} = require('pg')
const upated = require('./index');

const client = new Client({
  user: "postgres",
  password: "icewood7",
  host: "localhost",
  port: 5432,
  database: "stockx",
});
client.connect().then(() => console.log("Connected successfully")).catch(e => console.log)

function update(shoeName, data, calc) {
  const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { shoeName, data, calc } = request.body

  pool.query(
    'UPDATE truetosize SET shoe_name = $1, data = $2, calculation = $3 WHERE id = $4',
    [shoeName, updated.data, updated.calc, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}
}

module.exports.client = client;