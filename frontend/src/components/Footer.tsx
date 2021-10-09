import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Footer() {
  return (
    <footer>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body1">Copyright &copy; Book Me</Typography>
      </Box>
    </footer>
  );
}

export default Footer;
