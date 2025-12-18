import React, { useContext, useState } from "react";
import MoviePageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
  const {favorites: movieIds } = useContext(MoviesContext);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 40;

  const favoriteMovieQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ['movie', { id: movieId }],
        queryFn: getMovie,
      }
    })
  });
  
  const isPending = favoriteMovieQueries.find((m) => m.isPending === true);

  if (isPending) {
    return <Spinner />;
  }

  const movies = favoriteMovieQueries.map((q) => {
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

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh', width: '100%' }}>
      <MoviePageTemplate
        title="Favorite Movies"
        movies={paginatedMovies}
        action={(movie) => {
          return (
            <>
              <RemoveFromFavorites movie={movie} />
              <WriteReview movie={movie} />
            </>
          );
        }}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default FavoriteMoviesPage;