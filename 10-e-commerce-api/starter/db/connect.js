const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Mongo DB connection established at ${conn.connection.host}`.bgGreen
    );
  } catch (error) {
    console.log(`Mongo DB connection failed due to: ${error.message}`.bold.red);
    process.exit(1);
  }
};

module.exports = connectDB;
