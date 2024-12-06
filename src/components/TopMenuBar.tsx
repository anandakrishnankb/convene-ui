import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
} from '@mui/material';
import { Menu, AccountCircle, Close } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../pages/AuthContext'; // Import Auth Context for role-based logic

const TopMenuBar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { currentUser } = useAuth(); // Access current user's role

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  // Define menu items based on user roles
  const menuItemsByRole: Record<string, { label: string; link: string }[]> = {
    'Event Organizer': [
      { label: 'Overview', link: '/overview' },
      { label: 'Events', link: '/events' },
      { label: 'Campaign', link: '/campaign' },
      { label: 'Analytics', link: '/analytics' },
    ],
    'Sponsor/Exhibitor': [
      { label: 'Dashboard', link: '/sponsorship-dashboard' },
      { label: 'Opportunities', link: '/sponsorship-opportunities' },
      { label: 'ROI Insights', link: '/roi-insights' },
    ],
    'Delegate Manager': [
      { label: 'Overview', link: '/overview' },
      { label: 'Manage Delegates', link: '/delegates' },
      { label: 'Reports', link: '/reports' },
    ],
    Attendee: [
      { label: 'My Events', link: '/my-events' },
      { label: 'Explore', link: '/explore' },
      { label: 'My Schedule', link: '/schedule' },
    ],
    'Marketing Team': [
      { label: 'Overview', link: '/overview' },
      { label: 'Campaigns', link: '/campaigns' },
      { label: 'Email Marketing', link: '/email-marketing' },
    ],
    'Technical Support Staff': [
      { label: 'Support Tickets', link: '/support-tickets' },
      { label: 'System Logs', link: '/logs' },
      { label: 'Event Issues', link: '/event-issues' },
    ],
  };

  // Determine menu items based on role
  const role = currentUser?.role || 'Attendee'; // Default to 'Attendee' if no role is found
  const menuItems = menuItemsByRole[role] || [];

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Toolbar>
        {/* Hamburger Icon to Open Drawer */}
        <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)} sx={{ marginRight: 2 }}>
          <Menu />
        </IconButton>

        {/* Drawer */}
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250, backgroundColor: '#333', color: 'white', height: '100%' }}
            role="presentation"
            onKeyDown={toggleDrawer(false)}
          >
            {/* Header with Logo, Title, and Close Button */}
            <Box sx={{ display: 'flex', alignItems: 'center', padding: 2, justifyContent: 'space-between' }}>
              <Button
                component={Link}
                to="/"
                onClick={toggleDrawer(false)}
                sx={{ color: '#db9d00', textTransform: 'none', flexGrow: 1 }}
              >
                <img src="/convene.png" alt="Logo" style={{ height: 40, marginRight: 8 }} />
                Convene 360
              </Button>
              <IconButton onClick={toggleDrawer(false)} edge="end" sx={{ color: 'white' }}>
                <Close />
              </IconButton>
            </Box>
            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />

            {/* Navigation Links */}
            <List sx={{ marginTop: 2 }}>
              {menuItems.map((item, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton component={Link} to={item.link} onClick={toggleDrawer(false)}>
                    <ListItemText primary={item.label} primaryTypographyProps={{ color: 'white' }} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        {/* Logo and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Button component={Link} to="/" sx={{ color: '#db9d00', textTransform: 'none' }}>
            <img src="/convene.png" alt="Logo" style={{ height: 40, marginRight: 8 }} />
            Convene 360
          </Button>
        </Box>

        {/* User Avatar */}
        <IconButton edge="end" color="inherit">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopMenuBar;
