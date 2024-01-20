const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'allen20031110',
    database: 'USERS',
    port: 3306
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err.code);
    } else {
        console.log('Connected to MySQL database');
    }
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            res.json({ success: false, message: 'Error querying database.' });
        } else {
            if (result.length > 0) {
                res.json({ success: true, message: 'Login successful!' });
            } else {
                res.json({ success: false, message: 'Login failed. Please check your username and password.' });
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

