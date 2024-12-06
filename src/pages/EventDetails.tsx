import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Button,
  Container,
  Stack,
  Chip,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { 
  Favorite, 
  Share, 
  LocationOn, 
  LocalOffer, 
  Event as EventIcon, 
  AccessTime, 
  ConfirmationNumber 
} from "@mui/icons-material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const events = [
  {
    link: "tech-conference",
    title: "Tech Conference 2024",
    date: "2024-12-01",
    description:
      "Join industry leaders to discuss the future of technology and innovation. This event features interactive sessions, keynotes from top experts, and a showcase of cutting-edge advancements in the tech world.",
    speakers: [
      { 
        name: "John Doe", 
        title: "CTO, TechCorp", 
        image: "/assets/speaker-john-doe.jpg" 
      },
      { 
        name: "Emily Chen", 
        title: "AI Research Lead, InnovateAI", 
        image: "/assets/speaker-emily-chen.jpg" 
      },
      { 
        name: "Michael Rodriguez", 
        title: "Blockchain Innovations Director, FutureTech", 
        image: "/assets/speaker-michael-rodriguez.jpg" 
      }
    ],
    highlights: [
      "Networking opportunities with industry leaders.",
      "Exclusive insights on future trends in technology.",
      "Hands-on workshops on AI, blockchain, and more.",
    ],
    agenda: [
      { time: "09:00 AM", title: "Opening Keynote by John Doe" },
      { time: "11:00 AM", title: "Panel Discussion: The Future of AI" },
      { time: "02:00 PM", title: "Workshop: Emerging Tech Trends" },
    ],
    category: "Technology",
    images: [
      "/assets/techconf-1.avif",
      "/assets/techconf-2.jpg",
      "/assets/techconf-3.jpeg",
    ],
    location: "Tech City Conference Center, New York",
    performers: [
      { name: "TechCorp", logo: "/assets/techcorp_logo.png" },
      { name: "InnovateAI", logo: "/assets/innovateai_logo.png" },
      { name: "FutureTech", logo: "/assets/futuretech_logo.png" },
    ],
    startingPrice: "$199",
    fastFilling: true,
    time: "9:00 AM - 5:00 PM",
    registrationLink: "/register-tech-conference",
  },
  {
    link: "marketing-summit",
    title: "Marketing Summit 2024",
    date: "2024-12-15",
    description: "Join top marketing experts and thought leaders at the Marketing Summit 2024. Learn about the latest trends in digital marketing, content creation, and social media strategies that will shape the future of the industry.",
    speakers: [
      { 
        name: "Sarah Thompson", 
        title: "Chief Marketing Officer, AdWorld", 
        image: "/assets/speaker-sarah-thompson.jpg" 
      },
      { 
        name: "David Kim", 
        title: "Digital Strategy Expert, BrandLift", 
        image: "/assets/speaker-david-kim.jpg" 
      },
      { 
        name: "Maria Garcia", 
        title: "Social Media Innovation Lead, SocialPro", 
        image: "/assets/speaker-maria-garcia.jpg" 
      }
    ],
    highlights: [
      "In-depth sessions on digital marketing strategies.",
      "Real-life case studies from top brands.",
      "Hands-on workshops on social media and content creation.",
      "Networking opportunities with industry leaders."
    ],
    agenda: [
      { time: "09:00 AM", title: "Keynote: Future of Digital Marketing" },
      { time: "11:00 AM", title: "Panel Discussion: Social Media Trends in 2025" },
      { time: "02:00 PM", title: "Workshop: Content Marketing Strategies" }
    ],
    category: "Marketing",
    images: [
      "/assets/marketing-summit-1.jpg",
      "/assets/marketing-summit-2.avif",
      "/assets/marketing-summit-3.jpeg"
    ],
    location: "Grand Hyatt, San Francisco",
    performers: [
      { name: "AdWorld", logo: "/assets/adworld_logo.png" },
      { name: "BrandLift", logo: "/assets/brandlift_logo.png" },
      { name: "SocialPro", logo: "/assets/socialpro_logo.png" }
    ],
    startingPrice: "$299",
    fastFilling: true,
    time: "9:00 AM - 5:00 PM",
    registrationLink: "/register-marketing-summit"
  },
  {
    link: "ai-expo",
    title: "AI Expo 2024",
    date: "2024-12-20",
    description: "The AI Expo 2024 brings together AI innovators, developers, and enthusiasts to explore the transformative power of artificial intelligence. This event features keynote speakers, panel discussions, and product showcases focused on AI's impact on industries worldwide.",
    speakers: [
      { 
        name: "Dr. Elena Petrova", 
        title: "Chief AI Scientist, OpenAI", 
        image: "/assets/speaker-elena-petrova.jpg" 
      },
      { 
        name: "Alex Wong", 
        title: "AI Healthcare Innovations Director, DeepMind", 
        image: "/assets/speaker-alex-wong.jpg" 
      },
      { 
        name: "Rajesh Patel", 
        title: "Global AI Strategy Lead, AI Global", 
        image: "/assets/speaker-rajesh-patel.jpg" 
      }
    ],
    highlights: [
      "Discover the latest AI advancements and applications.",
      "Keynotes from AI pioneers and thought leaders.",
      "Hands-on AI technology demonstrations.",
      "Networking opportunities with AI experts and developers."
    ],
    agenda: [
      { time: "09:00 AM", title: "Keynote: The Future of AI" },
      { time: "11:00 AM", title: "Panel Discussion: AI in Healthcare" },
      { time: "02:00 PM", title: "Workshop: Building AI Solutions for Business" }
    ],
    category: "AI & Technology",
    images: [
      "/assets/ai-expo-1.avif",
      "/assets/ai-expo-2.jpg",
      "/assets/ai-expo-3.jpeg"
    ],
    location: "Silicon Valley Convention Center, California",
    performers: [
      { name: "OpenAI", logo: "/assets/openai_logo.png" },
      { name: "DeepMind", logo: "/assets/deepmind_logo.png" },
      { name: "AI Global", logo: "/assets/aiglobal_logo.png" }
    ],
    startingPrice: "$249",
    fastFilling: false,
    time: "9:00 AM - 6:00 PM",
    registrationLink: "/register-ai-expo"
  }
];

const EventDetails: React.FC = () => {
  const { link } = useParams<{ link: string }>();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const event = events.find((e) => e.link === link);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event?.title,
        text: event?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleRegister = () => {
    navigate(event?.registrationLink || "/register");
  };

  if (!event) {
    return (
      <Container 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100vh',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}
      >
        <Typography variant="h3" sx={{ mb: 3, color: 'white' }}>
          Event Not Found
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'rgba(255,255,255,0.8)' }}>
          The event you are looking for might have been removed or is temporarily unavailable.
        </Typography>
        <Button 
          variant="contained" 
          sx={{ 
            backgroundColor: 'white', 
            color: '#667eea',
            '&:hover': { 
              backgroundColor: 'rgba(255,255,255,0.9)' 
            }
          }}
          onClick={() => navigate('/events')}
        >
          Back to Events
        </Button>
      </Container>
    );
  }

  return (
    <Box 
      sx={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.1)', 
        minHeight: '100vh',
        overflowX: 'hidden'
      }}
    >
      <Box 
        sx={{ 
          position: 'relative',
          height: isMobile ? '300px' : '500px',
          background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3))',
        }}
      >
        <Carousel
          infiniteLoop
          autoPlay
          interval={3000}
          showThumbs={false}
          showStatus={false}
        >
          {event.images.map((image, index) => (
            <div 
              key={index} 
              style={{ 
                height: isMobile ? '300px' : '500px',
                filter: 'brightness(0.8)'
              }}
            >
              <img 
                src={image} 
                alt={`Event Image ${index + 1}`} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                }} 
              />
            </div>
          ))}
        </Carousel>
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            p: 2,
            display: 'flex', 
            justifyContent: 'space-between' 
          }}
        >
          {/* <IconButton 
            onClick={() => navigate('/events')}
            sx={{ 
              backgroundColor: 'rgba(255,255,255,0.3)', 
              color: 'white',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.5)' } 
            }}
          >
            ← Back
          </IconButton> */}
          <Box>
            <IconButton 
              onClick={() => setIsFavorite(!isFavorite)}
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.3)', 
                color: isFavorite ? 'red' : 'white',
                mr: 1,
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.5)' } 
              }}
            >
              <Favorite />
            </IconButton>
            <IconButton 
              onClick={handleShare}
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.3)', 
                color: 'white',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.5)' } 
              }}
            >
              <Share />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Container 
        sx={{ 
          mt: isMobile ? -4 : -8, 
          position: 'relative', 
          zIndex: 10,
          px: isMobile ? 1 : 3
        }}
      >
        <Box 
          sx={{ 
            backgroundColor: 'white', 
            borderRadius: 4, 
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
            p: isMobile ? 2 : 3,
            mb: 3,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
            }
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            {event.title}
          </Typography>

<Stack 
  direction="row" 
  spacing={2} 
  sx={{ 
    mb: 2, 
    flexWrap: 'wrap', 
    gap: 1,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  }}
>
  <Box 
    sx={{
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'rgba(33, 150, 243, 0.1)', // Light blue background
      border: '1px solid rgba(33, 150, 243, 0.3)',
      borderRadius: 3,
      px: 2,
      py: 1,
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }
    }}
  >
    <EventIcon 
      sx={{ 
        color: 'primary.main', 
        mr: 1, 
        fontSize: 20 
      }} 
    />
    <Typography 
      variant="body2" 
      sx={{ 
        color: 'primary.main',
        fontWeight: 600
      }}
    >
      {new Date(event.date).toLocaleDateString()}
    </Typography>
  </Box>

  <Box 
    sx={{
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'rgba(156, 39, 176, 0.1)', // Light purple background
      border: '1px solid rgba(156, 39, 176, 0.3)',
      borderRadius: 3,
      px: 2,
      py: 1,
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: 'rgba(156, 39, 176, 0.2)',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }
    }}
  >
    <AccessTime 
      sx={{ 
        color: 'secondary.main', 
        mr: 1, 
        fontSize: 20 
      }} 
    />
    <Typography 
      variant="body2" 
      sx={{ 
        color: 'secondary.main',
        fontWeight: 600
      }}
    >
      {event.time}
    </Typography>
  </Box>

  <Box 
    sx={{
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 150, 136, 0.1)', // Light teal background
      border: '1px solid rgba(0, 150, 136, 0.3)',
      borderRadius: 3,
      px: 2,
      py: 1,
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: 'rgba(0, 150, 136, 0.2)',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }
    }}
  >
    <LocationOn 
      sx={{ 
        color: 'info.main', 
        mr: 1, 
        fontSize: 20 
      }} 
    />
    <Typography 
      variant="body2" 
      sx={{ 
        color: 'info.main',
        fontWeight: 600
      }}
    >
      {event.location}
    </Typography>
  </Box>
</Stack>

          <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
            {event.description}
          </Typography>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 2 : 0
          }}>
            <Box>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                <LocalOffer sx={{ mr: 1, color: 'primary.main' }} />
                Starting from {event.startingPrice}
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleRegister}
              startIcon={<ConfirmationNumber />}
              size="large"
              sx={{
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                }
              }}
            >
              Book Tickets
            </Button>
          </Box>
        </Box>

        <Grid container spacing={isMobile ? 2 : 3}>
      {/* Event Speakers */}
      <Grid item xs={12} md={6}>
        <Box 
          sx={{ 
            backgroundColor: 'white', 
            borderRadius: 4, 
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
            p: isMobile ? 2 : 3,
            height: '100%',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
            }
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            Event Speakers
          </Typography>
          <Stack spacing={2}>
            {event.speakers.map((speaker, index) => (
              <Box 
                key={index} 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  bgcolor: 'grey.100',
                  p: 2,
                  borderRadius: 2
                }}
              >
                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    mr: 3,
                    border: '3px solid',
                    borderColor: 'primary.main'
                  }}
                >
                  <img 
                    src={speaker.image} 
                    alt={speaker.name}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover' 
                    }}
                  />
                </Box>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {speaker.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {speaker.title}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
      </Grid>

          {/* Event Agenda */}
          <Grid item xs={12} md={6}>
            <Box 
              sx={{ 
                backgroundColor: 'white', 
                borderRadius: 4, 
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                p: isMobile ? 2 : 3,
                height: '100%',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                }
              }}
            >
              <Typography variant="h5" sx={{ mb: 2 }}>
                Event Agenda
              </Typography>
              <Stack spacing={2}>
                {event.agenda.map((item, index) => (
                  <Box 
                    key={index} 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      bgcolor: 'grey.100',
                      p: 2,
                      borderRadius: 2
                    }}
                  >
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {item.time}
                    </Typography>
                    <Typography variant="body2">{item.title}</Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* Performers */}
          <Grid item xs={12}>
            <Box 
              sx={{ 
                backgroundColor: 'white', 
                borderRadius: 4, 
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                p: isMobile ? 2 : 3,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
                marginTop:5,
              }}
            >
              <Typography variant="h5" sx={{ mb: 3 }}>
                Event Performers
              </Typography>
              <Grid container spacing={isMobile ? 1 : 3}>
                {event.performers.map((performer, index) => (
                  <Grid 
                    item 
                    xs={4} 
                    md={2} 
                    key={index} 
                    sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center' 
                    }}
                  >
                    <Box
                      sx={{
                        width: 120,
                        height: 120,
                        borderRadius: 4,
                        overflow: 'hidden',
                        boxShadow: 2,
                        mb: 2,
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        }
                      }}
                    >
                      <img 
                        src={performer.logo} 
                        alt={performer.name}
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover' 
                        }}
                      />
                    </Box>
                    <Typography variant="body2" sx={{ textAlign: 'center' }}>
                      {performer.name}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default EventDetails;