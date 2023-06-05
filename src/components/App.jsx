import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';

import Searchbar from './Searchbar/Searchbar.jsx';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import Modal from './Modal/Modal.jsx';
import { LoadMoreBtn } from './Button/Button.jsx';
import { getSearchImages } from './fetchApi.js';
import { ProgressBar } from 'react-loader-spinner';

export const App = () => {
  // state = {
  //   searchName: '',
  //   page: 1,
  //   searchResults: [],
  //   loading: false,
  //   error: false,
  //   noResults: false,
  //   showModal: false,
  //   largeImageURL: null,
  // };

  const [searchName, setSearchName] = useState('');

  const [page, setPage] = useState(1);

  const [searchResults, setSearchResults] = useState([]);

  const [loading, setLoading] = useState(false);

  // const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [largeImageURL, setLargeImageURL] = useState(null);

  useEffect(() => {
    if (!searchName) return;
    fetchImages(searchName, page);
  }, [searchName, page]);

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
        // if (searchName === searchName) {
        //   return;
        // }
      })

      .finally(() => setLoading(false));
  };

  // componentDidUpdate(_, prevState) {
  //   const { page } = this.state;

  //   if (
  //     prevState.searchName !== this.state.searchName ||
  //     prevState.page !== page
  //   ) {
  //     this.fetchData();
  //   }
  // }

  const toggleModal = largeImageURL => {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
  };

  const handleFormSubmit = searchName => {
    // if (searchName === searchName) {
    //   return;
    // }
    setSearchName(searchName);
    setPage(1);
    setSearchResults([]);
    // setError(null);

    // if (this.state.searchName === searchName) {
    //   return;
    // }
    // this.setState({ searchName, page: 1, searchResults: [] });
  };

  const handleLoadMoreButton = () => {
    setPage(page => page + 1);
  };
  // const handleLoadMoreButton = () => {
  //   this.setState(({ page }) => ({
  //     page: page + 1,
  //     loading: true,
  //   }));
  // };

  // const fetchData = (searchName, page) => {
  //   // const { searchName, page } = this.state;
  //   setLoading(true);

  //   getSearchImages(searchName, page)
  //     .then(data => {
  //       if (data.hits.length === 0) {
  //         toast('write a correct search query');
  //         this.setState({ noResults: true });
  //       } else {
  //         const newHits = data.hits.map(
  //           ({ id, webformatURL, largeImageURL }) => ({
  //             id,
  //             webformatURL,
  //             largeImageURL,
  //           })
  //         );

  //         this.setState(prevState => ({
  //           searchResults: [...prevState.searchResults, ...newHits],
  //         }));
  //       }
  //     })
  //     .catch(error => this.setState({ error, searchResults: [] }))
  //     .finally(() => {
  //       this.setState({ loading: false, noResults: false });
  //     });
  // };

  // const { searchResults, loading, page, showModal, largeImageURL, tags } =
  //   this.state;

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

      {loading && (
        <div className={css.loader}>
          <ProgressBar
            height="100"
            width="100"
            ariaLabel="progress-bar-loading"
            className={css.loaders}
            borderColor="#000"
            barColor="#51E5FF"
          />
        </div>
      )}

      {!loading && hasMoreImages && (
        <LoadMoreBtn handleLoadMoreButton={handleLoadMoreButton} />
      )}
    </div>
  );
};
