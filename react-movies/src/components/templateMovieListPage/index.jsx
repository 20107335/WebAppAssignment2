import React, { useState, useEffect } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import MoviePagination from "../pagination"; 

function MovieListPageTemplate({ movies, title, action, currentPage, totalPages, onPageChange }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState([]);
  const [yearRange, setYearRange] = useState([1980, 2025]);
  const [filteredMovies, setFilteredMovies] = useState(movies);

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(Array.isArray(value) ? value : [value]);
    else if (type === "yearRange") setYearRange(value);
  };

  
  useEffect(() => {
    const filtered = movies.filter(m => {
      const releaseYear = m.release_date ? parseInt(m.release_date.split("-")[0]) : 0;
      const withinYear = releaseYear >= yearRange[0] && releaseYear <= yearRange[1];
      const withinGenres = genreFilter.length === 0 || (m.genre_ids && m.genre_ids.some(id => genreFilter.includes(id)));
      const withinTitle = nameFilter === "" || m.title.toLowerCase().includes(nameFilter.toLowerCase());
      return withinYear && withinGenres && withinTitle;
    });
    setFilteredMovies(filtered);
  }, [movies, yearRange, genreFilter, nameFilter]);

  
  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{flex: "1 1 500px"}}>
        <Grid 
          key="find" 
          size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} 
          sx={{padding: "20px"}}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            yearRange={yearRange}
          />
        </Grid>
         <MovieList action={action} movies={filteredMovies} startIndex={(currentPage - 1) * 20}/>
      </Grid>
    
      {totalPages > 1 && (
        <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 3 }}>
          <MoviePagination
            currentPage={currentPage}
            totalPages={Math.min(totalPages, 500)}
            onPageChange={onPageChange}
          />
        </Grid>
      )}
    </Grid>
  );
}
export default MovieListPageTemplate;