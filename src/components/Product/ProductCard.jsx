import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import Button from '../common/Button';
import './ProductCard.css';

const formatPriceINR = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const productKey = product._id || product.id;
  const inWishlist = isInWishlist(productKey);

  const hasOffer = product.mrp && product.mrp > product.price;
  const discountPercent = hasOffer
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : null;

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(productKey);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <article className="product-card">
      <Link to={`/products/${product._id || product.id}`} className="product-card__link">
        <div className="product-card__image-wrapper">
          <img
            src={product.image}
            alt={product.name}
            className="product-card__image"
          />
          <button
            type="button"
            className={`product-card__wishlist ${inWishlist ? 'product-card__wishlist--active' : ''}`}
            onClick={handleWishlistToggle}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            ♥
          </button>
        </div>
        <div className="product-card__content">
          <span className="product-card__category">{product.category}</span>
          <h2 className="product-card__title">{product.name}</h2>
          <p className="product-card__description">{product.description}</p>
          <div className="product-card__pricing">
            <span className="product-card__price">
              {formatPriceINR(product.price)}
            </span>
            {hasOffer && (
              <>
                <span className="product-card__price-mrp">
                  {formatPriceINR(product.mrp)}
                </span>
                <span className="product-card__price-offer">
                  {discountPercent}% OFF
                </span>
              </>
            )}
          </div>
        </div>
      </Link>
      <Button
        variant="primary"
        size="sm"
        className="product-card__btn"
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button>
    </article>
  );
}

export default ProductCard;
