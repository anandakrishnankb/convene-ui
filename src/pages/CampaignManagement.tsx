import React from 'react';
import { Typography, Button, Container } from '@mui/material';

const CampaignManagement: React.FC = () => {
  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Run and Track Your Campaigns
      </Typography>
      <Button variant="contained" color="primary">
        Create New Campaign
      </Button>
    </Container>
  );
};

export default CampaignManagement;
