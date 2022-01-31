const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')

// loading variables from ".env"
require('dotenv').config()
console.log(process.env.DB_USER);
console.log(process.env.DB_PWD);

//database connection
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.srrib.mongodb.net/hw4?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })

  .then(() => {
    console.log("Connected successfully")
  })
  .catch((err)=>{
    console.error("Error connection")
    console.error(err);
  })

const travelRouter = require('./routes/travel');
const apiTravelRouter = require('./routes/api.travel.js');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/travel', travelRouter);
app.use('/api/travel', apiTravelRouter);

app.use('/', (req, res) => {
  // filter for actual files we want to deliver from disk
  var pattern = new RegExp('(.css|.html|.js|.ico|.jpg|.png)+\/?$', 'gi'); 
  if (pattern.test(req.url)) {
     // in cases where the Angular app is mounted at the root url, we may need to strip a trailing slash from the redirected request 
     let url = req.url.replace(/\/$/, "");
     // deliver the requested file
     res.sendFile(path.resolve(__dirname, `../client/dist/myNewApp/${url}`));
  } else {
     // in this case, the request should be handled by Angular, which is index.html
     res.sendFile(path.resolve(__dirname, '../client/dist/myNewApp/index.html'));
  }
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
