import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Button from '../components/common/Button';
import axios from 'axios';
import { products as staticProducts } from '../data/products';
import './ProductDetails.css';

const formatPriceINR = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        // fallback to static
        const local = staticProducts.find((p) => p.id === Number(id));
        setProduct(local || null);
      }
    };
    fetch();
  }, [id]);

  if (!product) {
    return (
      <main className="product-details container">
        <section className="product-details__not-found">
          <h2>Product not found</h2>
          <Link to="/products">
            <Button variant="primary">Back to Products</Button>
          </Link>
        </section>
      </main>
    );
  }

  const productKey = product._id || product.id;
  const inWishlist = isInWishlist(productKey);
  const hasOffer = product.mrp && product.mrp > product.price;
  const discountPercent = hasOffer
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : null;

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(productKey);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <main className="product-details">
      <div className="container">
        <nav className="product-details__breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Products</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <section className="product-details__content">
          <div className="product-details__gallery">
            <img
              src={product.image}
              alt={product.name}
              className="product-details__image"
            />
          </div>
          <div className="product-details__info">
            <span className="product-details__category">{product.category}</span>
            <h1 className="product-details__title">{product.name}</h1>
            <div className="product-details__price-row">
              <span className="product-details__price">
                {formatPriceINR(product.price)}
              </span>
              {hasOffer && (
                <>
                  <span className="product-details__price-mrp">
                    {formatPriceINR(product.mrp)}
                  </span>
                  <span className="product-details__price-offer">
                    {discountPercent}% OFF
                  </span>
                </>
              )}
            </div>
            <p className="product-details__description">{product.description}</p>
            <div className="product-details__actions">
              <Button variant="primary" size="lg" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <button
                type="button"
                className={`product-details__wishlist ${inWishlist ? 'product-details__wishlist--active' : ''}`}
                onClick={handleWishlistToggle}
                aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                ♥ {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProductDetails;
