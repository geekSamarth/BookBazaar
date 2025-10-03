const express = require("express");
const router = express.Router();
const controller = require("../controllers/book.controllers.js");

// routes

router.get("/", controller.getAllBooks);
router.get("/:id", controller.getBookById);
router.post("/", controller.createNewBook);
router.delete("/:id", controller.deleteBook);

module.exports = router;
