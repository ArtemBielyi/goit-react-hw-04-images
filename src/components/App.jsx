import React, { Component } from 'react';
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

export class App extends Component {
  state = {
    searchName: '',
    page: 1,
    searchResults: [],
    loading: false,
    error: false,
    noResults: false,
    showModal: false,
    largeImageURL: null,
  };

  componentDidUpdate(_, prevState) {
    const { page } = this.state;

    if (
      prevState.searchName !== this.state.searchName ||
      prevState.page !== page
    ) {
      this.fetchData();
    }
  }

  toggleModal = largeImageURL => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      largeImageURL: largeImageURL,
    }));
  };

  handleFormSubmit = searchName => {
    if (this.state.searchName === searchName) {
      return;
    }
    this.setState({ searchName, page: 1, searchResults: [] });
  };

  handleLoadMoreButton = () => {
    this.setState(({ page }) => ({
      page: page + 1,
      loading: true,
    }));
  };

  fetchData = () => {
    const { searchName, page } = this.state;
    this.setState({ loading: true });

    getSearchImages(searchName, page)
      .then(data => {
        if (data.hits.length === 0) {
          toast('write a correct search query');
          this.setState({ noResults: true });
        } else {
          const newHits = data.hits.map(
            ({ id, webformatURL, largeImageURL }) => ({
              id,
              webformatURL,
              largeImageURL,
            })
          );

          this.setState(prevState => ({
            searchResults: [...prevState.searchResults, ...newHits],
          }));
        }
      })
      .catch(error => this.setState({ error, searchResults: [] }))
      .finally(() => {
        this.setState({ loading: false, noResults: false });
      });
  };

  render() {
    const { searchResults, loading, page, showModal, largeImageURL, tags } =
      this.state;

    const hasMoreImages =
      searchResults.length > 0 && page * 10 <= searchResults.length;

    return (
      <div className={css.App}>
        <ToastContainer autoClose={2000} />

        <Searchbar onSubmit={this.handleFormSubmit} />

        <ImageGallery
          searchResults={searchResults}
          onClick={this.toggleModal}
        />

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}

        {loading && <ProgressBar />}

        {!loading && hasMoreImages && (
          <LoadMoreBtn handleLoadMoreButton={this.handleLoadMoreButton} />
        )}
      </div>
    );
  }
}
