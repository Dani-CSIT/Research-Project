import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // For testing - simulate user data
  useEffect(() => {
    const timer = setTimeout(() => {
      const demoUser = {
        id: 1,
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin' // Change to 'user' to test non-admin view
      };
      setUser(demoUser);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const login = async (email, password) => {
    const demoUser = {
      id: 1,
      name: 'Admin User',
      email: email,
      role: 'admin'
    };
    
    setUser(demoUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};