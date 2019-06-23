const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// local DB connection
dotenv.config();
const db = mysql.createConnection({
  host      : process.env.DB_HOST,
  user      : process.env.DB_USER,
  password  : process.env.DB_PASS,
  database  : process.env.DB_DATABASE
});

db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log("MySql connected");
});

// listening on port
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// load resources
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Get, home page
app.get('/', (req, res) => {
  let sql = 'SELECT * FROM post';
  let query = db.query(sql, (err,results) => {
    if(err) throw err;
    res.render('index', {
      articles: results
    });
  });
});

// Post, new entry
app.post('/add', (req, res) => {
  let post = {title:req.body.title, body:req.body.body};
  let sql = 'INSERT INTO post SET ?';
  let query = db.query(sql, post, (err,result) => {
    if(err) throw err;
    res.redirect('/');
  });
});

// Get, note page
app.get('/note/:id', (req,res) => {
  let sql = `SELECT * FROM post WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err,result) => {
    if(err) throw err;
    console.log(result);
    res.render('note', {
      article: result[0]
    });
  });
});

// Get, edit page
app.get('/note/edit/:id', (req,res) => {
  let sql = `SELECT * FROM post WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err,result) => {
    if(err) throw err;
    console.log(result);
    res.render('edit', {
      article: result[0]
    });
  });
});

// Post, update entry
app.post('/note/edit/:id', (req, res) => {
  let sql = `UPDATE post SET title = '${req.body.title}', body = '${req.body.body}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err,result) => {
    if(err) throw err;
    res.redirect('/');
  });
});

// Delete, entry
app.delete('/note/delete/:id', (req,res) => {
  let sql = `DELETE FROM post WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err,result) => {
    if(err) throw err;
    res.send();
  });
});
