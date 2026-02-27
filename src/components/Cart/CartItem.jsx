import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Button from '../common/Button';
import './CartItem.css';

const formatPriceINR = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (delta) => {
    const newQty = item.quantity + delta;
    if (newQty > 0) {
      updateQuantity(item._id, newQty);
    }
  };

  return (
    <article className="cart-item">
      <Link to={`/products/${item.productId}`} className="cart-item__image-link">
        <img
          src={item.image}
          alt={item.name}
          className="cart-item__image"
        />
      </Link>
      <div className="cart-item__details">
        <Link to={`/products/${item.productId}`} className="cart-item__title">
          {item.name}
        </Link>
        <p className="cart-item__price">
          {formatPriceINR(item.price)} each
        </p>
        <div className="cart-item__actions">
          <div className="cart-item__quantity">
            <button
              type="button"
              className="cart-item__qty-btn"
              onClick={() => handleQuantityChange(-1)}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="cart-item__qty-value">{item.quantity}</span>
            <button
              type="button"
              className="cart-item__qty-btn"
              onClick={() => handleQuantityChange(1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => removeFromCart(item._id)}
          >
            Remove
          </Button>
        </div>
      </div>
      <p className="cart-item__total">
        {formatPriceINR(item.price * item.quantity)}
      </p>
    </article>
  );
}

export default CartItem;
