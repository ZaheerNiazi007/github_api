import React from "react";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { GitHub } from "@mui/icons-material";

function NavBar() {
  return (
    <AppBar position="static" style={{ backgroundColor: "#3f51b5" }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <GitHub />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1, color: "white" }}>
          Github Users
        </Typography>
        <Button color="inherit" disabled>
          Sigout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
