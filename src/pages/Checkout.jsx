import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/common/Button';
import './Checkout.css';

const formatPriceINR = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

function Checkout() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart();
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <div className="container">
          <section className="checkout-empty">
            <h1>Your cart is empty</h1>
            <p>Add some items before checkout.</p>
            <Link to="/products">
              <Button variant="primary" size="lg">
                Browse Products
              </Button>
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="container">
        <h1 className="checkout-page__title">Checkout</h1>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="checkout-form__grid">
            <section className="checkout-form__section">
              <h2>Contact & Shipping</h2>
              <div className="checkout-form__field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="checkout-form__field">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="checkout-form__field">
                <label htmlFor="address">Address</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="123 Main St"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="checkout-form__row">
                <div className="checkout-form__field">
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="New York"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="checkout-form__field">
                  <label htmlFor="zip">ZIP Code</label>
                  <input
                    id="zip"
                    name="zip"
                    type="text"
                    placeholder="10001"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </section>

            <section className="checkout-form__section">
              <h2>Payment</h2>
              <div className="checkout-form__field">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  id="cardNumber"
                  name="cardNumber"
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="checkout-form__field">
                <label htmlFor="cardName">Name on Card</label>
                <input
                  id="cardName"
                  name="cardName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.cardName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="checkout-form__row">
                <div className="checkout-form__field">
                  <label htmlFor="expiry">Expiry</label>
                  <input
                    id="expiry"
                    name="expiry"
                    type="text"
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="checkout-form__field">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    id="cvv"
                    name="cvv"
                    type="text"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </section>
          </div>

          <aside className="checkout-form__summary">
            <h2>Order Summary</h2>
            <ul className="checkout-form__items">
              {cart.map((item) => (
                <li key={item.id}>
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>{formatPriceINR(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="checkout-form__total">
              <span>Total</span>
              <span>{formatPriceINR(cartTotal)}</span>
            </div>
            <Button type="submit" variant="primary" size="lg" className="checkout-form__submit">
              Place Order
            </Button>
          </aside>
        </form>
      </div>
    </main>
  );
}

export default Checkout;
