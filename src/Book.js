import React, { Component } from 'react';

import ChangeShelf from './ChangeShelf';

class Book extends Component {

  render() {
    const  { book, changeShelf } = this.props;
    return (
        <li>
            <div className="book" >
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                <ChangeShelf book={book} changeShelf={changeShelf}/>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
            <div>Shelf {book.shelf}</div>
            <div>id {book.id}</div>
            </div>
        </li>
    )
  }
}

export default Book;