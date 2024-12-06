import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography, Grid, FormControl, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import VideoBackground from "../components/VideoBackground";
import TopMenuBar from "../components/TopMenuBar"; // Import the TopMenuBar component

// Sample events data
const events = [
  {
    title: "Tech Conference 2024",
    registrationData: [
      { name: "Day 1", registrations: 200, attendance: 150 },
      { name: "Day 2", registrations: 250, attendance: 200 },
    ],
    engagementData: [
      { name: "Session 1", engagement: 85 },
      { name: "Session 2", engagement: 90 },
      { name: "Session 3", engagement: 20 },
    ],
    revenueData: [
      { name: "Tickets", value: 4500 },
      { name: "Merchandise", value: 1500 },
    ],
    feedbackData: [
      { name: "Excellent", value: 40 },
      { name: "Good", value: 30 },
    ],
  },
  {
    title: "AI Expo 2024",
    registrationData: [
      { name: "Day 1", registrations: 250, attendance: 180 },
      { name: "Day 2", registrations: 200, attendance: 120 },
    ],
    engagementData: [
      { name: "Session 1", engagement: 105 },
      { name: "Session 2", engagement: 110 },
      { name: "Session 3", engagement: 70 },
    ],
    revenueData: [
      { name: "Tickets", value: 4500 },
      { name: "Merchandise", value: 1500 },
    ],
    feedbackData: [
      { name: "Excellent", value: 50 },
      { name: "Good", value: 30 },
    ],
  },
  {
    title: "Marketing Summit 2024",
    registrationData: [
      { name: "Day 1", registrations: 100, attendance: 90 },
      { name: "Day 2", registrations: 200, attendance: 110 },
    ],
    engagementData: [
      { name: "Session 1", engagement: 80 },
      { name: "Session 2", engagement: 30 },
    ],
    revenueData: [
      { name: "Tickets", value: 3000 },
      { name: "Sponsorship", value: 2000 },
    ],
    feedbackData: [
      { name: "Excellent", value: 50 },
      { name: "Good", value: 40 },
    ],
  },
];

const Analytics: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState(events[0].title); // Default to the first event
  const [selectedAnalysis, setSelectedAnalysis] = useState("Registration and Attendance Metrics"); // Default analysis type

  // Handle event selection change
  const handleEventChange = (event: SelectChangeEvent) => {
    setSelectedEvent(event.target.value);
  };

  // Handle analysis type change
  const handleAnalysisChange = (event: SelectChangeEvent) => {
    setSelectedAnalysis(event.target.value);
  };

  // Find the selected event's data
  const selectedEventData = events.find((event) => event.title === selectedEvent);

  // Example metrics for selected event
  const registrationData = selectedEventData ? selectedEventData.registrationData : [];
  const engagementData = selectedEventData ? selectedEventData.engagementData : [];
  const revenueData = selectedEventData ? selectedEventData.revenueData : [];
  const feedbackData = selectedEventData ? selectedEventData.feedbackData : [];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const chartContainerStyle = {
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(15px)",
    borderRadius: "10px",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
    padding: "20px",
  };

  return (
    <>
      <TopMenuBar />
      <VideoBackground />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: "white", mb: 2 }}>
          Event Analytics
        </Typography>

        {/* Event Selection Dropdown */}
        <FormControl fullWidth sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ color: "white", mb: 1 }}>
            Select Event:
          </Typography>
          <Select
            value={selectedEvent}
            onChange={handleEventChange}
            sx={{ background: "white", borderRadius: "8px" }}
          >
            {events.map((event) => (
              <MenuItem key={event.title} value={event.title}>
                {event.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Analysis Type Dropdown */}
        <FormControl fullWidth sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ color: "white", mb: 1 }}>
            Select Analysis Type:
          </Typography>
          <Select
            value={selectedAnalysis}
            onChange={handleAnalysisChange}
            sx={{ background: "white", borderRadius: "8px" }}
          >
            <MenuItem value="Registration and Attendance Metrics">
              Registration and Attendance
            </MenuItem>
            <MenuItem value="Engagement Metrics">Engagement</MenuItem>
            <MenuItem value="Revenue and Financial Metrics">Revenue</MenuItem>
            <MenuItem value="Feedback and Satisfaction Metrics">Feedback</MenuItem>
          </Select>
        </FormControl>

        <Grid container spacing={4}>
          {/* Conditional rendering based on selected analysis type */}
          {selectedAnalysis === "Registration and Attendance Metrics" && (
            <Grid item xs={12} md={6}>
              <Box style={chartContainerStyle}>
                <Typography variant="h6" gutterBottom>
                  Registration and Attendance ({selectedEvent})
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={registrationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="registrations" fill="#8884d8" />
                    <Bar dataKey="attendance" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Grid>
          )}

          {selectedAnalysis === "Engagement Metrics" && (
            <Grid item xs={12} md={6}>
              <Box style={chartContainerStyle}>
                <Typography variant="h6" gutterBottom>
                  Engagement by Session ({selectedEvent})
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="engagement"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Grid>
          )}

          {selectedAnalysis === "Revenue and Financial Metrics" && (
            <Grid item xs={12} md={6}>
              <Box style={chartContainerStyle}>
                <Typography variant="h6" gutterBottom>
                  Revenue Breakdown ({selectedEvent})
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={revenueData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {revenueData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Grid>
          )}

          {selectedAnalysis === "Feedback and Satisfaction Metrics" && (
            <Grid item xs={12} md={6}>
              <Box style={chartContainerStyle}>
                <Typography variant="h6" gutterBottom>
                  Feedback Overview ({selectedEvent})
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={feedbackData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#82ca9d"
                      label
                    >
                      {feedbackData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Analytics;
