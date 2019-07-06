const { Pool, Client } = require('pg');
const dotenv = require('dotenv');
var pgtools = require('pgtools');

dotenv.config();


const pool = new Pool({
  user: process.env.POSTGRESUSER,
  host: process.env.POSTGRESHOST,
  database: process.env.POSTGRESDB,
  password: process.env.POSTGRESPASS,
  port: 5432,
  connectionString: process.env.DATABASE_URL
});


pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Tables
 */
const createTables = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
    shoes_truetosize(
        id ID PRIMARY KEY,
        shoe_name VARCHAR(30) NOT NULL,
        truesize_data INTEGER[] NOT NULL,
        truesize_calculation FLOAT NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/**
 * Drop Tables
 */
const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS shoes_truetosize';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTables,
  dropTables
};

require('make-runnable');