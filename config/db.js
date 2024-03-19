import mysql from 'mysql2';
import dotenv from 'dotenv';

// load .env file content into process.env
dotenv.config();

// create a mysql connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.PASSWORD,
  port: process.env.DBPORT,
  database: process.env.DB
});

// open created connection
connection.connect((err) => {
  if (err) throw err;

  console.log('Connection to database successful');
});

export default connection;