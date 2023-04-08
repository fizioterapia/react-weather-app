import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={60} thickness={4} color="primary" />
    </div>
  );
}

export default Loader;
