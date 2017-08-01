import React, { Component } from 'react';


class BooksShelf extends Component {
  const { shelfTitle, books, changeShelf } = this.props;
  render() {
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          { books.map( (book) => {
              return (
                <li>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.url})` }}></div>
                      <ChangeShelf book={book} changeShelf={changeShelf}/>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.author}</div>
                  </div>
                </li>
              )
            }
          }
        </ol>
      </div>
  }
}

export default BooksShelf;
