const dotenv = require("dotenv");
const app = require('./app');
const mongoose = require("mongoose");

process.on('uncaughtException', error => {
  console.log('UNCAUGHT EXCEPTION!!! SHUTING DOWN!!!');
  console.log(error.name, error.message);
  process.exit(1);
})

dotenv.config({path: './config.env'});

const db = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(db, {
}).then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

process.on('unhandledRejection', error => {
  console.log(error.name, error.message);
  console.log('UNHANDLED REJECTION!!! SHUTING DOWN!!!');
  server.close(() => {
    process.exit(1);
  })
})


