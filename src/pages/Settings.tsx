import React from 'react';
import { Typography, Button, Container } from '@mui/material';

const Settings: React.FC = () => {
  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Account Settings
      </Typography>
      <Button variant="contained" color="secondary">
        Change Password
      </Button>
      <Button variant="contained" color="primary">
        Manage Payment Info
      </Button>
    </Container>
  );
};

export default Settings;
