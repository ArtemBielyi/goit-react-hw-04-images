import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
const ImageGalleryItem = ({ webformatURL, largeImageURL, tags, onClick }) => (
  <li
    className={css.ImageGalleryItem}
    onClick={() => {
      onClick(largeImageURL);
    }}
  >
    <img className={css.ImageGalleryItemimage} src={webformatURL} alt={tags} />
  </li>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
