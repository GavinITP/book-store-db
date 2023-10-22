import {
  Box,
  Button,
  CircularProgress,
  Input,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Book } from "./Home";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const [book, setBook] = useState<Book>({
    title: "",
    author: "",
    publishYear: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(import.meta.env.VITE_BASE_URL + "/" + id)
      .then((res) => {
        console.log(res.data);
        setBook(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  }, []);

  const handleUpdateBook = () => {
    if (!book.title || !book.author || !book.publishYear) return;

    setBook(book);
    setIsLoading(true);
    axios
      .put(import.meta.env.VITE_BASE_URL + "/" + id, book)
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
            value={book.title}
            sx={{ width: "100%" }}
          />
        </Box>

        <Box sx={{ marginInline: "auto", width: "50rem", marginTop: "3rem" }}>
          <InputLabel htmlFor="author">Author</InputLabel>
          <Input
            id="author"
            onChange={(e) => setBook({ ...book, author: e.target.value })}
            value={book.author}
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
            value={book.publishYear || 0}
            sx={{ width: "100%" }}
          />
        </Box>
      </Box>
      {isLoading ? <CircularProgress /> : null}

      <Box sx={{ marginInline: "auto", width: "50rem", marginTop: "3rem" }}>
        <Button onClick={handleUpdateBook}>Update book</Button>
      </Box>
    </form>
  );
};

export default EditBook;
