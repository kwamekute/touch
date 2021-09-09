const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const colors = require("colors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const cors = require("cors");

dotenv.config({ path: "./config/config.env" });

//connect to database
connectDB();

//Initializing express
const app = express();

//middlewares
app.use(cors());
app.options("*", cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/bookings", require("./routes/bookings"));

//serve static files
app.use(express.static(__dirname + "/public"));

//Error Handler (should be last middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

//handle server crash more gracefully
process.on("unhandledRejection", (error, promise) => {
  console.log(`Logged Error: ${error}`);
  server.close(() => process.exit(1));
});
