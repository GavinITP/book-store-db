import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();
const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;

app.use(express.json());

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Connected to DB");

    app.listen(PORT, () => {
      console.log("listening on port", PORT);
    });
  })
  .catch((e) => {
    console.log("Error:", e);
    res.status(500).json({ message: e.message });
  });

// get all books

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({ count: books.length, data: books });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});

// get a book by id

app.get("/books/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});

// add a book

app.post("/books", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res
        .status(400)
        .json({ message: "Please send all required fields" });
    }
    const book = await Book.create(req.body);
    return res.status(201).send(book);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});

// update a book by id

app.put("/books/:id", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res
        .status(400)
        .json({ message: "Please send all required fields" });
    }

    const id = req.params.id;
    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(result);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const id = req.body.id;
    const book = await Book.deleteOne(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(book);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});
