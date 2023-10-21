import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// get all books

router.get("/", async (_req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({ count: books.length, data: books });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});

// get a book by id

router.get("/:id", async (req, res) => {
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

router.post("/", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

// delete a book by

router.delete("/:id", async (req, res) => {
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

export default router;
