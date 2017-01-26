var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var index = require('./routes/index');
var users = require('./routes/users');
var Users = require('./routes/sq');
var passport = require('passport')
var passportLocal = require('passport-local');
var expressSession = require('express-session');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/node_modules/jquery/dist/'));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));


app.use(expressSession({
      secret: process.env.SESSION_SECRET || 'secret',
      resave:false,
      saveUninitialized: false
}))





passport.use(new passportLocal.Strategy(function(username,password, done){
  Users.findOne({where : {username: username, password: password}}).then(function (user) {      
      if(user)
        {        
            done(null,{ id:username, name:username });          
        }
        else
        {
          done(null,null);      
        }

    }), function(err){
    if (err) { return done(err); }
  };
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user,done){
		done(null,user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});


app.use('/', index);
app.use('/', users);

app.get('/', function(req, res, next) {
  res.render("login",{
  	  isAuthenticated: req.isAuthenticated(),
  	  req: req
  });
});

app.get('/login', function(req, res, next) {
  res.render("login",{
      isAuthenticated: req.isAuthenticated(),
      req: req
  });
});
app.post('/login',
  passport.authenticate('local'), function(req, res, next) {
  res.redirect("/index1");
});

app.get('/logout', function(req, res){
  req.logout();
  res.render("login",{
      isAuthenticated: req.isAuthenticated(),
      req: req
  });
});




module.exports = app