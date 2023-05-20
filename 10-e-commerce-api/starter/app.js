// EXPRESS
const express = require('express');
const colors = require('colors');
require('express-async-errors'); // FOR HANDLING ASYNC ERRORS
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
// ENV VARIABLES
require('dotenv').config();
// DB CONNECTION
const connectDB = require('./db/connect');

// ROUTES
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const notFoundHandler = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

const app = express();
// MIDDLEWARES
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static('./public'));
app.use(fileupload());

app.get('/api/v1', (req, res) => {
  console.log(req.signedCookies);
  res.send('E-Commerce API');
});
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB();
    app.listen(PORT, console.log(`Server listening to PORT: ${PORT}`.yellow));
  } catch (error) {
    console.log('Server connection failed');
  }
}

start();
