var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var passport = require('passport');

var index = require('./routes/index');
var authRoutes = require('./routes/auth');
var userRoutes = require('./routes/users');
var todoRoutes = require('./routes/todo');
var weatherRoutes = require('./routes/weather');
var postitRoutes = require('./routes/postit');
var stockMarketRoutes = require('./routes/stockMarket');
var app = express();

// store the user_id, the primary key/ foreign key for all models
var user_id = null;

// load environment variables
require('dotenv').config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client/build')));

// to use our express-session and passport middlewares
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// cross origin header issue
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// routes for react components
app.use('/index', index);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/todo', todoRoutes);
app.use('/weather', weatherRoutes);
app.use('/postit', postitRoutes);
app.use('/stockMarket', stockMarketRoutes);

// Always return the main index.html, so react-router can render the route in the client
app.get('/api', (req, res) => {
  res.json({ message: 'hello world' });
});

app.get('/user', (req, res) => {
  user_id = req.user.dataValues.id;
  res.redirect('/');
});

// every other route goes here
app.get('*', (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
  const index = path.join(__dirname, 'client/build', 'index.html');
  res.sendFile(index);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
