import React from "react";
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getActorDetails, getActorMovieCredits } from '../api/tmdb-api';
import Spinner from '../components/spinner';
import { Box, Typography, Paper, Grid, Chip, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

const ActorDetailsPage = () => {
  const { id } = useParams();
  
  const { data: actor, error, isPending, isError } = useQuery({
    queryKey: ['actor', { id }],
    queryFn: () => getActorDetails(id),
  });

  const { data: movieCredits } = useQuery({
    queryKey: ['actorMovieCredits', { id }],
    queryFn: () => getActorMovieCredits(id),
    enabled: !!actor,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Avatar
              src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : ''}
              alt={actor.name}
              sx={{ width: 200, height: 300, mx: 'auto' }}
              variant="rounded"
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography variant="h4" gutterBottom>
              {actor.name}
            </Typography>
            {actor.biography && (
              <>
                <Typography variant="h6" gutterBottom>
                  Biography
                </Typography>
                <Typography variant="body1" paragraph>
                  {actor.biography}
                </Typography>
              </>
            )}
            <Box sx={{ mt: 2 }}>
              {actor.birthday && (
                <Typography variant="body2">
                  <strong>Born:</strong> {actor.birthday}
                  {actor.place_of_birth && ` in ${actor.place_of_birth}`}
                </Typography>
              )}
              {actor.deathday && (
                <Typography variant="body2">
                  <strong>Died:</strong> {actor.deathday}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {movieCredits && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Filmography
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {movieCredits.cast.slice(0, 20).map(movie => (
              <Link to={`/movies/${movie.id}`} key={movie.id} style={{ textDecoration: 'none' }}>
                <Chip 
                  label={movie.title} 
                  clickable 
                  variant="outlined"
                />
              </Link>
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default ActorDetailsPage;