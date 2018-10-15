import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class Search extends Component {

  state = {
    term: '',
    results: []
  }

  constructor(props) {
    super(props);

    this.updateBook = this.updateBook.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      term: e.target.value
    });
    BooksAPI.search(e.target.value).then(response => {
      this.setState({
        results: response
      });
    });
  }

  updateBook(value, book) {
    if (book.shelf === value) {
      return;
    }

    BooksAPI.update(book, value)
      .then((response) => {
        console.log(response);
      });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.handleChange}
              value={this.state.term}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.results && this.state.results.map(book => (
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

export default Search;