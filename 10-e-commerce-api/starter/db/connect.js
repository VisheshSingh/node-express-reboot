const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongo DB connection established at ${conn.connection.host}`);
  } catch (error) {
    console.log(`Mongo DB connection failed due to: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
