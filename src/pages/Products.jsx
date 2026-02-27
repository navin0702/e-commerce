import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductList from '../components/product/ProductList';
import FilterPanel from '../components/filters/FilterPanel';
import MobileFilterButton from '../components/filters/MobileFilterButton';
import { products as staticProducts } from '../data/products';
import './Products.css';

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [filters, setFilters] = useState({
    category: 'All',
    priceRange: null,
    minRating: null,
    brands: [],
    availability: null,
    minDiscount: null,
  });

  useEffect(() => {
    const q = searchParams.get('q') ?? '';
    setSearchQuery(q);
  }, [searchParams]);

  // load product list from backend
  const [allProducts, setAllProducts] = useState(staticProducts);
  
  useEffect(() => {
    axios.get('/api/products')
      .then(res => setAllProducts(res.data))
      .catch(() => {}); // silently ignore
  }, []);

  // Extract unique categories and brands
  const categories = useMemo(() => 
    [...new Set(allProducts.map((p) => p.category))], 
    [allProducts]
  );
  
  const brands = useMemo(() => 
    [...new Set(allProducts.map((p) => p.brand).filter(Boolean))], 
    [allProducts]
  );

  // Calculate discount percentage for a product
  const getDiscountPercent = (product) => {
    if (!product.mrp || product.mrp <= product.price) return 0;
    return Math.round(((product.mrp - product.price) / product.mrp) * 100);
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Category filter
      const matchesCategory =
        filters.category === 'All' || product.category === filters.category;

      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Price range filter
      const matchesPrice = !filters.priceRange || 
        (product.price >= filters.priceRange[0] && 
         product.price <= filters.priceRange[1]);

      // Rating filter (mock - products don't have ratings yet)
      const matchesRating = !filters.minRating || 
        (product.rating && product.rating >= filters.minRating);

      // Brand filter
      const matchesBrand = filters.brands.length === 0 || 
        filters.brands.includes(product.brand);

      // Availability filter (mock - assuming all in stock)
      const matchesAvailability = !filters.availability || 
        filters.availability === 'In Stock';

      // Discount filter
      const productDiscount = getDiscountPercent(product);
      const matchesDiscount = !filters.minDiscount || 
        productDiscount >= filters.minDiscount;

      return matchesCategory && matchesSearch && matchesPrice && 
             matchesRating && matchesBrand && matchesAvailability && 
             matchesDiscount;
    });
  }, [filters, searchQuery]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'discount':
        return sorted.sort((a, b) => getDiscountPercent(b) - getDiscountPercent(a));
      case 'rating':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'newest':
        return sorted.sort((a, b) => (b.id || 0) - (a.id || 0));
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'relevance':
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  const handleClearFilters = () => {
    setFilters({
      category: 'All',
      priceRange: null,
      minRating: null,
      brands: [],
      availability: null,
      minDiscount: null,
    });
    setSearchQuery('');
    setSearchParams({});
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  // Get active filter tags
  const activeFilters = useMemo(() => {
    const tags = [];
    if (filters.category !== 'All') tags.push({ type: 'category', label: filters.category });
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      tags.push({ 
        type: 'price', 
        label: max === Infinity ? `Above ₹${min}` : `₹${min} - ₹${max}` 
      });
    }
    if (filters.minRating) tags.push({ type: 'rating', label: `${filters.minRating}★ & above` });
    if (filters.brands.length > 0) {
      filters.brands.forEach(brand => tags.push({ type: 'brand', label: brand }));
    }
    if (filters.availability) tags.push({ type: 'availability', label: filters.availability });
    if (filters.minDiscount) tags.push({ type: 'discount', label: `${filters.minDiscount}% or more` });
    return tags;
  }, [filters]);

  const removeFilter = (tag) => {
    const newFilters = { ...filters };
    switch (tag.type) {
      case 'category':
        newFilters.category = 'All';
        break;
      case 'price':
        newFilters.priceRange = null;
        break;
      case 'rating':
        newFilters.minRating = null;
        break;
      case 'brand':
        newFilters.brands = newFilters.brands.filter(b => b !== tag.label);
        break;
      case 'availability':
        newFilters.availability = null;
        break;
      case 'discount':
        newFilters.minDiscount = null;
        break;
    }
    setFilters(newFilters);
  };

  return (
    <main className="products-page">
      <div className="container">
        <header className="products-page__header">
          <div className="products-page__header-top">
            <h1 className="products-page__title">All Products</h1>
            <div className="products-page__search">
              <input
                type="search"
                placeholder="Search products..."
                className="products-page__search-input"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                aria-label="Search products"
              />
            </div>
          </div>
          
          <div className="products-page__controls">
            <MobileFilterButton
              filters={filters}
              onFiltersChange={setFilters}
              categories={categories}
              brands={brands}
              onClearAll={handleClearFilters}
              resultCount={sortedProducts.length}
            />
            <div className="products-page__sort">
              <label htmlFor="sort" className="products-page__sort-label">
                Sort by:
              </label>
              <select
                id="sort"
                className="products-page__sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="discount">Discount</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">Newest First</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>

          {activeFilters.length > 0 && (
            <div className="products-page__active-filters">
              <span className="products-page__active-filters-label">Active Filters:</span>
              <div className="products-page__filter-tags">
                {activeFilters.map((tag, idx) => (
                  <button
                    key={idx}
                    className="products-page__filter-tag"
                    onClick={() => removeFilter(tag)}
                    aria-label={`Remove ${tag.label} filter`}
                  >
                    {tag.label}
                    <span className="products-page__filter-tag-close">×</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </header>

        <div className="products-page__layout">
          <FilterPanel
            filters={filters}
            onFiltersChange={setFilters}
            categories={categories}
            brands={brands}
            onClearAll={handleClearFilters}
            resultCount={sortedProducts.length}
          />
          <ProductList products={sortedProducts} />
        </div>
      </div>
    </main>
  );
}

export default Products;
