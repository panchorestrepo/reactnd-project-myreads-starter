import React, { Component } from 'react';

import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';

class MyReads extends Component {

  render() {
    const  { currentlyReading, read, wantToRead, changeShelf } = this.props;
    return (
        <div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <BookShelf books={currentlyReading} shelfTitle="Currently Reading" changeShelf={changeShelf}/>
            <BookShelf books={read}             shelfTitle="Read"              changeShelf={changeShelf}/>
            <BookShelf books={wantToRead}       shelfTitle="Want to Read"      changeShelf={changeShelf}/>
        </div>
        <div className="open-search">
            <Link to="/search">Add a book</Link>
        </div>
        </div>
    );
  }
}

export default MyReads;