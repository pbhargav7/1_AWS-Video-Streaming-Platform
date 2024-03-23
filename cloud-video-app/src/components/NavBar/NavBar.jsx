// components/NavBar.js

import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  MenuItem,
  Menu,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const [authState, setAuthState] = useState('loading');
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      setAuthState('signedIn');
      setUser(userData);
    } catch (error) {
      setAuthState('signedOut');
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      setAuthState('signedOut');
      setUser(null);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  if (authState === 'loading') {
    return null;
  }

  return (
    <AppBar position="static" className="AppBar">
      <Toolbar className="Toolbar">
        <Link to="/" className="Logo">
          Cloud Video Streaming
        </Link>
        {authState === 'signedIn' && user ? (
          <>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                component={Link}
                to="/catalog"
                onClick={handleClose}
                className="Menu-item"
              >
                Video Catalog
              </MenuItem>

              {user.signInUserSession.accessToken.payload['cognito:groups']?.includes('Admin') && (
                <MenuItem
                  component={Link}
                  to={{
                    pathname: '/upload',
                    state: { user },
                  }}
                  className="Menu-item"
                >
                  Upload Video
                </MenuItem>
              )}


              <MenuItem onClick={handleSignOut} className="Menu-item">Sign Out</MenuItem>
            </Menu>

          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/signup" className=".netflix-button">
              <h3>Sign Up</h3>
            </Button>
            <Button color="inherit" component={Link} to="/signin" className=".netflix-button">
              <h3>Sign In</h3>
            </Button>
          </>
        )}
      </Toolbar>

    </AppBar>
  );
};

export default NavBar;