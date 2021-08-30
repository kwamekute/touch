const dotenv = require("dotenv");
const express = require("express");
const colors = require("colors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const cors = require("cors");

const http = require("http");
const socketIo = require("socket.io");

dotenv.config({ path: "./config/config.env" });

//connect to database
connectDB();

//Setting up express and adding socketIo middleware
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

//middlewares
app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/bookings", require("./routes/bookings"));

//Error Handler (should be last middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

//Setting up a socket with the namespace "connection" for new sockets
io.on("connection", (socket) => {
  console.log("New client connected");

  //Here we listen on a new namespace called "incoming data"
  socket.on("messageSent", (data) => {
    //Here we broadcast it out to all other sockets EXCLUDING the socket which sent us the data
    socket.broadcast.emit("outgoing data", { message: data });
  });

  //A special namespace "disconnect" for when a client disconnects
  socket.on("disconnect", () => console.log("Client disconnected"));
});

const serverConnect = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

//handle server crash more gracefully
process.on("unhandledRejection", (error, promise) => {
  console.log(`Logged Error: ${error}`);
  serverConnect.close(() => process.exit(1));
});
