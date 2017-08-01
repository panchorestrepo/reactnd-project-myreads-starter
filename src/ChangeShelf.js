import React, { Component } from 'react';

class ChangeShelf extends Component {
  const { book, changeShelf } = this.props;
  render() {
    return (
            <div className="book-shelf-changer">
              <select>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading" onclick={changeShelf(book,"currentlyReading")}>Currently Reading</option>
                <option value="wantToRead" onclick={changeShelf(book,"wantToRead")}>Want to Read</option>
                <option value="read" onclick={changeShelf(book,"read")}>Read</option>
                <option value="none">None</option>
              </select>
            </div>
          )
  }
}
