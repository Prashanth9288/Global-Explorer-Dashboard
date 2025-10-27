import React from 'react';
import { REGIONS, SORT_OPTIONS } from '../../utils/constants';
import './Filter.css';

const Filter = ({ onFilter, onSort }) => {
  const handleRegionChange = (e) => {
    onFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    onSort(e.target.value);
  };

  return (
    <div className="filter-section">
      <div className="filter-group">
        <label htmlFor="region-filter" className="filter-label">Filter by Region:</label>
        <select 
          id="region-filter"
          onChange={handleRegionChange} 
          className="filter-select"
          defaultValue="all"
        >
          {REGIONS.map(region => (
            <option key={region} value={region}>
              {region === 'all' ? 'All Regions' : region.charAt(0).toUpperCase() + region.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-select" className="filter-label">Sort by:</label>
        <select 
          id="sort-select"
          onChange={handleSortChange} 
          className="filter-select"
          defaultValue="name"
        >
          {SORT_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filter;