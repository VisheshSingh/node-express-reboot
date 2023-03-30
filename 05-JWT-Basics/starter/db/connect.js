const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(`MONGO DB connection established at ${conn.connection.host}`);
  } catch (error) {
    console.log(`MONGO DB connection error`);
    process.exit(1);
  }
};

module.exports = connectDB;
