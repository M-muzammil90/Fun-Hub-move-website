import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialUsers } from '../data/users';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Load registered users from localStorage or fallback
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('fanhub_registered_users');
      return saved ? JSON.parse(saved) : initialUsers;
    } catch (e) {
      return initialUsers;
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('fanhub_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    // Default to logged out for genuine authentication workflow
    return null;
  });

  // Sync registered users to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('fanhub_registered_users', JSON.stringify(registeredUsers));
    } catch (e) {
      console.error('Error saving registered users:', e);
    }
  }, [registeredUsers]);

  // Sync active user to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('fanhub_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('fanhub_user');
    }
  }, [currentUser]);

  const login = (email, password) => {
    if (!email) {
      return { success: false, error: 'Please enter your email address' };
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check in registered users or initialUsers
    const matched =
      registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail) ||
      initialUsers.find((u) => u.email.toLowerCase() === cleanEmail);

    if (matched) {
      setCurrentUser(matched);
      return { success: true, user: matched };
    }

    // Auto-create persistent user account on login with unknown email
    const avatarList = initialUsers.map((u) => u.avatar);
    const randomAvatar = avatarList[Math.floor(Math.random() * avatarList.length)] || initialUsers[0].avatar;

    const newUser = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      email: cleanEmail,
      avatar: randomAvatar,
      role: cleanEmail.includes('admin') ? 'admin' : 'user',
      favoriteCategories: ['Anime', 'Gaming'],
      bio: 'Fan Hub Plus enthusiast exploring creative universes.',
      joinedDate: new Date().toISOString().split('T')[0]
    };

    setRegisteredUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const register = ({ name, email, password }) => {
    if (!email) {
      return { success: false, error: 'Email address is required' };
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name?.trim() || cleanEmail.split('@')[0];

    // Check if user already exists
    const existing =
      registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail) ||
      initialUsers.find((u) => u.email.toLowerCase() === cleanEmail);

    if (existing) {
      const updated = {
        ...existing,
        name: cleanName || existing.name
      };
      setCurrentUser(updated);
      return { success: true, user: updated };
    }

    const avatarList = initialUsers.map((u) => u.avatar);
    const chosenAvatar = avatarList[(registeredUsers.length + 1) % avatarList.length] || initialUsers[0].avatar;

    const newUser = {
      id: `usr-${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      avatar: chosenAvatar,
      role: cleanEmail.includes('admin') ? 'admin' : 'user',
      favoriteCategories: ['Anime', 'Gaming'],
      bio: `Member of Fan Hub Plus community. Joined ${new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}.`,
      joinedDate: new Date().toISOString().split('T')[0]
    };

    setRegisteredUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('fanhub_user');
  };

  const updateProfile = (updatedFields) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedFields };
    setCurrentUser(updated);
    setRegisteredUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id || u.email === currentUser.email ? updated : u))
    );
  };

  const switchRole = (role) => {
    if (!currentUser) return;
    const updated = { ...currentUser, role };
    setCurrentUser(updated);
    setRegisteredUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id || u.email === currentUser.email ? updated : u))
    );
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
