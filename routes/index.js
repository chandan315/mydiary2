var express = require('express');
var router = express.Router();

router.get('/signup', function(req, res, next) {
  res.render('signup', {req:req});
});
router.get('/index1', function(req, res, next) {
if(req.isAuthenticated())
{
  const pg = require('pg');
  const connectionString = process.env.DATABASE_URL || 'postgresql-asymmetrical-24420';
  userId = req.user.name;
  const client = new pg.Client(connectionString);
  // Grab data from http request
  
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
   
var async = require('async');

var results2 = [];
var categories2 = [];

async.parallel({
  results: function(callback) {
    const query2 = client.query('SELECT * FROM entries where username = ($1) ORDER BY id desc', [userId]);
    query2.on('row', (row) => {
      results2.push(row);
    });

    query2.on('end', () => {
      callback(null, results2);
    })
  },
  categories: function(callback) {
    const query3 = client.query('SELECT * FROM categories where username = ($1) ORDER BY id desc',[userId]);
    // Stream results back one row at a time
    query3.on('row', (row) => {
      categories2.push(row);
    });

    query3.on('end', () => {
      callback(null, categories2);
    });
  }
}, function(err, results) {
  if (err) {
    return res.send(err);
  }

  return res.render('index2.ejs',{resultsToShow : results.results, categoriesToShow: results.categories, userId : userId, req: req});
});    
});
}
else
{
  res.redirect('login');
}


});
router.post('/create', function(req, res, next) {  
if(req.isAuthenticated())
{
const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgresql-asymmetrical-24420';

const client = new pg.Client(connectionString);
userId = req.user.name;
// Grab data from http request

// Get a Postgres client from the connection pool
pg.connect(connectionString, (err, client, done) => {
  // Handle connection errors
  if(err) {
    done();
    console.log(err);
    return res.status(500).json({success: false, data: err});
  }
  const data = {text: req.body.txtEntry, category: req.body.selectCategory, dateEntered: req.body.txtDateEntered};

  // SQL Query > Insert Data
 const query = client.query('INSERT INTO entries(text, category, dateEntered, username) values($1, $2,$3, $4)',[data.text, data.category, data.dateEntered, userId]);
  // SQL Query > Select Data
  

var async = require('async');

var results2 = [];
var categories2 = [];

async.parallel({
  results: function(callback) {
    const query2 = client.query('SELECT * FROM entries where username = ($1) ORDER BY id desc',[userId]);
    query2.on('row', (row) => {
      results2.push(row);
    });

    query2.on('end', () => {
      callback(null, results2);
    })
  },
  categories: function(callback) {
    const query3 = client.query('SELECT * FROM categories where username = ($1) ORDER BY id desc',[userId]);
    // Stream results back one row at a time
    query3.on('row', (row) => {
      categories2.push(row);
    });

    query3.on('end', () => {
      callback(null, categories2);
    });
  }
}, function(err, results) {
  if (err) {
    return res.send(err);
  }

  return res.render('index2.ejs',{resultsToShow : results.results, categoriesToShow: results.categories, req: req});

});
});
}
else
{
  res.redirect('login');
}
});



router.post('/createCategory', function(req, res, next) {
if(req.isAuthenticated())
{
const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgresql-asymmetrical-24420';

const client = new pg.Client(connectionString);
userId = req.user.name;
// Grab data from http request

// Get a Postgres client from the connection pool
pg.connect(connectionString, (err, client, done) => {
  // Handle connection errors
  if(err) {
    done();
    console.log(err);
    return res.status(500).json({success: false, data: err});
  }
  const data = {text: req.body.txtCategory};

  // SQL Query > Insert Data
 const query = client.query('INSERT INTO categories(text,username) values($1,$2)',[data.text,userId]);
  // SQL Query > Select Data
  

var async = require('async');

var results2 = [];
var categories2 = [];

async.parallel({
  results: function(callback) {
    const query2 = client.query('SELECT * FROM entries where username = ($1) ORDER BY id desc',[userId]);
    query2.on('row', (row) => {
      results2.push(row);
    });

    query2.on('end', () => {
      callback(null, results2);
    })
  },
  categories: function(callback) {
    const query3 = client.query('SELECT * FROM categories where username = ($1) ORDER BY id desc',[userId]);
    // Stream results back one row at a time
    query3.on('row', (row) => {
      categories2.push(row);
    });

    query3.on('end', () => {
      callback(null, categories2);
    });
  }
}, function(err, results) {
  if (err) {
    return res.send(err);
  }

  return res.render('index2.ejs',{resultsToShow : results.results, categoriesToShow: results.categories, req: req});
});
});
}
else
{
  res.redirect('login');
}
});


















router.post('/delete', function(req, res, next) {
if(req.isAuthenticated())
{
  pg = require('pg');
  connectionString = process.env.DATABASE_URL || 'postgresql-asymmetrical-24420';

  client = new pg.Client(connectionString);
  userId = req.user.name;
  
  // Grab data from the URL parameters
  id = req.body.entry_id;
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Delete Data
    const query = client.query('DELETE FROM entries WHERE id=($1)', [id]);
    // SQL Query > Select Data
var async = require('async');

var results2 = [];
var categories2 = [];

async.parallel({
  results: function(callback) {
    const query2 = client.query('SELECT * FROM entries where username = ($1) ORDER BY id desc',[userId]);
    query2.on('row', (row) => {
      results2.push(row);
    });

    query2.on('end', () => {
      callback(null, results2);
    })
  },
  categories: function(callback) {
    const query3 = client.query('SELECT * FROM categories  where username = ($1) ORDER BY id desc',[userId]);
    // Stream results back one row at a time
    query3.on('row', (row) => {
      categories2.push(row);
    });

    query3.on('end', () => {
      callback(null, categories2);
    });
  }
}, function(err, results) {
  if (err) {
    return res.send(err);
  }
  return res.render('index2.ejs',{resultsToShow : results.results, categoriesToShow: results.categories, req: req});
  });
});
}
else
{
  res.redirect('login');
}
});


router.get('/categories', function(req, res, next) {
if(req.isAuthenticated())
{
const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgresql-asymmetrical-24420';

const client = new pg.Client(connectionString);
userId = req.user.name;
// Grab data from http request

// Get a Postgres client from the connection pool
pg.connect(connectionString, (err, client, done) => {
  // Handle connection errors
  if(err) {
    done();
    console.log(err);
    return res.status(500).json({success: false, data: err});
  }
  // SQL Query > Select Data
  

var async = require('async');

var results2 = [];
var categories2 = [];

async.parallel({
  results: function(callback) {
    const query2 = client.query('SELECT * FROM entries where username = ($1) ORDER BY id desc',[userId]);
    query2.on('row', (row) => {
      results2.push(row);
    });

    query2.on('end', () => {
      callback(null, results2);
    })
  },
  categories: function(callback) {
    const query3 = client.query('SELECT * FROM categories where username = ($1) ORDER BY id desc',[userId]);
    // Stream results back one row at a time
    query3.on('row', (row) => {
      categories2.push(row);
    });

    query3.on('end', () => {
      callback(null, categories2);
    });
  }
}, function(err, results) {
  if (err) {
    return res.send(err);
  }

  return res.render('categories.ejs',{resultsToShow : results.results, categoriesToShow: results.categories, req: req});
});
});
}
else
{
  res.redirect('login');
}
});


router.post('/deleteCategory', function(req, res, next) {
if(req.isAuthenticated())
{
  pg = require('pg');
  connectionString = process.env.DATABASE_URL || 'postgresql-asymmetrical-24420';

  client = new pg.Client(connectionString);
  userId = req.user.name;
  
  // Grab data from the URL parameters
  id = req.body.category_id;
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Delete Data
    const query = client.query('DELETE FROM categories WHERE id=($1)', [id]);
    // SQL Query > Select Data
var async = require('async');

var results2 = [];
var categories2 = [];

async.parallel({
  results: function(callback) {
    const query2 = client.query('SELECT * FROM entries where username = ($1) ORDER BY id desc',[userId]);
    query2.on('row', (row) => {
      results2.push(row);
    });

    query2.on('end', () => {
      callback(null, results2);
    })
  },
  categories: function(callback) {
    const query3 = client.query('SELECT * FROM categories  where username = ($1) ORDER BY id desc',[userId]);
    // Stream results back one row at a time
    query3.on('row', (row) => {
      categories2.push(row);
    });

    query3.on('end', () => {
      callback(null, categories2);
    });
  }
}, function(err, results) {
  if (err) {
    return res.send(err);
  }
  return res.render('categories.ejs',{resultsToShow : results.results, categoriesToShow: results.categories, req: req});
  });
});
}
else
{
  res.redirect('login');
}
});




router.get('/entries', function(req, res, next) {
if(req.isAuthenticated())
{
const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgresql-asymmetrical-24420';

const client = new pg.Client(connectionString);
userId = req.user.name;
// Grab data from http request

// Get a Postgres client from the connection pool
pg.connect(connectionString, (err, client, done) => {
  // Handle connection errors
  if(err) {
    done();
    console.log(err);
    return res.status(500).json({success: false, data: err});
  }
  // SQL Query > Select Data
  

var async = require('async');

var results2 = [];
var categories2 = [];

async.parallel({
  results: function(callback) {
    const query2 = client.query('SELECT * FROM entries where username = ($1) ORDER BY id desc',[userId]);
    query2.on('row', (row) => {
      results2.push(row);
    });

    query2.on('end', () => {
      callback(null, results2);
    })
  },
  categories: function(callback) {
    const query3 = client.query('SELECT * FROM categories where username = ($1) ORDER BY id desc',[userId]);
    // Stream results back one row at a time
    query3.on('row', (row) => {
      categories2.push(row);
    });

    query3.on('end', () => {
      callback(null, categories2);
    });
  }
}, function(err, results) {
  if (err) {
    return res.send(err);
  }

  return res.render('entries.ejs',{resultsToShow : results.results, categoriesToShow: results.categories, req: req});
});
});
}
else
{
  res.redirect('login');
}
});



router.post('/deleteEntry', function(req, res, next) {
if(req.isAuthenticated())
{
  pg = require('pg');
  connectionString = process.env.DATABASE_URL || 'postgresql-asymmetrical-24420';

  client = new pg.Client(connectionString);
  userId = req.user.name;
  
  // Grab data from the URL parameters
  id = req.body.entry_id;
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Delete Data
    const query = client.query('DELETE FROM entries WHERE id=($1)', [id]);
    // SQL Query > Select Data
var async = require('async');

var results2 = [];
var categories2 = [];

async.parallel({
  results: function(callback) {
    const query2 = client.query('SELECT * FROM entries where username = ($1) ORDER BY id desc',[userId]);
    query2.on('row', (row) => {
      results2.push(row);
    });

    query2.on('end', () => {
      callback(null, results2);
    })
  },
  categories: function(callback) {
    const query3 = client.query('SELECT * FROM categories  where username = ($1) ORDER BY id desc',[userId]);
    // Stream results back one row at a time
    query3.on('row', (row) => {
      categories2.push(row);
    });

    query3.on('end', () => {
      callback(null, categories2);
    });
  }
}, function(err, results) {
  if (err) {
    return res.send(err);
  }
  return res.render('entries.ejs',{resultsToShow : results.results, categoriesToShow: results.categories, req: req});
  });
});
}
else
{
  res.redirect('login');
}
});



module.exports = router;

