import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialUsers } from '../data/users';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('fanhub_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialUsers[0];
      }
    }
    return initialUsers[0];
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('fanhub_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('fanhub_user');
    }
  }, [currentUser]);

  const login = (email, password) => {
    const matched = initialUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      setCurrentUser(matched);
      return { success: true, user: matched };
    }
    const newUser = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0],
      email: email,
      avatar: initialUsers[1].avatar,
      role: email.includes('admin') ? 'admin' : 'user',
      favoriteCategories: ['Anime', 'Gaming'],
      bio: 'Fan Hub enthusiast exploring creative universes.',
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const register = ({ name, email }) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      avatar: initialUsers[2].avatar,
      role: 'user',
      favoriteCategories: ['Anime', 'Gaming'],
      bio: 'New member of Fan Hub Plus.',
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updatedFields) => {
    if (!currentUser) return;
    setCurrentUser(prev => ({
      ...prev,
      ...updatedFields
    }));
  };

  const switchRole = (role) => {
    if (!currentUser) return;
    setCurrentUser(prev => ({
      ...prev,
      role
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isAdmin: currentUser?.role === 'admin',
        login,
        register,
        logout,
        updateProfile,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
