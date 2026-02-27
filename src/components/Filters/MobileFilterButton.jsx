import { useState } from 'react';
import FilterPanel from './FilterPanel';
import './MobileFilterButton.css';

function MobileFilterButton({ filters, onFiltersChange, categories, brands, onClearAll, resultCount }) {
  const [isOpen, setIsOpen] = useState(false);

  const activeFilterCount = [
    filters.category !== 'All',
    filters.priceRange !== null,
    filters.minRating !== null,
    filters.brands.length > 0,
    filters.availability !== null,
    filters.minDiscount !== null,
  ].filter(Boolean).length;

  const handleApply = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="mobile-filter-btn"
        onClick={() => setIsOpen(true)}
      >
        <span className="mobile-filter-btn__icon">⚙</span>
        <span>Filters</span>
        {activeFilterCount > 0 && (
          <span className="mobile-filter-btn__badge">{activeFilterCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="mobile-filter-modal">
          <div className="mobile-filter-modal__overlay" onClick={() => setIsOpen(false)} />
          <div className="mobile-filter-modal__content">
            <div className="mobile-filter-modal__header">
              <h2 className="mobile-filter-modal__title">Filters</h2>
              <button
                type="button"
                className="mobile-filter-modal__close"
                onClick={() => setIsOpen(false)}
                aria-label="Close filters"
              >
                ×
              </button>
            </div>
            <div className="mobile-filter-modal__body">
              <FilterPanel
                filters={filters}
                onFiltersChange={onFiltersChange}
                categories={categories}
                brands={brands}
                onClearAll={onClearAll}
                resultCount={resultCount}
              />
            </div>
            <div className="mobile-filter-modal__footer">
              <button
                type="button"
                className="mobile-filter-modal__apply"
                onClick={handleApply}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MobileFilterButton;
