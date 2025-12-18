import React, { useContext, useState } from "react";
import MoviePageTemplate from "../components/templateMovieListPage";
import { PlaylistContext } from "../contexts/playlistContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromPlaylistIcon from "../components/cardIcons/removeFromPlaylist";
import { Typography, Box } from "@mui/material";

const PlaylistPage = () => {
  const { playlists } = useContext(PlaylistContext);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 40;

  const playlistMovieQueries = useQueries({
    queries: playlists.map((movie) => {
      return {
        queryKey: ['movie', { id: movie.id }],
        queryFn: getMovie,
      }
    })
  });
  
  const isPending = playlistMovieQueries.find((m) => m.isPending === true);

  if (isPending) {
    return <Spinner />;
  }

  const movies = playlistMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  const totalPages = Math.ceil(movies.length / moviesPerPage);
  const startIndex = (currentPage - 1) * moviesPerPage;
  const paginatedMovies = movies.slice(startIndex, startIndex + moviesPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  if (movies.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          My Playlist
        </Typography>
        <Typography variant="h6">
          Your playlist is empty. Add some movies!
        </Typography>
      </Box>
    );
  }

  return (
    <MoviePageTemplate
      title="My Playlist"
      movies={paginatedMovies}
      action={(movie) => {
        return (
          <RemoveFromPlaylistIcon movie={movie} />
        );
      }}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
};

export default PlaylistPage;