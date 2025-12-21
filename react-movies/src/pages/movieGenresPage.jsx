import React from "react";
import { getGenres } from "../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";

const GenresPage = () => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh", color: "white", padding: "2rem" }}>
      <h1>Movie Genres</h1>
      <ul>
        {data.genres.map((genre) => (
          <li key={genre.id} style={{ fontSize: "1.2rem", margin: "0.5rem 0" }}>
            {genre.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenresPage;
