import ProductCard from './ProductCard';
import './ProductList.css';

function ProductList({ products }) {
  if (!products || products.length === 0) {
    return (
      <section className="product-list product-list--empty">
        <p>No products found. Try adjusting your filters.</p>
      </section>
    );
  }

  return (
    <section className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}

export default ProductList;
