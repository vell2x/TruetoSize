const {Client} = require('pg')
console.log("Here")
const client = new Client({
  user: "postgres",
  password: "icewood7",
  host: "localhost",
  port: 5432,
  database: "stockx",
});
console.log("Here")
client.connect()
.then(() => console.log("Connected successfully"))
.catch(e => console.log)
.finally(() => client.end())
console.log("Here")