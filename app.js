const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'myDB'
});

db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log("MySql connected");
});

const app = express();

app.listen('3000', () => {
  console.log("server up");
});

// add new
app.get('/add', (req,res) => {
  let post = {title:'T1', body:'B1'};
  let sql = 'INSERT INTO post SET ?';
  let query = db.query(sql, post, (err,result) => {
    if(err) throw err;
    console.log(result);
    res.send("added");
  });
});

// fetch all
app.get('/fetchall', (req,res) => {
  let sql = 'SELECT * FROM post';
  let query = db.query(sql, (err,results) => {
    if(err) throw err;
    console.log(results);
    res.send("fetched all");
  });
});

// fetch single
app.get('/fetch1/:id', (req,res) => {
  let sql = `SELECT * FROM post WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err,result) => {
    if(err) throw err;
    console.log(result);
    res.send("fetched single");
  });
});

// update single
app.get('/update/:id', (req,res) => {
  let newTitle = 'NewUpdated';
  let sql = `UPDATE post SET title = '${newTitle}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err,result) => {
    if(err) throw err;
    console.log(result);
    res.send("updated");
  });
});

// delete single
app.get('/delete/:id', (req,res) => {
  let newTitle = 'NewUpdated';
  let sql = `DELETE FROM post WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err,result) => {
    if(err) throw err;
    console.log(result);
    res.send("deleted");
  });
});
