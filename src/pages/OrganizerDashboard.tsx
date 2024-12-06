// src/pages/OrganizerDashboard.tsx
import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';

const organizerMetrics = [
  { title: 'Total Revenue', value: '$500,000' },
  { title: 'Attendees Registered', value: '1,000' },
  { title: 'Sponsors', value: '10' },
];

const OrganizerDashboard = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Event Organizer Dashboard
      </Typography>
      <Grid container spacing={2}>
        {organizerMetrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">{metric.title}</Typography>
                <Typography variant="h5">{metric.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OrganizerDashboard;
