import React, { useState, useEffect, useContext } from "react";
import {Container,Typography,Card,CardContent,Grid,Button,Box,CardMedia,Chip,Stack} from"@mui/material";
import { AuthContext } from "../contexts/authenticationContext";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

const UserReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserReviews();
    }
  }, [isAuthenticated]);

  const fetchUserReviews = async () => {
    try {
      const token = localStorage.getItem("token");
      const cleanedToken = token.startsWith("BEARER ") ? token.substring(7) : token;
      const response = await fetch("http://localhost:8080/api/reviews/user", {
        headers: {
          Authorization: `BEARER ${cleanedToken}`
        }
      });
      if (!response.ok) throw new Error("Failed to fetch reviews");
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching my reviews:", error);
      alert("Failed to load reviews");
    }
  };

  const deleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      const token = localStorage.getItem("token");
      const cleanedToken = token.startsWith("BEARER ") ? token.substring(7) : token;
      const response = await fetch(`http://localhost:8080/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `BEARER ${cleanedToken}`
        }
      });
      if (!response.ok) throw new Error("Failed to delete review");
      fetchUserReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Failed to delete review");
    }
  };

  if (!isAuthenticated) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5">Please login to view your reviews</Typography>
        <Button component={Link} to="/login" variant="contained" sx={{ mt: 2 }}>
          Login
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Reviews ({reviews.length})
      </Typography>

      {reviews.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            You haven't written any reviews yet.
          </Typography>
          <Button component={Link} to="/" variant="contained">
            Browse Movies
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {reviews.map((review) => (
            <Grid item xs={12} md={6} key={review._id}>
              <Card sx={{ display: 'flex', height: '100%' }}>
                <Box sx={{ width: 140, display: { xs: 'none', sm: 'block' } }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 140, height: 210, objectFit: 'cover' }}
                    image={`https://image.tmdb.org/t/p/w500${review.posterPath}`}
                    alt="Movie poster"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/140x210?text=No+Image';
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography component="div" variant="h6" sx={{ fontWeight: 'bold' }}>
                        {review.title || `Movie #${review.movieId}`}
                      </Typography>
                      <Chip label={`${review.rating}/5`} color="primary" size="small" />
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {new Date(review.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        mb: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical'
                      }}
                    >
                      {review.content}
                    </Typography>

                    <Stack direction="row" spacing={1}>
                      <Button
                        component={Link}
                        to={`/movies/${review.movieId}`}
                        variant="outlined"
                        size="small"
                        startIcon={<VisibilityIcon />}
                      >
                        View Movie
                      </Button>

                      <Button
                        component={Link}
                        to={`/my-reviews/edit/${review._id}`}
                        variant="outlined"
                        size="small"
                        startIcon={<EditIcon />}
                      >
                        Update
                      </Button>

                      <Button
                        color="error"
                        onClick={() => deleteReview(review._id)}
                        size="small"
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default UserReviewsPage;
