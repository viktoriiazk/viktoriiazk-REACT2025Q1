import React from 'react';
import PaginationProps from './Pagination.props';
import styles from './Pagination.module.css';

const Pagination: React.FC<PaginationProps> = ({ page, setPage }) => {
  return (
    <div className={styles.paginationWrapper}>
      <button
        className={styles.paginationBtn}
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        aria-label="Go to previous page"
      >
        Previous
      </button>
      <span className={styles.paginationPage}>Page {page}</span>
      <button
        className={styles.paginationBtn}
        onClick={() => setPage(page + 1)}
        aria-label="Go to next page"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
