import React from 'react';
import { Typography, Box, Grid, Card, CardContent } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import TopMenuBar from '../components/TopMenuBar';
import VideoBackground from '../components/VideoBackground';

const SponsorDashboard: React.FC = () => {
  const sponsorshipData = [
    { name: 'Tech Expo 2024', ROI: 150, visibility: 5000 },
    { name: 'AI Conference', ROI: 130, visibility: 4000 },
    { name: 'Healthcare Summit', ROI: 110, visibility: 3000 },
  ];

  const darkGlassMorphicStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#ffffff',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  };

  return (
    <>
      <VideoBackground />
      <TopMenuBar />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom color="white">
          Sponsor Dashboard
        </Typography>

        <Grid container spacing={2}>
          {/* Key Metrics */}
          <Grid item xs={12} md={4}>
            <Card sx={darkGlassMorphicStyle}>
              <CardContent>
                <Typography variant="h6">Total Events Sponsored</Typography>
                <Typography variant="h4">5</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={darkGlassMorphicStyle}>
              <CardContent>
                <Typography variant="h6">Average ROI (%)</Typography>
                <Typography variant="h4">135%</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={darkGlassMorphicStyle}>
              <CardContent>
                <Typography variant="h6">Total Visibility</Typography>
                <Typography variant="h4">12,000</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* ROI and Visibility Trends */}
          <Grid item xs={12}>
            <Card sx={darkGlassMorphicStyle}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Event ROI & Visibility</Typography>
                <BarChart width={800} height={400} data={sponsorshipData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="ROI" fill="#82ca9d" radius={[5, 5, 0, 0]} />
                  <Bar dataKey="visibility" fill="#8884d8" radius={[5, 5, 0, 0]} />
                </BarChart>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SponsorDashboard;
