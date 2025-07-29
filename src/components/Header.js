import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <DirectionsCarIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CarBhejo
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/"
          >
            Home
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/booking"
          >
            Book Transport
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/tracking"
          >
            Track Order
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 