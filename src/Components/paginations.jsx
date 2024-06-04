import React from 'react';
import styles from "../Styles/pagination.module.css";

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleClick = (pageNumber) => {
        onPageChange(pageNumber);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handleClick(i)}
                    className={`pagination-button ${currentPage === i ? 'active' : ''}`}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className={styles.pagination}>
            <button
                onClick={() => handleClick(currentPage - 1)}
                className="pagination-button"
                disabled={currentPage === 1}
            >
                &lt;
            </button>
            {renderPageNumbers()}
            <button
                onClick={() => handleClick(currentPage + 1)}
                className={styles.paginationButton}
                disabled={currentPage === totalPages}
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination;

