const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const fs = require("fs");
const path = require("path");
// const commonExtends = require('./controllers/common/commonExtends');

const port = parseInt(process.env.PORT, 10) || 8080;
const dev = process.env.NODE_ENV !== "production";
const server = express();

server.use(bodyParser.json({ limit: "50mb" }));
server.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
server.use(express.static(path.join(__dirname, "./dist")));
const index = path.resolve(__dirname, "./dist/index.html");

server.listen(port, () =>
  console.log(`Server Start Listening on port ${port}`)
);

// 세션설정
server.use(
  session({
    httpOnly: true,
    secure: true,
    secret: "vueTest",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
    rolling: true,
  })
);

server.get("*", (req, res) => {
  res.sendFile(index);
});
