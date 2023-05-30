import React, { Component } from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';
export class Searchbar extends Component {
  state = {
    searchName: '',
  };

  handleChangeName = e => {
    this.setState({ searchName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchName.trim() === '') {
      toast('write a search query');
      return;
    }
    this.props.onSubmit(this.state.searchName);
    this.setState({ searchName: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormbutton}>
            <span className="button-label">Search</span>
          </button>

          <input
            className={css.SearchForminput}
            onChange={this.handleChangeName}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchName}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
