import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import Button from '../components/common/Button';
import './Cart.css';

function Cart() {
  const { cart, cartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <div className="container">
          <section className="cart-empty">
            <h1>Your cart is empty</h1>
            <p>Looks like you haven't added any items yet.</p>
            <Link to="/products">
              <Button variant="primary" size="lg">
                Start Shopping
              </Button>
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="container">
        <header className="cart-page__header">
          <h1>Shopping Cart</h1>
          <button
            type="button"
            className="cart-page__clear"
            onClick={clearCart}
          >
            Clear cart
          </button>
        </header>

        <div className="cart-page__layout">
          <section className="cart-page__items">
            {cart.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </section>

          <aside className="cart-page__summary">
            <h2>Order Summary</h2>
            <div className="cart-page__total-row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <p className="cart-page__note">
              Shipping and taxes calculated at checkout.
            </p>
            <Link to="/checkout">
              <Button variant="primary" size="lg" className="cart-page__checkout-btn">
                Proceed to Checkout
              </Button>
            </Link>
            <Link to="/products" className="cart-page__continue">
              Continue shopping
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Cart;
