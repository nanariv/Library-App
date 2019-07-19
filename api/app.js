var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require("./routes/testAPI");
var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require('fs');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname, 'public')));

app.all('/', indexRouter);
app.use('/users', usersRouter);
app.use("/BookAPI", testAPIRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.post('/append', function(req, res) {
  res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
  console.log("Reached", req);
  const newBook = {
    "_id": (Math.random()*1e32).toString(36),
    "name": req.body.name,
    "author": req.body.author,
    "description": req.body.name
  };
  var books = require('./data/bookAPI.json');
  books.push(newBook);
  console.log(books, typeof books);
  fs.writeFile('./data/bookAPI.json', JSON.stringify(books), function (err) {
    if (err) throw err;
    console.log('ERR!');
  });
  res.send("Appended");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
