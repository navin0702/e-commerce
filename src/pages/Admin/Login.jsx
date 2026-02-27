import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminContext from '../../context/AdminContext';
import Button from '../../components/common/Button';
import '../../pages/Admin/Admin.css';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, token } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/admin/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  // if already logged in
  useEffect(() => {
    if (token) {
      navigate('/admin/products');
    }
  }, [token, navigate]);
  return (
    <main className="admin-login">
      <form className="admin-login__form" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-row">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" variant="primary" size="md">
          Login
        </Button>
      </form>
    </main>
  );
}

export default AdminLogin;