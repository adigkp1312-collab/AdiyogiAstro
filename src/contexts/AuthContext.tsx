'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, RegistrationData } from '@/types';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  sendOTP: (phone: string) => Promise<{ success: boolean; error?: string }>;
  verifyOTP: (phone: string, otp: string) => Promise<{ isNewUser: boolean; error?: string }>;
  register: (data: RegistrationData) => Promise<{ success: boolean; error?: string }>;
  updateProfilePic: (imageData: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    accessToken: null,
    refreshToken: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Check stored tokens on mount
  useEffect(() => {
    const storedAccess = localStorage.getItem('nakshatra_access_token');
    const storedRefresh = localStorage.getItem('nakshatra_refresh_token');

    if (storedAccess) {
      fetchProfile(storedAccess, storedRefresh);
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const fetchProfile = async (accessToken: string, refreshToken: string | null) => {
    try {
      const res = await fetch('/api/user/profile', {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });

      if (res.ok) {
        const data = await res.json();
        setState({
          user: data.user,
          accessToken,
          refreshToken,
          isLoading: false,
          isAuthenticated: true,
        });
        return;
      }

      // Token expired - try refresh
      if (res.status === 401 && refreshToken) {
        const refreshRes = await fetch('/api/auth/refresh-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        });

        if (refreshRes.ok) {
          const { accessToken: newToken } = await refreshRes.json();
          localStorage.setItem('nakshatra_access_token', newToken);
          return fetchProfile(newToken, refreshToken);
        }
      }

      // All failed - clear state
      clearAuth();
    } catch {
      clearAuth();
    }
  };

  const clearAuth = () => {
    localStorage.removeItem('nakshatra_access_token');
    localStorage.removeItem('nakshatra_refresh_token');
    setState({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  const sendOTP = async (phone: string) => {
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error };
      return { success: true };
    } catch {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const verifyOTP = async (phone: string, otp: string) => {
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp }),
      });
      const data = await res.json();

      if (!res.ok) return { isNewUser: false, error: data.error };

      if (data.isNewUser) {
        // Store temp token for registration
        localStorage.setItem('nakshatra_access_token', data.tempToken);
        setState(prev => ({ ...prev, accessToken: data.tempToken }));
        return { isNewUser: true };
      }

      // Existing user - store tokens and set state
      localStorage.setItem('nakshatra_access_token', data.accessToken);
      localStorage.setItem('nakshatra_refresh_token', data.refreshToken);
      setState({
        user: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        isLoading: false,
        isAuthenticated: true,
      });
      return { isNewUser: false };
    } catch {
      return { isNewUser: false, error: 'Network error. Please try again.' };
    }
  };

  const register = async (regData: RegistrationData) => {
    try {
      const token = state.accessToken || localStorage.getItem('nakshatra_access_token');
      const res = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(regData),
      });
      const data = await res.json();

      if (!res.ok) return { success: false, error: data.error };

      localStorage.setItem('nakshatra_access_token', data.accessToken);
      localStorage.setItem('nakshatra_refresh_token', data.refreshToken);
      setState({
        user: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        isLoading: false,
        isAuthenticated: true,
      });
      return { success: true };
    } catch {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const updateProfilePic = async (imageData: string) => {
    try {
      const token = state.accessToken || localStorage.getItem('nakshatra_access_token');
      const res = await fetch('/api/user/profile-pic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ imageData }),
      });
      const data = await res.json();

      if (!res.ok) return { success: false, error: data.error };

      setState(prev => ({
        ...prev,
        user: data.user,
      }));
      return { success: true };
    } catch {
      return { success: false, error: 'Failed to upload profile picture' };
    }
  };

  const logout = useCallback(() => {
    clearAuth();
  }, []);

  const refreshUser = useCallback(async () => {
    const token = state.accessToken || localStorage.getItem('nakshatra_access_token');
    const refresh = state.refreshToken || localStorage.getItem('nakshatra_refresh_token');
    if (token) {
      await fetchProfile(token, refresh);
    }
  }, [state.accessToken, state.refreshToken]);

  return (
    <AuthContext.Provider value={{ ...state, sendOTP, verifyOTP, register, updateProfilePic, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
