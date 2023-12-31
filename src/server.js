require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mysql = require('mysql2/promise');
const { dbConfig } = require('./config');
const { logHello, logBody } = require('./middleware');

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware - app level
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(logHello);
app.use(logBody);

// routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

// MAIN ROUTES

// inportuoju ROutes
const postsRouter = require('./routes/postsRouter');
const authRouter = require('./routes/authRouter');

// panaudoju Routes
app.use('/', postsRouter);
app.use('/', authRouter);

// CONNCT
async function testConnection() {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    await conn.query('SELECT * FROM posts LIMIT 1');
    console.log('Succesfuly connected to mysql ');
  } catch (error) {
    console.log('testConnection failed, did you start XAMPP mate???');
    console.log('error ===', error);
  } finally {
    if (conn) conn.end();
  }
}
// testConnection();

// app.listen(PORT);
app.listen(PORT, () => {
  console.log(`Server runing on http://localhost:${PORT}`);
});
