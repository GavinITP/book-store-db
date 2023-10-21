import { Box, Button, CircularProgress, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Link } from "react-router-dom";

export interface Book {
  _id: string;
  title: string;
  author: string;
  publishYear: number;
  createdAt: Date;
  updatedAt: Date;
}

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(import.meta.env.VITE_BASE_URL)
      .then((res) => {
        setBooks(res.data.data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log((e as AxiosError).message);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <Typography
        variant="h2"
        component="h1"
        textAlign="center"
        fontWeight={700}
        mt={4}
        mb={6}
      >
        Book Store
      </Typography>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#000" }}>
                <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                  Book ID.
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", fontWeight: 700 }}
                  align="right"
                >
                  Title
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", fontWeight: 700 }}
                  align="right"
                >
                  Author
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", fontWeight: 700 }}
                  align="right"
                >
                  Publish Year
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", fontWeight: 700 }}
                  align="right"
                >
                  Operations
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book) => (
                <TableRow
                  key={book._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {book._id}
                  </TableCell>
                  <TableCell align="right">{book.title}</TableCell>
                  <TableCell align="right">{book.author}</TableCell>
                  <TableCell align="right">{book.publishYear}</TableCell>
                  <TableCell
                    align="right"
                    sx={{ display: "flex", gap: "0.8rem" }}
                  >
                    <Link to={`/books/delete/${book._id}`}>
                      <DeleteIcon sx={{ color: "#000" }} />
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                      <EditIcon sx={{ color: "#000" }} />
                    </Link>
                    <Link to={`/books/details/${book._id}`}>
                      <InfoIcon sx={{ color: "#000" }} />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Link to="/books/create">
          <Button
            sx={{
              backgroundColor: "#000",
              marginTop: "2rem",
              alignSelf: "right",
              ":hover": {
                backgroundColor: "#000",
              },
            }}
            variant="contained"
            endIcon={<AddCircleIcon />}
          >
            Add new book
          </Button>
        </Link>
      </Box>
    </div>
  );
};

export default Home;
