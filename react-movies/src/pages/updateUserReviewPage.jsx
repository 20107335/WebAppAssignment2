import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const UpdateUserReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReview();
  }, []);

  const loadReview = async () => {
    const token = localStorage.getItem("token");
    const cleanedToken = token.startsWith("BEARER ") ? token.substring(7) : token;

    const res = await fetch("http://localhost:8080/api/reviews/user", {
      headers: {
        Authorization: `BEARER ${cleanedToken}`,
      },
    });

    const reviews = await res.json();
    const review = reviews.find(r => r._id === id);

    if (!review) {
      navigate("/my-reviews");
      return;
    }

    setContent(review.content);
    setRating(review.rating);
    setLoading(false);
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    const cleanedToken = token.startsWith("BEARER ") ? token.substring(7) : token;

    const res = await fetch(`http://localhost:8080/api/reviews/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `BEARER ${cleanedToken}`,
      },
      body: JSON.stringify({
        content,
        rating,
      }),
    });

    if (!res.ok) {
      alert("Update failed");
      return;
    }

    navigate("/my-reviews");
  };

  if (loading) {
    return <Typography sx={{ mt: 4 }}>Loading...</Typography>;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Edit Review</Typography>

      <TextField
        label="Review"
        fullWidth
        multiline
        minRows={6}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Rating"
        type="number"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        sx={{ mb: 2 }}
      />

      <Box>
        <Button variant="contained" onClick={handleUpdate}>
          Update Review
        </Button>
      </Box>
    </Container>
  );
};

export default UpdateUserReviewPage;
