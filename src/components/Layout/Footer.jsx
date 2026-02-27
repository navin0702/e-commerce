import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__section">
          <h3 className="footer__heading">Namma Kart</h3>
          <p className="footer__text">
            Your one-stop shop for quality products. Namma people, namma prices.
          </p>
        </div>
        <div className="footer__section">
          <h3 className="footer__heading">Quick Links</h3>
          <ul className="footer__links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
          </ul>
        </div>
        <div className="footer__section">
          <h3 className="footer__heading">Contact</h3>
          <p className="footer__text">support@nammakart.com</p>
          <p className="footer__text">1-800-NAMMA-KART</p>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; {currentYear} Namma Kart. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
