import { CircularProgress, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Link } from "react-router-dom";

interface Book {
  _id: string;
  title: string;
  author: string;
  publishYear: number;
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
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Author</TableCell>
                <TableCell align="right">Publish Year</TableCell>
                <TableCell align="right">Operations</TableCell>
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
                  <TableCell align="right">
                    <Link to="/books/details/${}"></Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Home;
