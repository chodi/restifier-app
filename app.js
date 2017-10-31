var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var restifier = require('restifier');
const restify = require('express-restify-mongoose')
var mongoose = require('mongoose')
var index = require('./routes/index');
var users = require('./routes/users');
var sub = require('./routes/sub');
var todo = require('./routes/todo');
const exphbs = require('express-handlebars');
const DB = require('./models').connect(mongoose);
var app = express();
const router = express.Router()
// view engine setup
app.set('views', path.join(__dirname, 'views/express-restify'));
// app.set('view engine', 'jade');

app.engine('handlebars', exphbs(/*{ defaultLayout: 'main' }*/));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'dd.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const Customer = mongoose.model('Customer', new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String }
}))

const Todo = mongoose.model('Todo', new mongoose.Schema({
  owner: { type: String, required: true },
  todo: { type: String, required: true },
  description: { type: String },
  isCompleted: { type: Boolean, default: false },
}))

app.use('/', index);
app.use('/users', users);
app.use('/sub', sub);
app.use('/todo', todo);

restify.serve(router, Customer)
restify.serve(router, Todo)

app.use(router)

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
