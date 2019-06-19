const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');

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

// Home page
app.get('/', (req, res) => {
  let sql = 'SELECT * FROM post';
  let query = db.query(sql, (err,results) => {
    if(err) throw err;
    res.render('index', {
      articles: results
    });
  });
});

// add new
app.post('/add', function(req, res){
  let post = {title:req.body.title, body:req.body.body};
  let sql = 'INSERT INTO post SET ?';
  let query = db.query(sql, post, (err,result) => {
    if(err) throw err;
    res.redirect('/');
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
