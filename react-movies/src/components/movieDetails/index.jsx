import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import React, { useState, useContext } from "react";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import LanguageIcon from '@mui/icons-material/Language';
import MovieCast from "../movieCast";
import MovieRecommendations from "../movieRecommendations";
import UserReviews from "../userReviews";
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authenticationContext";

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [refreshReviews, setRefreshReviews] = useState(0);
  const { isAuthenticated } = useContext(AuthContext);

  const handleReviewSubmitted = () => {
    setRefreshReviews(prev => prev + 1);
  };

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Genres" sx={{...chip}} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
        <Chip
         icon = {<LanguageIcon/>}
         label ={`Original Language: ${movie.original_language}`} />
      </Paper>
      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Production Countries" sx={{ ...chip }} color="primary" />
        </li>
        {movie.production_countries.map((c) => (
          <li key={c.name}>
            <Chip label={c.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>

      <MovieCast movieId={movie.id} />
      <MovieRecommendations movieId={movie.id} />

      <UserReviews movieId={movie.id} refreshTrigger={refreshReviews} />

      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        TMDB Reviews
      </Fab>

      {isAuthenticated && (
        <Fab
          component={Link}
          to="/reviews/form"
          state={{ 
            movieId: movie.id
          }}
          color="primary"
          variant="extended"
          sx={{
            position: 'fixed',
            bottom: '5em',
            right: '1em'
          }}
        >
          <AddIcon />
          Add Review
        </Fab>
      )}

      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
    </>
  );
};

export default MovieDetails;