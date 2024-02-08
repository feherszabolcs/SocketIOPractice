require("dotenv").config();

const http = require("http");
const express = require("express");
const routes = require("./routes");
const io = require("./io");

const app = express();

app.use(routes);

const httpServer = http.createServer(app);

io(httpServer);

httpServer.listen(3000, () => console.log("Server is listening on port: 3000"));
