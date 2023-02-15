
const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');

const app = express()

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tradefile'
});

app.use(express.json());

const SECRET = 'secretkey';

  app.post('/login', (req, res) => {
  const { username, password } = req.body;

  connection.query(
    `SELECT * FROM users WHERE username = '${username}'`,
    (error, results) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }

      if (!results.length) {
        return res.status(400).json({ message: 'User not found' });
      }

      const user = results[0];

      if (user.password !== password) {
        return res.status(400).json({ message: 'Incorrect password' });
      }

      const token = jwt.sign({ id: user.id , username:user.username }, SECRET);
      const val = results[0]['type'];

      res.json({ token });
    }
  );
});


 const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token, SECRET

    );

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};


 app.get('/user/:val', verifyToken, (req, res) => {
  if (req.params.val == 'admin') {
    connection.query( 
      `SELECT * FROM user_data WHERE admin_id = ${req.user.id}`,
      (error, results) => {
        if (error) {
          return res.status(500).json({ message: error.message });
        }
        res.send(results);
      });
  } else {
    const query = `SELECT * FROM user_data WHERE username = ?`;
    const values = [req.params.val];
    
    connection.query( 
      query,values,
      (error, results) => {
        if (error) {
          return res.status(500).json({ message: error.message });
        }
        res.send(results);
      });
  }  
});
 app.post('/addData', verifyToken, (req, res) => {
  const { username,value } = req.body;
  const id = req.user.id;

  connection.query(
    `INSERT INTO user_data (admin_id, username,value) VALUES (${id}, '${username}', '${value}')`,
    (error, results) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }

      res.json({ message: 'Data added successfully' });
    }
  );
});

 app.post('/register', (req, res) => {
  const { username, password,type } = req.body;

  connection.query(
    `SELECT * FROM users WHERE username = '${username}'`,
    (error, results) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }

      if (results.length) {
        return res.status(400).json({ message: 'Username already taken' });
      }

      connection.query(
        `INSERT INTO users (username, password ,type) VALUES ('${username}', '${password}','${type}')`,
        (error) => {
          if (error) {
            return res.status(500).json({ message: error.message });
          }

          res.json({ message: 'Registration successful'});
        }
      );
    }
  );
});


app.listen(3000)
  console.log('Server started on port 3000');


