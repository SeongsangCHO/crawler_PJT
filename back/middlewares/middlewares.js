const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");

const middlewares = (app) => {
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.json()); //body-parser 대신사용할수있음.
};

module.exports = middlewares;