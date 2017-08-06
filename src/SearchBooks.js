import React, { Component } from 'react';

import SearchShelf from './SearchShelf';
import { Link } from 'react-router-dom';

class SearchBooks extends Component {

  render() {
    const  { searchBooks, onSearchBooks, changeShelf } = this.props;
    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                    <input type="text" onChange={onSearchBooks} placeholder="Search by title or author"/>
                </div>
            </div>
            <div className="search-books-results">
                <SearchShelf books={searchBooks} changeShelf={changeShelf}/>
            </div>
        </div>
    );
  }
}

export default SearchBooks;