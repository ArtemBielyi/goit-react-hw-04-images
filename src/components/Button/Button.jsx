import React, { Component } from 'react';
import styles from './Button.module.css';

export class LoadMoreBtn extends Component {
  render() {
    return (
      <button
        type="button"
        onClick={this.props.handleLoadMoreButton}
        className={styles.loadMoreBtn}
      >
        Load more
      </button>
    );
  }
}

export default LoadMoreBtn;
