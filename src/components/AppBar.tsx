import React from "react";
import { AppBar as MuiAppBar, Toolbar, Typography } from "@mui/material";

const AppBar = () => {
  return (
    <>
      <MuiAppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Notas App
          </Typography>
        </Toolbar>
      </MuiAppBar>
    </>
  );
};

export default AppBar;
