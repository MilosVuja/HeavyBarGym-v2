const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const memberRouter = require('./routes/memberRoutes');
const groupClassRouter = require('./routes/groupClassRoutes');
const AppError = require('./utilities/appError');
const globalErrorHandler = require('./controllers/errorController');
const viewRouter = require('./routes/viewRoutes');


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet({ contentSecurityPolicy: false }));

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP! Please try again in an hour!'
});
app.use('/api', limiter);

app.use(express.json({limit: '10kb'}));
app.use(cookieParser());

app.use(mongoSanitize());

app.use(hpp({
  whitelist: [
    'maxGroupSize',
    'ratingsAverage',
    'difficulty'
  ]
}));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies)
  next();
})

app.use('/', viewRouter);
app.use('/api/v1/home', memberRouter);
app.use('/api/v1/groupClassBooking', groupClassRouter);

app.all('*', (req, res, next)=>{
  next(new AppError(`Cant find ${req.originalUrl} on this server!`, 404));
})

app.use(globalErrorHandler);

module.exports = app;