var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/index2', function(req, res, next) {
  res.send('respond with a resource 2017');
});


/* GET users listing. */
router.post('/signup', function(req, res, next) {
  const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgresql-asymmetrical-24420';

const client = new pg.Client(connectionString);

// Grab data from http request

// Get a Postgres client from the connection pool
pg.connect(connectionString, function(err, client, done){
  // Handle connection errors
  if(err) {
    done();
    console.log(err);
    return res.status(500).json({success: false, data: err});
  }
  const data = {username: req.body.username, password: req.body.password};

  // SQL Query > Insert Data
 const query = client.query('INSERT INTO users(username, password) values($1, $2)',[data.username, data.password]);
  
    query.on('end', () => {
      res.redirect('/login')
    });
});
});


module.exports = router;
