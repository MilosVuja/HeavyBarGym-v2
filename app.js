const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const memberRouter = require('./routes/memberRoutes');
const groupClassRouter = require('./routes/groupClassRoutes');
const morgan = require('morgan');
const AppError = require('./utilities/appError');
const globalErrorHandler = require('./controllers/errorController');


if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
})

//routes
app.use('/api/v1/home', memberRouter);
app.use('/api/v1/groupClassBooking', groupClassRouter);

app.all('*', (req, res, next)=>{
  next(new AppError(`Cant find ${req.originalUrl} on this server!`, 404));
})

app.use(globalErrorHandler);

module.exports = app;