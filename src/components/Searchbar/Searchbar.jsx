import React, { useState } from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [searchName, setSearchName] = useState('');

  const [prevSearchName, setPrevSearchName] = useState('');

  const handleChangeName = e => {
    setSearchName(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchName.trim() === '') {
      toast('write a search query');
      return;
    }
    if (searchName === prevSearchName) {
      return;
    }
    onSubmit(searchName);
    reset();
  };

  const reset = () => {
    setSearchName('');
    setPrevSearchName(searchName);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormbutton}>
          <span className="button-label">Search</span>
        </button>

        <input
          className={css.SearchForminput}
          onChange={handleChangeName}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchName}
        />
      </form>
    </header>
  );
};

export default Searchbar;
