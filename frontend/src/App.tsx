import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ mt: 2.5 }}>
            Welcome to Book Me
          </Typography>
        </Box>
      </main>
      <Footer />
    </>
  );
}

export default App;
