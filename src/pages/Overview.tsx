import React from 'react';
import { Typography, Box, Grid, Card, CardContent } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from '@mui/lab';
import VideoBackground from '../components/VideoBackground';
import TopMenuBar from '../components/TopMenuBar'; // Import the TopMenuBar component

type Event = {
  name: string;
  location: string;
  date: string;
};

const Overview: React.FC = () => {
  const upcomingEvents = [
    { name: 'Tech Expo 2024', location: 'San Francisco', date: '2024-11-15' },
    { name: 'AI Conference', location: 'New York', date: '2024-12-05' },
    { name: 'Healthcare Summit', location: 'Los Angeles', date: '2025-01-10' },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 12000 },
    { month: 'Feb', revenue: 15000 },
    { month: 'Mar', revenue: 10000 },
    { month: 'Apr', revenue: 18000 },
    { month: 'May', revenue: 25000 },
    { month: 'Jun', revenue: 22000 },
    { month: 'Jul', revenue: 24000 },
    { month: 'Aug', revenue: 19000 },
    { month: 'Sep', revenue: 23000 },
    { month: 'Oct', revenue: 21000 },
    { month: 'Nov', revenue: 26000 },
    { month: 'Dec', revenue: 30000 },
  ];


  const sponsorshipData = [
    { name: 'Tech Expo 2024', sponsors: 35 },
    { name: 'AI Conference', sponsors: 25 },
    { name: 'Healthcare Summit', sponsors: 18 },
    { name: 'Marketing and Media Forum', sponsors: 22 },
    { name: 'Sustainability Expo', sponsors: 15 },
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
      <TopMenuBar />
      <Box sx={{ position: 'relative', overflow: 'hidden', p: 3 }}>

        {/* Video Background */}
        {/* <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}

        {/* Dark Overlay with Blur */}
        {/* <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(10px)',
          zIndex: -1,
        }}
      /> */}

        <VideoBackground />

        {/* Page Content */}
        <Typography variant="h4" gutterBottom color="white">
          Overview
        </Typography>
        <Grid container spacing={2}>
  {/* Key Metrics */}
  <Grid item xs={12} md={3}>
    <Card sx={darkGlassMorphicStyle}>
      <CardContent>
        <Typography variant="h6">Total Events Created</Typography>
        <Typography variant="h4">58</Typography>
      </CardContent>
    </Card>
  </Grid>

  <Grid item xs={12} md={3}>
    <Card sx={darkGlassMorphicStyle}>
      <CardContent>
        <Typography variant="h6">Total Events Completed</Typography>
        <Typography variant="h4">45</Typography>
      </CardContent>
    </Card>
  </Grid>

  <Grid item xs={12} md={3}>
    <Card sx={darkGlassMorphicStyle}>
      <CardContent>
        <Typography variant="h6">Revenue Generated</Typography>
        <Typography variant="h4">$1,200,000</Typography>
      </CardContent>
    </Card>
  </Grid>

  <Grid item xs={12} md={3}>
    <Card sx={darkGlassMorphicStyle}>
      <CardContent>
        <Typography variant="h6">Total Sponsorships</Typography>
        <Typography variant="h4">142</Typography>
      </CardContent>
    </Card>
  </Grid>

  {/* Upcoming Events Section */}
  <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
    <Typography variant="h5" sx={{ mt: 4, color: 'white' }}>Upcoming Events</Typography>
    {/* Timeline aligned to the left */}
    <Timeline position="right" sx={{ mt: 2, width: '100%', ml: '-400px' }}>
      {upcomingEvents.map((event, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            {index < upcomingEvents.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6" sx={{ color: 'white' }}>{event.name}</Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>{event.location}</Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>{event.date}</Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  </Grid>

  {/* Graphs */}
  <Grid item xs={12} md={6} sx={{ mt: 4, ml: '-400px' }}>
    <Card sx={darkGlassMorphicStyle}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Revenue Trend</Typography>
        <LineChart width={650} height={300} data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </CardContent>
    </Card>
  </Grid>

  <Grid item xs={12} md={6}>
    <Card sx={darkGlassMorphicStyle}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Sponsorship Engagement</Typography>
        <BarChart
          width={650}
          height={300}
          data={sponsorshipData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={100}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sponsors" fill="#82ca9d" radius={[5, 5, 0, 0]} />
        </BarChart>
      </CardContent>
    </Card>
  </Grid>
</Grid>





      </Box>
    </>
  );
};

export default Overview;
