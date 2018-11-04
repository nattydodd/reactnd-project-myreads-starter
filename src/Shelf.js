import React from 'react';
import Book from './Book';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';

const Shelf = (props) => {

  const updateBook = (value, book) => {
    if (book.shelf === value) {
      return;
    }

    BooksAPI.update(book, value)
      .then(() => {
        props.fetchBooks();
      });
  }

  const { title, books } = props;

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
              updateBook={updateBook}
            />
          ))}
        </ol>
      </div>
    </div>
  )
}

Shelf.propTypes = {
  title: PropTypes.string,
  books: PropTypes.array.isRequired,
  fetchBooks: PropTypes.func.isRequired
}

export default Shelf;