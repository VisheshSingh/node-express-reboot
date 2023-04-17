const express = require('express');
require('dotenv').config();
const connectDB = require('./db/connect');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use('/api/v1/products', productRoutes);

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
