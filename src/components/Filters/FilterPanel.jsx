import { useState } from 'react';
import './FilterPanel.css';

function FilterPanel({ 
  filters,
  onFiltersChange,
  categories,
  brands,
  onClearAll,
  resultCount
}) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    rating: false,
    brand: false,
    availability: false,
    discount: false,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCategoryChange = (category) => {
    onFiltersChange({ ...filters, category });
  };

  const handlePriceRangeChange = (range) => {
    onFiltersChange({ ...filters, priceRange: range });
  };

  const handleRatingChange = (rating) => {
    onFiltersChange({ ...filters, minRating: filters.minRating === rating ? null : rating });
  };

  const handleBrandToggle = (brand) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    onFiltersChange({ ...filters, brands: newBrands });
  };

  const handleAvailabilityToggle = (option) => {
    onFiltersChange({ ...filters, availability: filters.availability === option ? null : option });
  };

  const handleDiscountChange = (discount) => {
    onFiltersChange({ ...filters, minDiscount: filters.minDiscount === discount ? null : discount });
  };

  const priceRanges = [
    { label: 'Under ₹500', value: [0, 500] },
    { label: '₹500 - ₹1000', value: [500, 1000] },
    { label: '₹1000 - ₹2000', value: [1000, 2000] },
    { label: '₹2000 - ₹3000', value: [2000, 3000] },
    { label: 'Above ₹3000', value: [3000, Infinity] },
  ];

  const allCategories = ['All', ...new Set(categories)];

  return (
    <aside className="filter-panel">
      <div className="filter-panel__header">
        <h2 className="filter-panel__title">Filters</h2>
        <button 
          type="button" 
          className="filter-panel__clear"
          onClick={onClearAll}
        >
          Clear All
        </button>
      </div>

      <div className="filter-panel__results">
        {resultCount} product{resultCount !== 1 ? 's' : ''} found
      </div>

      {/* Category Filter */}
      <div className="filter-panel__section">
        <button
          type="button"
          className="filter-panel__section-header"
          onClick={() => toggleSection('category')}
        >
          <h3 className="filter-panel__heading">Category</h3>
          <span className={`filter-panel__toggle ${expandedSections.category ? 'filter-panel__toggle--open' : ''}`}>
            ▼
          </span>
        </button>
        {expandedSections.category && (
          <ul className="filter-panel__list">
            {allCategories.map((category) => (
              <li key={category}>
                <button
                  type="button"
                  className={`filter-panel__option ${filters.category === category ? 'filter-panel__option--active' : ''}`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="filter-panel__section">
        <button
          type="button"
          className="filter-panel__section-header"
          onClick={() => toggleSection('price')}
        >
          <h3 className="filter-panel__heading">Price Range</h3>
          <span className={`filter-panel__toggle ${expandedSections.price ? 'filter-panel__toggle--open' : ''}`}>
            ▼
          </span>
        </button>
        {expandedSections.price && (
          <div className="filter-panel__price">
            {priceRanges.map((range, idx) => (
              <label key={idx} className="filter-panel__checkbox-label">
                <input
                  type="radio"
                  name="priceRange"
                  checked={JSON.stringify(filters.priceRange) === JSON.stringify(range.value)}
                  onChange={() => handlePriceRangeChange(range.value)}
                  className="filter-panel__radio"
                />
                <span>{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="filter-panel__section">
        <button
          type="button"
          className="filter-panel__section-header"
          onClick={() => toggleSection('rating')}
        >
          <h3 className="filter-panel__heading">Customer Ratings</h3>
          <span className={`filter-panel__toggle ${expandedSections.rating ? 'filter-panel__toggle--open' : ''}`}>
            ▼
          </span>
        </button>
        {expandedSections.rating && (
          <div className="filter-panel__rating">
            {[4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                type="button"
                className={`filter-panel__rating-option ${filters.minRating === rating ? 'filter-panel__rating-option--active' : ''}`}
                onClick={() => handleRatingChange(rating)}
              >
                <span className="filter-panel__stars">{'★'.repeat(rating)}{'☆'.repeat(5-rating)}</span>
                <span>{rating}★ & above</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Brand Filter */}
      {brands.length > 0 && (
        <div className="filter-panel__section">
          <button
            type="button"
            className="filter-panel__section-header"
            onClick={() => toggleSection('brand')}
          >
            <h3 className="filter-panel__heading">Brand</h3>
            <span className={`filter-panel__toggle ${expandedSections.brand ? 'filter-panel__toggle--open' : ''}`}>
              ▼
            </span>
          </button>
          {expandedSections.brand && (
            <div className="filter-panel__brands">
              {brands.map((brand) => (
                <label key={brand} className="filter-panel__checkbox-label">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="filter-panel__checkbox"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Availability Filter */}
      <div className="filter-panel__section">
        <button
          type="button"
          className="filter-panel__section-header"
          onClick={() => toggleSection('availability')}
        >
          <h3 className="filter-panel__heading">Availability</h3>
          <span className={`filter-panel__toggle ${expandedSections.availability ? 'filter-panel__toggle--open' : ''}`}>
            ▼
          </span>
        </button>
        {expandedSections.availability && (
          <div className="filter-panel__availability">
            {['In Stock', 'Out of Stock', 'Preorder'].map((option) => (
              <label key={option} className="filter-panel__checkbox-label">
                <input
                  type="radio"
                  name="availability"
                  checked={filters.availability === option}
                  onChange={() => handleAvailabilityToggle(option)}
                  className="filter-panel__radio"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Discount Filter */}
      <div className="filter-panel__section">
        <button
          type="button"
          className="filter-panel__section-header"
          onClick={() => toggleSection('discount')}
        >
          <h3 className="filter-panel__heading">Discount</h3>
          <span className={`filter-panel__toggle ${expandedSections.discount ? 'filter-panel__toggle--open' : ''}`}>
            ▼
          </span>
        </button>
        {expandedSections.discount && (
          <div className="filter-panel__discount">
            {[50, 40, 30, 20, 10].map((discount) => (
              <button
                key={discount}
                type="button"
                className={`filter-panel__discount-option ${filters.minDiscount === discount ? 'filter-panel__discount-option--active' : ''}`}
                onClick={() => handleDiscountChange(discount)}
              >
                {discount}% or more
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

export default FilterPanel;
