import React from "react";
import { Pagination } from "@mui/material";

const MoviePagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={(event, page) => onPageChange(page)}
      color="primary"
      size="large"
    />
  );
};

export default MoviePagination;