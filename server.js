const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const connectDB = require("./config/db");
const path = require("path");
require("dotenv").config();
// const cors = require("cors");

const app = express();
const socketHandler = require("./socket/socket");

const httpServer = createServer(app);

const origin =
  process.env.NODE_ENV === "production"
    ? "https://gamersite.up.railway.app"
    : "http://localhost:3000";

const io = new Server(httpServer, {
  cors: {
    origin: origin,
    methods: ["GET", "POST"],
    //allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socketHandler(socket);
});

//connect db
connectDB();

// Init middleware
app.use(express.json({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

// Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/games", require("./routes/api/games"));
app.use("/api/chat", require("./routes/api/chat"));
app.use("/api/images", require("./routes/api/images"));

// serve static assets in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
