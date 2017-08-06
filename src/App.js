import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchShelf from './SearchShelf';
import MyReads from './MyReads';
import { Route, Link }  from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    query : "",
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
        wantToRead     : books.filter((b) => b.shelf === 'wantToRead')
      }))
      console.log(this.state);
    }

    onSearchBooks(event) {
      const query = event.target.value;
      this.setState({searchBooks : [],query : query});
      let nBooks = [];
      BooksAPI.search(query, 20).then(
        (books) => {
            books.forEach( (book) => {
            console.log("search:",book.id)
            BooksAPI.get(book.id).then((b) => {
              console.log('found:',b.id,b.shelf)
              nBooks.push(b)
              if (nBooks.length === books.length)
                this.setState({ searchBooks : nBooks
                });
              })
        })
    });
  }
  
  changeShelf(book, toShelf) {
    const fromShelf = book.shelf;
    console.log("fromShelf",fromShelf);
    console.log("toShelf",book.id,toShelf);

    if (toShelf !== fromShelf) {
      BooksAPI.update(book, toShelf).then( () => {
        book.shelf = toShelf;
        this.setState({
            searchBooks : this.state.searchBooks.map(
              (b) => {
                if (b.id === book.id)
                  return {...b,shelf : toShelf}
                else
                  return b;
              }
            ),            
            [fromShelf] : fromShelf === 'none' ? this.state[fromShelf] : this.state[fromShelf].filter( (b) => b.id !== book.id),
            [toShelf]   : toShelf   === 'none' ? this.state[toShelf]   : this.state[toShelf].concat(book)
          });
        });
     }
  }
  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={ () =>
         (<div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/" >Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" value={this.state.query} onChange={this.onSearchBooks.bind(this)} placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
                <SearchShelf books={this.state.searchBooks} changeShelf={this.changeShelf.bind(this)}/>
            </div>
          </div>
        )}/>
        <Route exact path="/" render={ () => (
          <MyReads currentlyReading={this.state.currentlyReading} read={this.state.read} wantToRead={this.state.wantToRead} changeShelf={this.changeShelf.bind(this)} />
        )}/>

      </div>
    )
  }
}

export default BooksApp
