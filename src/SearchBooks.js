import React, { Component } from 'react';

import SearchShelf from './SearchShelf';

class SearchBooks extends Component {

  render() {
    const  { searchBooks, onSearchBooks, changeShelf } = this.props;
    return (
        <div className="search-books">
            <div className="search-books-bar">
                <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
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