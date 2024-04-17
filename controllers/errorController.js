const AppError = require("../utilities/appError")

const handleCastErrorDB = error => {
  const message = `Invalid ${error.path}: ${error.value}!`
  return new AppError(message, 400);
}

const handleDuplicateFieldsDB = error => {
  const value = error.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);

  const message = `Duplicate field value: ${value}! Please use another value!`;
  return new AppError(message, 400);
}

const handleValidationErrorDB = error => {
  const errors = Object.values(error.errors).map(el => el.message);

  const message = `Invalid input data! ${errors.join('. ')}`;
  return new AppError(message, 400);
}


const sendErrorDev = (error, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    error,
    message: error.message,
    stack: error.stack
  })
}

const sendErrorProd = (error, res) => {
  if(error.isOperational){
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    })
  }else{
    console.error('ERROR!!!', error);

    res.status(500).json({
      status: 'Error!',
      message: 'Something went wrong!'
    })
  }
}

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  if(process.env.NODE_ENV === 'development'){
    sendErrorDev(error, res);
  }else if(process.env.NODE_ENV === 'production'){
    let err = {...error};

    if(err.name === 'CastError') err = handleCastErrorDB(err)
    if(err.code === 11000) err = handleDuplicateFieldsDB(err);
    if(err.name === 'ValidationError') err = handleValidationErrorDB(err);

    sendErrorProd(err, res);
  }
}