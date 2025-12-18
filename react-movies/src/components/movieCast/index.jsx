import React from "react";
import { getMovieCredits } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Chip, Box, Typography } from "@mui/material";

const MovieCast = ({ movieId }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["movieCredits", movieId],
    queryFn: () => getMovieCredits(movieId),
  });

  if (isLoading) return <div>Loading cast...</div>;
  if (error) return <div>Error loading cast</div>;

  const cast = data?.cast || [];

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>Cast</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {cast.slice(0, 10).map(actor => (
          <Link to={`/actor/${actor.id}`} key={actor.id} style={{ textDecoration: 'none' }}>
            <Chip 
              label={actor.name} 
              clickable 
              variant="outlined"
            />
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default MovieCast;