import {
  Box,
  Button,
  CircularProgress,
  Input,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Book } from "./Home";
import { useNavigate } from "react-router-dom";

const CreateBook = () => {
  const [book, setBook] = useState<Book>({
    title: "",
    author: "",
    publishYear: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveBook = () => {
    if (!book.title || !book.author || !book.publishYear) return;

    setBook(book);
    setIsLoading(true);
    axios
      .post(import.meta.env.VITE_BASE_URL, book)
      .then(() => {
        setIsLoading(false);
        navigate("/");
      })
      .catch(() => {
        setIsLoading(false);
        navigate("/");
      });
  };

  return (
    <form>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ marginInline: "auto", width: "50rem", marginTop: "3rem" }}>
          <InputLabel htmlFor="title">Title</InputLabel>
          <Input
            id="title"
            onChange={(e) => setBook({ ...book, title: e.target.value })}
            sx={{ width: "100%" }}
          />
        </Box>

        <Box sx={{ marginInline: "auto", width: "50rem", marginTop: "3rem" }}>
          <InputLabel htmlFor="author">Author</InputLabel>
          <Input
            id="author"
            onChange={(e) => setBook({ ...book, author: e.target.value })}
            sx={{ width: "100%" }}
          />
        </Box>

        <Box sx={{ marginInline: "auto", width: "50rem", marginTop: "3rem" }}>
          <InputLabel htmlFor="publish-year">PublishYear</InputLabel>
          <Input
            id="publish-year"
            onChange={(e) =>
              setBook({ ...book, publishYear: parseInt(e.target.value) })
            }
            sx={{ width: "100%" }}
          />
        </Box>
      </Box>
      {isLoading ? <CircularProgress /> : null}

      <Box sx={{ marginInline: "auto", width: "50rem", marginTop: "3rem" }}>
        <Button onClick={handleSaveBook}>Add new book</Button>
      </Box>
    </form>
  );
};

export default CreateBook;
