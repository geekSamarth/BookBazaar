require("dotenv/config");
const express = require("express");
const bookRouter = require("./routes/book.routes.js");

const app = express();

// middlewares

app.use(express.json());

app.use("/books", bookRouter);

// listening the server on a port
app.listen(8000, () => {
  console.log("Server is running on Port:8000");
});
