import { useContext, useEffect } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import AdminContext from '../../context/AdminContext';
import '../../pages/Admin/Admin.css';

function AdminLayout() {
  const { logout, token } = useContext(AdminContext);
  const navigate = useNavigate();

  // redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <ul>
          <li>
            <NavLink to="/admin/products" end>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/products/new">Add Product</NavLink>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <h3>Admin Panel</h3>
        </header>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;