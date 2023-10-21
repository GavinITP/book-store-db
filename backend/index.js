import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;

app.use(express.json());
app.use(cors());
app.use("/books", bookRoute);

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
