import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import Button from '../components/common/Button';
import './Login.css';

function Login() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, login } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/products');
  }, [user, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // client-side minimal validation
    if (!form.name || !form.email) {
      setError('Please enter name and email');
      return;
    }

    setLoading(true);
    try {
      await login(form);
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-card">
        <h2>Welcome</h2>
        <p>Sign in to continue shopping</p>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Name</label>
            <input name="name" value={form.name} onChange={handleChange} disabled={loading} />
          </div>
          <div className="form-row">
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} disabled={loading} />
          </div>
          <div className="form-row">
            <label>Phone (optional)</label>
            <input name="phone" value={form.phone} onChange={handleChange} disabled={loading} />
          </div>

          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Signing in...' : 'Continue'}
          </Button>
        </form>
      </div>
    </main>
  );
}

export default Login;