import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import nammaKartLogo from '../../assets/namma-kart-logo.png';
import './Navbar.css';

function Navbar() {
  const { cartCount } = useCart();

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
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
