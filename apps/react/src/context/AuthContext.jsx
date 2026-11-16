import { createContext, useContext, useEffect, useState } from 'react';
import * as api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        if (api.getToken()) {
          const currentUser = await api.me();
          if (active) setUser(currentUser);
        }
      } catch {
        if (active) api.logout();
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  async function handleRegister(values) {
    const data = await api.register(values);
    if (data.token) {
      localStorage.setItem('nm_token', data.token);
      setUser(data.user);
    }
    return data;
  }

  async function handleLogin(values) {
    const data = await api.login(values);
    setUser(data.user);
    return data;
  }

  function handleLogout() {
    api.logout();
    setUser(null);
  }

  const value = { user, loading, register: handleRegister, login: handleLogin, logout: handleLogout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
