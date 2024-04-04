const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("client"));

const { Library } = require("./library");
const collection = new Library("mongodb://localhost:27017", "library", "books");

app.get("/books", async (req, res) => {
  const allBooks = await collection.allBooks();
  res.json(allBooks);
});

app.get("/books/:id", async (req, res) => {
  const id = req.params.id;
  const book = await collection.findOneBook(id);
  res.json(book);
});

app.post("/books/new", async (req, res) => {
  console.log(req.body);
  await collection.addBook(req.body);
  res.status(200);
});

app.post("/books/update/:id", async (req, res) => {
  const id = req.params.id;
  await collection.changeBook(id, req.body);
  res.status(200);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
