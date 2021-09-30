import React from 'react';
import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const StyledAppBar = styled(AppBar)(({ theme }) => ({

    backgroundColor: "#023047",
  
}));
  

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ColorMovies
          </Typography>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
}
