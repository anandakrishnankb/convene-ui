import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
// import Dashboard from './pages/Overview';
import EventManagement from './pages/EventManagement';
import SponsorDashboard from './pages/SponsorDashboard';
import CampaignManagement from './pages/CampaignManagement';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Overview from './pages/Overview';
import MyEventsPage from './pages/MyEventsPage';
import EventDetails from './pages/EventDetails';
import EventCreation from './pages/EventCreation';
import Analytics from './pages/Analytics';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/event-management" element={<EventManagement />} />
        <Route path="/my-events" element={<MyEventsPage />} />
        <Route path="/event/:link" element={<EventDetails />} />
        <Route path="/sponsor-dashboard" element={<SponsorDashboard />} />
        <Route path="/campaign-management" element={<CampaignManagement />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/create-event" element={<EventCreation />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Router>
  );
}

export default App;
