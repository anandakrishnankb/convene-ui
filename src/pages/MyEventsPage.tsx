import React, { useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, TextField, FormControlLabel, Checkbox, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel'; // Import the Carousel component
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the styles for the carousel
import VideoBackground from '../components/VideoBackground';
import TopMenuBar from '../components/TopMenuBar'; // Import the TopMenuBar component
import { useAuth } from './AuthContext';

const MyEventsPage: React.FC = () => {
  const { currentUser } = useAuth(); // Assuming AuthContext is in place for the current user
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const events = [
    {
      id: 1,
      title: 'Tech Conference 2024',
      date: '2024-12-01',
      description: 'Join industry leaders to discuss the future of technology.',
      category: 'Technology',
      images: ['/assets/techconf-1.avif', '/assets/techconf-2.jpg', '/assets/techconf-3.jpeg'], // Array of image URLs
      link: '/event/tech-conference',
    },
    {
      id: 2,
      title: 'Marketing Summit',
      date: '2024-12-05',
      description: 'Learn the latest trends in digital marketing and strategies.',
      category: 'Marketing',
      images: ['/assets/msummit-1.jpg', '/assets/msummit-2.jpeg', '/assets/msummit-3.jpeg'],
      link: '/event/marketing-summit',
    },
    {
      id: 3,
      title: 'AI and Machine Learning Expo',
      date: '2024-11-20',
      description: 'Explore the world of AI, deep learning, and innovation.',
      category: 'AI',
      images: ['/assets/aiexpo-1.jpeg', '/assets/aiexpo-2.jpeg', '/assets/aiexpo-3.jpeg'],
      link: '/event/ai-expo',
    },
    {
      link: "marketing-summit",
      title: "Marketing Summit 2024",
      date: "2024-12-15",
      description: "Join top marketing experts and thought leaders at the Marketing Summit 2024. Learn about the latest trends in digital marketing, content creation, and social media strategies that will shape the future of the industry.",
      category: "Marketing",
      images: [
        "/assets/marketing-summit-1.jpg",
        "/assets/marketing-summit-2.avif",
        "/assets/marketing-summit-3.jpeg"
      ],
      location: "Grand Hyatt, San Francisco",
      startingPrice: "$299",
      time: "9:00 AM - 5:00 PM",
      registrationLink: "/register-marketing-summit"
    },
    {
      link: "ai-expo",
      title: "AI Expo 2024",
      date: "2024-12-20",
      description: "The AI Expo 2024 brings together AI innovators, developers, and enthusiasts to explore the transformative power of artificial intelligence. This event features keynote speakers, panel discussions, and product showcases focused on AI's impact on industries worldwide.",
      category: "AI & Technology",
      images: [
        "/assets/ai-expo-1.avif",
        "/assets/ai-expo-2.jpg",
        "/assets/ai-expo-3.jpeg"
      ],
      location: "Silicon Valley Convention Center, California",
      startingPrice: "$249",
      time: "9:00 AM - 6:00 PM",
      registrationLink: "/register-ai-expo"
    }
  ];

  // Filter events based on search, category, and date range
  const filteredEvents = events.filter(event =>
    (event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedCategories.length > 0 ? selectedCategories.includes(event.category) : true) &&
    (startDate ? new Date(event.date) >= new Date(startDate) : true) &&
    (endDate ? new Date(event.date) <= new Date(endDate) : true)
  );

  // Handle category selection with the correct event type
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const category = event.target.name;
    setSelectedCategories(prevCategories => 
      prevCategories.includes(category) 
        ? prevCategories.filter(cat => cat !== category) 
        : [...prevCategories, category]
    );
  };

  return (
    <>
      <TopMenuBar /> {/* Using the TopMenuBar component here */}

      <VideoBackground />
      {/* Overlay to darken video background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: -1,
        }}
      />

      {/* Content Container */}
      <Box sx={{ position: 'relative', zIndex: 2, padding: 4 }}>
        <Grid container spacing={4}>
          {/* Left Section: Filters */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ padding: 4, borderRadius: 3, backgroundColor: 'rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(12px)', boxShadow: 5 }}>
              <Typography variant="h5" sx={{ marginBottom: 3, color: '#E0E0E0' }}>Filters</Typography>

              {/* Category Filter - Checkboxes */}
              <Box sx={{ marginBottom: 3 }}>
                <Typography variant="h6" sx={{ color: '#E0E0E0', marginBottom: 1 }}>Event Categories</Typography>
                {['Technology', 'Marketing', 'AI'].map((category) => (
                  <FormControlLabel
                    key={category}
                    control={
                      <Checkbox
                        checked={selectedCategories.includes(category)}
                        onChange={handleCategoryChange}
                        name={category}
                        sx={{ color: '#E0E0E0' }}
                      />
                    }
                    label={category}
                  />
                ))}
              </Box>

              {/* Date Range Filter */}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Start Date"
                    type="date"
                    fullWidth
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{ color: '#E0E0E0' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="End Date"
                    type="date"
                    fullWidth
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{ color: '#E0E0E0' }}
                  />
                </Grid>
              </Grid>

              {/* Create Event Button */}
              <Box sx={{ marginTop: 3 }}>
                <Link to="/create-event" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" sx={{ backgroundColor: '#3f51b5' }}>
                    Create an Event
                  </Button>
                </Link>
              </Box>
            </Paper>
          </Grid>

          {/* Right Section: Event List and Search */}
          <Grid item xs={12} md={8}>
            {/* Search Bar */}
            <TextField
              variant="outlined"
              fullWidth
              label="Search Events"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                marginBottom: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: '#E0E0E0',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#E0E0E0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#E0E0E0',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#E0E0E0',
                  },
                },
              }}
            />

            {/* Vertical List of Events */}
            <Box sx={{ marginTop: 3 }}>
              {filteredEvents.map((event) => (
                <Card
                  key={event.id}
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    color: '#E0E0E0',
                    borderRadius: 2,
                    marginBottom: 2,
                    boxShadow: 3,
                    padding: 3,
                    display: 'flex',
                    flexDirection: 'row', // Align images on the left, text on the right
                    justifyContent: 'space-between',
                  }}
                >
                  {/* Carousel for Event Images */}
                  <Box sx={{ width: '40%', paddingRight: 2 }}>
                    <Carousel>
                      {event.images.map((image, index) => (
                        <div key={index}>
                          <img src={image} alt={`Event ${index}`} />
                        </div>
                      ))}
                    </Carousel>
                  </Box>

                  {/* Event Details */}
                  <Box sx={{ width: '60%' }}>
                    <Typography variant="h6" sx={{ marginBottom: 1 }}>{event.title}</Typography>
                    <Typography variant="body2" sx={{ marginBottom: 2 }}>
                      {event.date} - {event.location || 'Online'}
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: 2 }}>
                      {event.description}
                    </Typography>
                    <Link to={event.link} style={{ textDecoration: 'none' }}>
                      <Button variant="outlined" sx={{ color: '#E0E0E0', borderColor: '#E0E0E0' }}>Learn More</Button>
                    </Link>
                  </Box>
                </Card>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default MyEventsPage;
