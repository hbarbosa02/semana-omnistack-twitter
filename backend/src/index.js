const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Routes = require("./routes");

const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

mongoose.connect(
  "mongodb://admin:admin@cluster0-shard-00-00-qm1bp.mongodb.net:27017,cluster0-shard-00-01-qm1bp.mongodb.net:27017,cluster0-shard-00-02-qm1bp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use((req, res, next) => {
  req.io = io;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(Routes);

server.listen(4000, () => {
  console.log("Server started on port 4000");
});
