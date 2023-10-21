import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Book } from "./Home";
import { Button, CircularProgress, Typography } from "@mui/material";

const ShowBook = () => {
  const [book, setBook] = useState<Book>();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(import.meta.env.VITE_BASE_URL + "/" + id)
      .then((res) => {
        setBook(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e.message);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <div>
      <Link to="/">
        <Button variant="outlined" sx={{ marginBottom: "3rem" }}>
          Back
        </Button>
      </Link>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography>Book Title: {book?.title}</Typography>
          <Typography>Book ID: {book?._id}</Typography>
          <Typography>Author: {book?.author}</Typography>
          <Typography>Publish Year: {book?.publishYear}</Typography>
          <Typography>
            Created At:{" "}
            {book?.createdAt ? new Date(book.createdAt).toString() : "N/A"}
          </Typography>
          <Typography>
            Updated At:{" "}
            {book?.createdAt ? new Date(book.updatedAt).toString() : "N/A"}
          </Typography>
        </>
      )}
    </div>
  );
};

export default ShowBook;
