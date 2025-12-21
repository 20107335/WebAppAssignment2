export const getMovies = () => {
  return fetch(
    `http://localhost:8080/api/movies/discover`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};

export const getMovie = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return fetch(`http://localhost:8080/api/movies/${id}`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch movie");
      return res.json();
    });
};


export const getGenres = () => {
  return fetch("http://localhost:8080/api/movies/genres")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch genres");
      }
      return response.json();
    });
};


export const getMovieImages = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return fetch(`http://localhost:8080/api/movies/${id}/images`)
    .then((res) => res.json());
};


export const getTopRatedMovies = (page = 1) => {
  return fetch(
    `http://localhost:8080/api/movies/top-rated?page=${page}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch top rated movies");
    }
    return response.json();
  });
};


export const getUpcomingMovies = (page = 1) => {
  return fetch(
    `http://localhost:8080/api/movies/upcoming?page=${page}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch upcoming movies");
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovieGenres = () => {
  return fetch(
    "http://localhost:8080/api/movies/genres"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch genres");
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};



export const getPopularMovies = (page = 1) => {
  return fetch(
    `http://localhost:8080/api/movies/popular?page=${page}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch popular movies");
    }
    return response.json();
  });
};


export const getNowPlaying = (page = 1) => {
  return fetch(
    `http://localhost:8080/api/movies/now-playing?page=${page}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch now playing movies");
    }
    return response.json();
  });
};

export const getTrendingMovies = (page = 1) => {
  return fetch(
    `http://localhost:8080/api/movies/trending?page=${page}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch trending movies");
    }
    return response.json();
  });
};

export const getMovieCredits = (id) => {
  return fetch(`http://localhost:8080/api/movies/${id}/credits`)
    .then((res) => res.json());
};

export const getActorDetails = (actorId) => {
  return fetch(`http://localhost:8080/api/movies/actor/${actorId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch actor details");
      }
      return response.json();
    });
};

export const getActorMovieCredits = (actorId) => {
  return fetch(`http://localhost:8080/api/movies/actor/${actorId}/credits`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch actor movie credits");
      }
      return response.json();
    });
};


export const getMovieRecommendations = (id) => {
  return fetch(`http://localhost:8080/api/movies/${id}/recommendations`)
    .then((res) => res.json());
};


export const getMovieReviews = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return fetch(`http://localhost:8080/api/movies/${id}/reviews`)
    .then((res) => res.json());
};
