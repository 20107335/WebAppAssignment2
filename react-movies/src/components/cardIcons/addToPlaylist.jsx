import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { PlaylistContext } from "../../contexts/playlistContext";

const AddToPlaylistIcon = ({ movie }) => {
  const { addToPlaylist } = useContext(PlaylistContext);

  const handleAddToPlaylist = (e) => {
    e.preventDefault();
    addToPlaylist(movie);
  };

  return (
    <IconButton aria-label="add to playlist" onClick={handleAddToPlaylist}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToPlaylistIcon;