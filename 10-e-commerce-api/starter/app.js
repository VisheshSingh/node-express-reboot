// EXPRESS
const express = require('express');
require('express-async-errors'); // FOR HANDLING ASYNC ERRORS
// ENV VARIABLES
require('dotenv').config();
// DB CONNECTION
const connectDB = require('./db/connect');

// ROUTES
const productRoutes = require('./routes/productRoutes');

const { NotFoundError } = require('./errors');
const errorHandler = require('./middleware/error-handler');

const app = express();
// MIDDLEWARES
app.use(express.json());

app.use('/api/v1', (req, res) => res.send('E-Commerce API'));
app.use('/api/v1/products', productRoutes);
app.use(NotFoundError);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB();
    app.listen(PORT, console.log(`Server listening to PORT: ${PORT}`));
  } catch (error) {
    console.log('Server connection failed');
  }
}

start();
