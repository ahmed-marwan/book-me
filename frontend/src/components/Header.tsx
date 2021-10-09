import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

function Header() {
  return (
    <header>
      <Box>
        <AppBar position="static">
          <Toolbar
            sx={{
              width: '70%',
              mx: 'auto',
              justifyContent: 'space-between',
            }}
          >
            <Link href="/" underline="none">
              <Typography variant="h5" color="whitesmoke">
                Book Me
              </Typography>
            </Link>
            <Box
              sx={{
                width: '20%',
                display: 'flex',
                justifyContent: 'space-around',
              }}
            >
              <Link href="/login" underline="none">
                <IconButton
                  size="large"
                  edge="start"
                  sx={{ color: 'whitesmoke' }}
                >
                  <AccountCircle />
                </IconButton>
                <Typography variant="button" color="whitesmoke">
                  login
                </Typography>
              </Link>

              <Link href="/mybooks" underline="none">
                <IconButton
                  size="large"
                  edge="start"
                  sx={{ color: 'whitesmoke' }}
                >
                  <LibraryBooksIcon />
                </IconButton>
                <Typography variant="button" color="whitesmoke">
                  my books
                </Typography>
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  );
}

export default Header;
