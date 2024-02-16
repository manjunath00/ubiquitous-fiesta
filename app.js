var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const responseTime = require('response-time');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
const { restResponseTimeHistogram, startMetricServer } = require('./util/metrics');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(
  responseTime((req, res, time) => {
      restResponseTimeHistogram.labels
      ({
          method: req.method,
          route: req.route.path,
          status_code: res.statusCode
        }).observe(time)
     })
  )

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});




const port = 2000;
app.listen(port, async () => {
  startMetricServer()
})

module.exports = app;
