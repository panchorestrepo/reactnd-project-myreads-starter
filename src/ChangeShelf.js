import React, { Component } from 'react';

class ChangeShelf extends Component {
  
  render() {
    const { book, changeShelf } = this.props;
    return (
            <div className="book-shelf-changer">
              <select onChange={event => changeShelf(book,event.target.value)} value={ book.shelf}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none" selected>None</option>
              </select>
            </div>
          )
  }
}
export default ChangeShelf;