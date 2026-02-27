import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');

  useEffect(() => {
    if (token) {
      localStorage.setItem('adminToken', token);
    } else {
      localStorage.removeItem('adminToken');
    }
  }, [token]);

  const login = async (username, password) => {
    const res = await axios.post('/api/admin/login', { username, password });
    setToken(res.data.token);
  };

  const logout = () => {
    setToken('');
  };

  return (
    <AdminContext.Provider value={{ token, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export default AdminContext;