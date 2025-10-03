// get all the books from the db

app.get("/books", (req, res) => {
  res.json(books);
});

// get any single book

app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id))
    return res.status(400).json({ error: `Id must be of type integer` });

  const book = books.find((e) => e.id == id);

  if (!book) {
    return res
      .status(404)
      .json({ error: `Book with id ${id} doesn't exists.` });
  }
  return res.status(200).json(book);
});

// create a book and save it in the DB

app.post("/book", (req, res) => {
  // receiving new book data from req.body
  const { title, author } = req.body;

  // applying validation
  if (!title || title == "") {
    return res.status(400).json({ message: "title is required" });
  }
  if (!author || author == "") {
    return res.status(400).json({ message: "author is required." });
  }
  const id = books.length + 1;
  const book = { id, title, author };
  books.push(book);
  return res
    .status(201)
    .json({ message: "new book created successfully!", id });
});

// delete a book from the local DB

app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Please enter a valid Book ID." });
  }
  const indexToDelete = books.findIndex((e) => e.id == id);
  if (indexToDelete < 0) {
    return res
      .status(400)
      .json({ message: `Book with Id ${id} does not exits.` });
  }
  books.splice(indexToDelete, 1);
  return res.status(200).json({ message: `Book deleted successfully.` });
});
