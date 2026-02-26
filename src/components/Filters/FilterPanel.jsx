import './FilterPanel.css';

function FilterPanel({ categories, selectedCategory, onCategoryChange, searchQuery, onSearchChange }) {
  const allCategories = ['All', ...new Set(categories)];

  return (
    <aside className="filter-panel">
      <div className="filter-panel__section">
        <label htmlFor="search" className="filter-panel__label">Search</label>
        <input
          id="search"
          type="search"
          placeholder="Search products..."
          className="filter-panel__input"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search products"
        />
      </div>
      <div className="filter-panel__section">
        <h3 className="filter-panel__heading">Category</h3>
        <ul className="filter-panel__list">
          {allCategories.map((category) => (
            <li key={category}>
              <button
                type="button"
                className={`filter-panel__option ${selectedCategory === category ? 'filter-panel__option--active' : ''}`}
                onClick={() => onCategoryChange(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default FilterPanel;
