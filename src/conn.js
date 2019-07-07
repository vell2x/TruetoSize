const Pool = require('pg').Pool
const util = require('./shoes')
const bodyParser = require('body-parser')

const pool = new Pool({
  user: process.env.POSTGRESUSER,
  host: process.env.POSTGRESHOST,
  database: process.env.POSTGRESDB,
  password: process.env.POSTGRESPASS,
  port: 5432,
})

const getShoes = (request, response) => {
  pool.query('SELECT * FROM shoes_truetosize ORDER BY shoe_name ASC', (error, results) => {
    if (error) {
      throw error.message;
    }
    response.status(200).json(results.rows)
  })
}

const getShoe = (request, response) => {
  pool.query('SELECT truesize_data FROM shoes_truetosize', (error, results) => {
    if (error) {
      throw error.message;
    }
    response.status(200).json(results.rows)
  })
}

const createShoe = (request, response) => {
  const { shoe_name, truesize_data, truesize_calculation } = request.body

  pool.query('INSERT INTO shoes_truetosize (shoe_name, truesize_data, truesize_calculation) VALUES ($1, $2, $3)', [shoe_name, truesize_data, truesize_calculation], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added!`)
  })
}

const updateShoe = (request, response) => {
  const id = parseInt(request.params.id)
  const { shoe_name, truesize_data } = request.body

  var truesize_calculation = util.trueToSizeCalculation(shoe_name, truesize_data)
  console.log(shoe_name);
  console.log(truesize_data);
  console.log(truesize_calculation);
  pool.query(
    'UPDATE shoes_truetosize SET truesize_data = $2, truesize_calculation = $3 WHERE shoe_name = $4', [truesize_data, truesize_calculation, shoe_name], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with Name: ${shoe_name}`)
    }
  )
}

const deleteShoe = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getShoes,
  createShoe,
  updateShoe,
  deleteShoe,
}