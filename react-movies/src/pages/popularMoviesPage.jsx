import React, { useState } from "react";
import { getPopularMovies } from "../api/tmdb-api";
import MoviePageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import Stack from "@mui/material/Stack";

const PopularMoviesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["popularMovies", currentPage],
    queryFn: () => getPopularMovies(currentPage),
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh', width: '100%' }}>
      <MoviePageTemplate
        title="Popular Movies"  
        movies={movies}
        action={(movie) => {
          return (
            <Stack direction="row" spacing={1}>
              <AddToFavoritesIcon movie={movie} />
              <AddToPlaylistIcon movie={movie} />
            </Stack>
          );
        }}
        currentPage={currentPage}
        totalPages={data.total_pages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PopularMoviesPage;