// contexts/playlistContext.jsx
import React, { useState, createContext } from "react";

export const PlaylistContext = createContext(null);

const PlaylistContextProvider = (props) => {
  const [playlists, setPlaylists] = useState([]);

  const addToPlaylist = (movie) => {
    // Check if movie is already in playlist to avoid duplicates
    if (!playlists.find(m => m.id === movie.id)) {
      setPlaylists([...playlists, movie]);
    }
  };

  const removeFromPlaylist = (movieId) => {
    setPlaylists(playlists.filter(m => m.id !== movieId));
  };

  return (
    <PlaylistContext.Provider value={{ 
      playlists, 
      addToPlaylist, 
      removeFromPlaylist 
    }}>
      {props.children}
    </PlaylistContext.Provider>
  );
};

export default PlaylistContextProvider;