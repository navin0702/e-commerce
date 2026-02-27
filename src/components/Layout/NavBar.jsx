import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import nammaKartLogo from '../../assets/namma-kart-logo.png';
import './Navbar.css';

function Navbar() {
  const { cartCount } = useCart();
  const { user, logout } = useContext(UserContext);

  return (
    <header className="navbar">
      <nav className="navbar__inner container">
        <Link to="/" className="navbar__logo">
          <img
            src={nammaKartLogo}
            alt="Namma Kart logo"
            className="navbar__logo-image"
          />
          <span className="navbar__logo-text">Namma Kart</span>
        </Link>
        <ul className="navbar__links">
          <li>
            <Link to="/" className="navbar__link">Home</Link>
          </li>
          <li>
            <Link to="/products" className="navbar__link">Products</Link>
          </li>
          <li>
            <Link to="/cart" className="navbar__link navbar__link--cart">
              Cart
              {cartCount > 0 && (
                <span className="navbar__badge">{cartCount}</span>
              )}
            </Link>
          </li>
          <li>
            <Link to="/wishlist" className="navbar__link">Wishlist</Link>
          </li>
          <li>
            {user ? (
              <>
                <span className="navbar__link">Hi, {user.name}</span>
                <button 
                  className="navbar__link" 
                  onClick={logout}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="navbar__link">Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
