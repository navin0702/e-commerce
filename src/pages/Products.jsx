import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductList from '../components/product/ProductList';
import FilterPanel from '../components/filters/FilterPanel';
import { products } from '../data/products';
import './Products.css';

function Products() {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const q = searchParams.get('q') ?? '';
    setSearchQuery(q);
  }, [searchParams]);

  const categories = useMemo(() => products.map((p) => p.category), []);
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main className="products-page">
      <div className="container">
        <header className="products-page__header">
          <h1 className="products-page__title">All Products</h1>
          <p className="products-page__subtitle">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          </p>
        </header>

        <div className="products-page__layout">
          <FilterPanel
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <ProductList products={filteredProducts} />
        </div>
      </div>
    </main>
  );
}

export default Products;
