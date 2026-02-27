import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import ProductList from '../components/product/ProductList';
import Button from '../components/common/Button';
import './Wishlist.css';

function Wishlist() {
  const { wishlist, clearWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <main className="wishlist-page">
        <div className="container">
          <section className="wishlist-empty">
            <h1>Your wishlist is empty</h1>
            <p>Save items you love by clicking the heart on any product.</p>
            <Link to="/products">
              <Button variant="primary" size="lg">
                Explore Products
              </Button>
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="wishlist-page">
      <div className="container">
        <header className="wishlist-page__header">
          <h1>Wishlist</h1>
          <p>{wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved</p>
          <button
            type="button"
            className="wishlist-page__clear"
            onClick={clearWishlist}
          >
            Clear wishlist
          </button>
        </header>
        <ProductList products={wishlist} />
      </div>
    </main>
  );
}

export default Wishlist;
