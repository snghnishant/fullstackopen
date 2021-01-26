require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();
const blogRouter = require("./controllers/blog.js");
const middleware = require("./utils/middleware");

// Connection to DB
const url = process.env.MONGODB_URI;
console.log("Connecting to database...");
mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => {
        console.log("Connection successful!");
    })
    .catch((error) => {
        console.error("Error connecting to DB", error.message);
    });
// Using Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use("/api", blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
