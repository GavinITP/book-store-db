import { Box, Button, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DeleteBook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDeleteBook = () => {
    setIsLoading(true);
    axios
      .delete(import.meta.env.VITE_BASE_URL + "/" + id)
      .then(() => {
        setIsLoading(false);
        navigate("/");
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });
  };
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography
        variant="h3"
        fontWeight={700}
        sx={{ marginBottom: "1rem", marginTop: "3rem" }}
      >
        Delete Book
      </Typography>
      <Typography>Are you sure to delete this book?</Typography>
      {isLoading ? <CircularProgress /> : null}
      <Button
        onClick={handleDeleteBook}
        color="error"
        variant="contained"
        sx={{ marginInline: "auto", marginTop: "3rem" }}
      >
        Delete
      </Button>
    </Box>
  );
};

export default DeleteBook;
