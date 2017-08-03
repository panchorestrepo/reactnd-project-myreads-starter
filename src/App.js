import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    searchBooks : [],
    wantToRead :       [],
    currentlyReading : [],
    read :             []
   
  }
 // shelf: <String> contains one of ["wantToRead", "currentlyReading", "read"]
  componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState({
      currentlyReading: books.filter((b) => b.shelf === 'currentlyReading'),
      read            : books.filter((b) => b.shelf === 'read'),
      wantToReadd     : books.filter((b) => b.shelf === 'wantToReadd')
    }))
    console.log(this.state);
  }
  onSearchBooks(query) {
    BooksAPI.search('Art', 20).then(
      (books) => this.setState(
        {
          searchBooks : books
        }
      )
    )
  }
  changeShelf(book, shelf) {
    console.log("changeShelf",book,shelf);
    const currShelf = book.shelf;
    console.log("currShelf",currShelf);
    if (shelf !== currShelf) {
      BooksAPI.update(book, shelf).then( () => 
        this.setState({
            [currShelf] : this.state[currShelf].filter( (b) => b.id !== book.id),
            [shelf]     : this.state[shelf].concat(book)
        }));
        book.shelf = shelf;
    }
  }
  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <BookShelf books={this.state.searchBooks} shelfTitle="Books to Select" changeShelf={this.changeShelf.bind(this)}/>
                <input type="text" onChange={this.onSearchBooks.bind(this)} placeholder="Search by title or author"/>
                
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <BookShelf books={this.state.currentlyReading} shelfTitle="Currently Reading" changeShelf={this.changeShelf.bind(this)}/>
                <BookShelf books={this.state.read} shelfTitle="Read" changeShelf={this.changeShelf.bind(this)}/>
                <BookShelf books={this.state.wantToRead} shelfTitle="Want to Read" changeShelf={this.changeShelf.bind(this)}/>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
