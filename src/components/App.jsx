import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';

import Searchbar from './Searchbar/Searchbar.jsx';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import Modal from './Modal/Modal.jsx';
import Loader from './Loader/Loader.jsx';
import { LoadMoreBtn } from './Button/Button.jsx';
import { getSearchImages } from './fetchApi.js';

export const App = () => {
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);

  useEffect(() => {
    if (!searchName) return;
    const fetchImages = (searchName, page) => {
      const perPage = 12;
      setLoading(true);

      getSearchImages(searchName, page, perPage)
        .then(({ hits }) => {
          const data = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
            return {
              id,
              webformatURL,
              largeImageURL,
              tags,
            };
          });

          setSearchResults(images => [...images, ...data]);

          if (hits.length === 0) {
            return toast.error(`no results with ${searchName} `);
          }
        })

        .finally(() => setLoading(false));
    };
    fetchImages(searchName, page);
  }, [searchName, page]);

  const toggleModal = largeImageURL => {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
  };

  const handleFormSubmit = searchName => {
    setSearchName(searchName);
    setPage(1);
    setSearchResults([]);
  };

  const handleLoadMoreButton = () => {
    setPage(page => page + 1);
  };

  const hasMoreImages =
    searchResults.length > 0 && page * 10 <= searchResults.length;

  return (
    <div className={css.App}>
      <ToastContainer autoClose={2000} />

      <Searchbar onSubmit={handleFormSubmit} />

      <ImageGallery searchResults={searchResults} onClick={toggleModal} />

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}

      {loading && <Loader />}

      {!loading && hasMoreImages && (
        <LoadMoreBtn handleLoadMoreButton={handleLoadMoreButton} />
      )}
    </div>
  );
};
