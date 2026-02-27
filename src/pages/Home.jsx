import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductList from '../components/product/ProductList';
import Button from '../components/common/Button';
import { products } from '../data/products';
import './Home.css';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const featuredProducts = products.slice(0, 8);

  return (
    <main>
      <section className="hero">
        <div className="hero__content container">
          <h1 className="hero__title">Namma deals, Namma prices</h1>
          <p className="hero__subtitle">
            Discover curated Indian favourites at great prices. Your one-stop destination for everything you need.
          </p>
          <form
            className="hero__search"
            onSubmit={(e) => {
              e.preventDefault();
              const query = searchTerm.trim();
              if (query) {
                navigate(`/products?q=${encodeURIComponent(query)}`);
              } else {
                navigate('/products');
              }
            }}
          >
            <input
              type="search"
              className="hero__search-input"
              placeholder="Search for products (e.g. chai, saree)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search products"
            />
            <button type="submit" className="hero__search-button">
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="featured container">
        <h2 className="featured__title">Featured Products</h2>
        <ProductList products={featuredProducts} />
        <div className="featured__footer">
          <Link to="/products">
            <Button variant="outline" size="md">
              View All Products
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
