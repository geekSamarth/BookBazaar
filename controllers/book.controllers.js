const booksTable = require("../models/book.models.js");
const db = require("../db");
const { eq } = require("drizzle-orm");

exports.getAllBooks = async function (req, res) {
  const books = await db.select().from(booksTable);
  return res.json(books);
};

exports.getBookById = async function (req, res) {
  const id = req.params.id;
  const [book] = await db
    .select()
    .from(booksTable)
    .where((table) => eq(table.id, id));
  if (!book) {
    res.status(404).json({ message: "Book not found!" });
  }
  return res.status(200).json({ message: "Book fetched successfully" }, book);
};

exports.createNewBook = async function (req, res) {
  const { id, title, description } = req.body;
  if (!id || !title) {
    res.status(400).json({ message: "please provide value for title" });
  }
  const book = await db.insert(booksTable).values({ id, title, description });
  if (!book) {
    return res
      .status(500)
      .json({ message: "Error while creating a new book!" });
  }
  return res.status(201).json({ message: "Book created successfully!", book });
};

exports.deleteBook = async function (req, res) {
  const id = req.params.id;
  await db.delete(booksTable).where((table) => eq(table.id, id));
  return res.status(200).json({ message: "book deleted successfully!" });
};
