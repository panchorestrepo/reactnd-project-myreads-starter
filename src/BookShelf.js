import React, { Component } from 'react';

import Book from './Book';

class BookShelf extends Component {

  render() {
    const  { shelfTitle, books, changeShelf } = this.props;
    return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          { books.map( (book) => {
              return (
                <Book book={book} key={book.id} changeShelf={changeShelf}/>
              );
            })
          }
        </ol>
      </div>
    </div>)
  }
}

export default BookShelf;
