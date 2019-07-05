const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.POSTGRESUSER,
  host: process.env.POSTGRESHOST,
  database: process.env.POSTGRESDB,
  password: process.env.POSTGRESPASS,
  port: 5432,
})

const getShoe = (request, response) => {
  pool.query('SELECT * FROM shoes_truetosize ORDER BY shoe_name ASC', (error, results) => {
    if (error) {
      throw error.message;
    }
    response.status(200).json(results.rows)
  })
}

const createShoe = (request, response) => {
  const { shoe, data, calculation } = request.body

  pool.query('INSERT INTO truetosize (shoe, data, calculation) VALUES ($1, $2, $3)', [shoe, data, calculation], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
  })
}

const updateShoe = (request, response) => {
  const id = parseInt(request.params.id)
  const { shoe, data, calculation } = request.body

  pool.query(
    'UPDATE truetosize SET shoe = $1, data = $2, calculation = $3 WHERE id = $4',
    [shoe, data, calculation, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
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
  getShoe,
  createShoe,
  updateShoe,
  deleteShoe,
}