import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authenticationContext";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from "@mui/material";

const UserReviews = ({ movieId, refreshTrigger }) => {
  const [reviews, setReviews] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    fetchUserReviews();
  }, [movieId, refreshTrigger]);

  const fetchUserReviews = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/reviews/movie/${movieId}`);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching user reviews:", error);
    }
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ p: 2 }}>
        User Reviews ({reviews.length})
      </Typography>
      
      {reviews.length === 0 ? (
        <Typography sx={{ p: 2 }}>
          No user reviews yet. {isAuthenticated ? "Be the first to review!" : "Login to leave a review."}
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Review</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review._id}>
                <TableCell>{review.author}</TableCell>
                <TableCell>{review.rating}/5</TableCell>
                <TableCell>{review.content.substring(0, 100)}...</TableCell>
                <TableCell>
                  <Link to={`/movies/${review.movieId}`}>
                    <Button size="small">View Movie</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      
      {!isAuthenticated && (
        <Typography sx={{ p: 2 }}>
          <Link to="/login">Login</Link> to leave your own review
        </Typography>
      )}
    </TableContainer>
  );
};

export default UserReviews;