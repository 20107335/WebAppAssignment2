import React from "react";
import { getMovieRecommendations } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Chip, Box, Typography } from "@mui/material";

const MovieRecommendations = ({ movieId }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["recommendations", movieId],
    queryFn: () => getMovieRecommendations(movieId),
  });

  if (isLoading) return <div>Loading recommendations...</div>;
  if (error) return <div>Error loading recommendations</div>;
  
  const recommendations = data?.results || [];
  if (recommendations.length === 0) return null;

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>Recommended Movies</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {recommendations.slice(0, 8).map(movie => (
          <Link to={`/movies/${movie.id}`} key={movie.id} style={{ textDecoration: 'none' }}>
            <Chip label={movie.title} clickable variant="outlined" />
          </Link>
        ))}
      </Box>
    </Box>
  );
};
//
export default MovieRecommendations;