import React, { Component } from 'react';

import Book from './Book';

class SearchShelf extends Component {

  render() {
    const  { books, changeShelf } = this.props;
    return (
        <ol className="books-grid">
          { books.map( (book) => {
              return (
                <Book book={book} key={`Searh@${book.id}`} changeShelf={changeShelf}/>
              );
            })
          }
        </ol>
    );
  }
}

export default SearchShelf;