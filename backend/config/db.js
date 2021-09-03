const mongoose = require("mongoose");

const connectDB = async () => {
  let MONGO_URI = "";
  if (process.env.NODE_ENV === "development") {
    MONGO_URI = process.env.MONGO_URI;
  } else if (process.env.NODE_ENV === "production") {
    MONGO_URI = process.env.PRODUCTION_MONGO_URI;
  }
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (err) {
    console.log(`Error: ${err.message}`.red);
    process.exit(1);
  }
};

module.exports = connectDB;
