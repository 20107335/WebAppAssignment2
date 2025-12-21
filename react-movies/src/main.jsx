import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import TrendingMoviesPage from "./pages/trendingMoviesPage";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import NowPlayingPage from "./pages/nowPlayingPage";
import PlaylistContextProvider from "./contexts/playlistContext";
import PlaylistPage from "./pages/playlistPage";
import ActorDetailsPage from "./pages/actorDetailsPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import MovieGenresPage from "./pages/movieGenresPage";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import { AuthProvider } from "./contexts/authenticationContext";




const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
        <BrowserRouter>
          <SiteHeader />
          <MoviesContextProvider>
            <PlaylistContextProvider>
              <Routes>
                <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
                <Route path="/reviews/:id" element={<MovieReviewPage />} />
                <Route path="/movies/playlist" element={<PlaylistPage />} />
                <Route path="/movies/:id" element={<MoviePage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/actor/:id" element={<ActorDetailsPage />} />
                <Route path="/reviews/form" element={<AddMovieReviewPage />} />
                <Route path="/movies/trending/today" element={<TrendingMoviesPage />} />
                <Route path="/movies/top_rated" element={<TopRatedMoviesPage />} />
                <Route path="/movies/popular" element={<PopularMoviesPage />} />
                <Route path="/movies/now_playing" element={<NowPlayingPage />} />
                <Route path="/playlist" element={<PlaylistPage />} />
                <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
                <Route path="/movies/genres" element={<MovieGenresPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
              </Routes>
            </PlaylistContextProvider>
          </MoviesContextProvider>
        </BrowserRouter>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);