import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Shelf from './Shelf';
import * as BooksAPI from './BooksAPI';
import titleCase from './helpers/titleCase';

class Main extends Component {
  state = {}

  constructor(props) {
    super(props);

    this.fetchBooks = this.fetchBooks.bind(this);
  }

  fetchBooks() {
    // fetch the books and sort them into shelves
    // Attach properties to each shelf (title, shelf name and list of books)
    BooksAPI.getAll().then((response) => {
      const shelves = ['currentlyReading', 'wantToRead', 'read'].map(shelf => ({
        shelf: shelf,
        title: titleCase(shelf),
        books: response.filter(book => book.shelf === shelf)
      }));

      this.setState({ shelves });
    });
  }

  componentDidMount() {
    this.fetchBooks();
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.state.shelves && this.state.shelves.map(shelf => (
              <Shelf
                title={shelf.title}
                books={shelf.books}
                key={shelf.title}
                fetchBooks={this.fetchBooks}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>
            Add a book
          </Link>
        </div>
      </div>
    )
  }
}

export default Main;