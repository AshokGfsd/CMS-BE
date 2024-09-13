const express = require("express");
const cors = require("cors");
const contactRouter = require("./routes/contactRoutes");
const userRouter = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const requestLogger = require("./utils/logger");
const unknownEndpoint = require("./utils/Error");
const { URL } = require("./utils/config");

app = express();
app.use(
  cors({
    origin: URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);
app.use("/contacts", contactRouter);
app.use("/users", userRouter);
app.use(unknownEndpoint);
console.log("work")
module.exports = app;

