import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Pagination.css';

const Pagination = ({ 
  totalCountries, 
  countriesPerPage, 
  currentPage, 
  onPageChange 
}) => {
  const totalPages = Math.ceil(totalCountries / countriesPerPage);

  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="pagination">
      <button 
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="pagination-btn"
      >
        <FaChevronLeft />
      </button>

      {getPageNumbers().map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
        >
          {page}
        </button>
      ))}

      <button 
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="pagination-btn"
      >
        <FaChevronRight />
      </button>

      <span className="pagination-info">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
};

export default Pagination;