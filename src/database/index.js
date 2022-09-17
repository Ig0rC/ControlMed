const { Client } = require('pg');


const client = new Client({
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

client.connect();

exports.query = async (query, values) => {
  const {rows} = await client.query(query, values);

  return rows;
};

