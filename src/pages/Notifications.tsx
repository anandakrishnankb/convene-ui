import React from 'react';
import { Typography, List, ListItem, ListItemText, Box } from '@mui/material';

const Notifications: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Notifications
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="New sponsor inquiry for Event A" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Campaign performance update for Event B" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Notifications;
