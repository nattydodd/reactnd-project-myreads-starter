import React, { Component } from 'react';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class Shelf extends Component {

  constructor(props) {
    super(props);

    this.updateBook = this.updateBook.bind(this);
  }

  updateBook(value, book) {
    if (book.shelf === value) {
      return;
    }

    BooksAPI.update(book, value)
      .then(() => {
        this.props.fetchBooks();
      });
  }

  render() {
    const { title, books } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          {title}
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <Book
                book={book}
                key={book.title}
                updateBook={this.updateBook}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf;