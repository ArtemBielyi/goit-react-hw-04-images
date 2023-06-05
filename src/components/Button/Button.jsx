import React from 'react';
import styles from './Button.module.css';

export const LoadMoreBtn = ({ handleLoadMoreButton }) => {
  return (
    <button
      type="button"
      onClick={handleLoadMoreButton}
      className={styles.loadMoreBtn}
    >
      Load more
    </button>
  );
};

export default LoadMoreBtn;
