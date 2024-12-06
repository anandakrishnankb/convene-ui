import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Link as MuiLink,
  Card,
  Container,
  Snackbar,
  Alert,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import the Auth context
import VideoBackground from '../components/VideoBackground';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });

  const [fadeIn, setFadeIn] = useState(false);
  
  type SnackbarSeverity = 'success' | 'error' | undefined;

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<SnackbarSeverity>('success');

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!credentials.username || !credentials.password) {
      setSnackbarMessage('Please fill in all fields.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    // Attempt to log in with provided credentials
    const isLoggedIn = login(credentials.username, credentials.password);
    
    if (isLoggedIn) {
      navigate('/overview'); // Redirect to dashboard on successful login
    } else {
      setSnackbarMessage('Invalid username or password.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <>
      <VideoBackground />
      <Box
        sx={{
          minHeight: '100vh',
          width: '100vw',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 2 }}>
          <Card
            sx={{
              opacity: fadeIn ? 1 : 0,
              transform: fadeIn ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 1.2s ease, transform 1.2s ease',
              backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background
              backdropFilter: 'blur(10px)', // Blur effect for glassmorphism
              borderRadius: '16px', // Rounded corners
              boxShadow: '0 4px 30px rgba(0,0,0,0.1)', // Subtle shadow for depth
              p: { xs: 3, sm: 4 },
            }}
          >
            <Typography variant="h5" component="h1" sx={{ mb: 3, fontWeight: 600, textAlign: 'center', color: '#fff' }}>
              Login
            </Typography>

            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <TextField
                  fullWidth
                  name="username"
                  label="Username"
                  variant="outlined"
                  value={credentials.username}
                  onChange={handleChange}
                  InputProps={{
                    style: {
                      backgroundColor: 'rgba(255,255,255,0.2)', // Input background color
                      borderRadius: '8px', // Rounded corners for input fields
                    },
                  }}
                />

                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={credentials.password}
                  onChange={handleChange}
                  InputProps={{
                    style: {
                      backgroundColor: 'rgba(255,255,255,0.2)', // Input background color
                      borderRadius: '8px', // Rounded corners for input fields
                    },
                  }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <FormControlLabel
                    control={<Checkbox name="rememberMe" checked={credentials.rememberMe} onChange={handleChange} />}
                    label={<Typography color="#fff">Remember me</Typography>}
                  />
                  <MuiLink href="#" variant="body2" sx={{ color: '#fff' }}>
                    Forgot password?
                  </MuiLink>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 2,
                    py: 1.5,
                    textTransform: 'none',
                    backgroundColor: '#1976d2', // Custom button color
                    '&:hover': {
                      backgroundColor: '#115293', // Darker shade on hover
                    },
                  }}
                >
                  Login
                </Button>

                <Typography variant="body2" align="center" sx={{ mt: 2, color:'#fff' }}>
                  Don't have an account?{' '}
                  <Link to="/register" style={{ color:'#1976d2' }}>
                    Register
                  </Link>
                </Typography>
              </Box>
            </form>

            {/* Snackbar for notifications */}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
              <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                {snackbarMessage}
              </Alert>
            </Snackbar>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default LoginPage;