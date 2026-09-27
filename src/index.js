require("dotenv/config");
const express = require("express");
const bookRouter = require("./routes/book.routes.js");
const authorRouter = require("./routes/author.routes.js");

const app = express();

// middlewares

app.use(express.json());

// book routes
app.use("/books", bookRouter);

// author routes
app.use("/authors", authorRouter);

// listening the server on a port
app.listen(8000, () => {
  console.log("Server is running on Port:8000");
});
