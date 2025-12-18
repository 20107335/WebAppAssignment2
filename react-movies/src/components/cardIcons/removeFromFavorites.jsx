import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { PlaylistContext } from "../../contexts/playlistContext";

const RemoveFromPlaylistIcon = ({ movie }) => {
  const context = useContext(PlaylistContext);

  const handleRemoveFromPlaylist = (e) => {
    e.preventDefault();
    context.removeFromPlaylist(movie.id);
  };
  
  return (
    <IconButton
      aria-label="remove from playlist"
      onClick={handleRemoveFromPlaylist}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromPlaylistIcon;