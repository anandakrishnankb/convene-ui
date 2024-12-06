import React from 'react';
import { Typography, Button, Container } from '@mui/material';

const EventManagement: React.FC = () => {
  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Create or Manage Your Event
      </Typography>
      <Button variant="contained" color="primary">
        Create New Event
      </Button>
    </Container>
  );
};

export default EventManagement;
