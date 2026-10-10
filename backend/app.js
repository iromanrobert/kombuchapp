const express = require("express");
const mongoose = require("mongoose");

const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

const batchRouter = require("./controllers/batch");
const userRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");

const app = express();

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB", error.message);
  });

app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/batch", batchRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
