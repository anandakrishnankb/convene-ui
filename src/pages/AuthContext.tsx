import React, { createContext, useContext, useState } from 'react';

// Define the shape of a user
interface User {
  username: string;
  password: string;
  role: string;
}

// Create a context for authentication
const AuthContext = createContext<any>(null);

// Static list of users
const users: User[] = [
  { username: 'organizer', password: 'password123', role: 'Event Organizer' },
  { username: 'delegate', password: 'password123', role: 'Delegate Manager' },
  { username: 'sponsor', password: 'password123', role: 'Sponsor/Exhibitor' },
  { username: 'attendee', password: 'password123', role: 'Attendee' },
  { username: 'marketing', password: 'password123', role: 'Marketing Team' },
  { username: 'support', password: 'password123', role: 'Technical Support Staff' },
];

// Provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = (username: string, password: string) => {
    const user = users.find((user) => user.username === username && user.password === password);
    if (user) {
      setCurrentUser(user);
      return true; // Login successful
    }
    return false; // Login failed
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};