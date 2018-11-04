import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class Search extends Component {

  state = {
    term: '',
    results: [],
    isSearching: false
  }

  constructor(props) {
    super(props);

    this.updateBook = this.updateBook.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      term: e.target.value,
      isSearching: true
    });

    BooksAPI.search(e.target.value).then(response => {
      // Get search results, and once finished set Searching state to false
      this.setState({
        results: !response || response.error ? [] : response,
        isSearching: false
      });
    });
  }

  updateBook(value, book) {
    // if there is no change in the update value, then do nothing
    if (book.shelf === value) {
      return;
    }

    // otherwise update the book's shelf
    BooksAPI.update(book, value);
  }

  render() {
    const { isSearching, results, term } = this.state;
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
              value={term}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {/* if the search is in progress */}
            {isSearching ?
              <h1>Searching...</h1> :
              // if the search is finished and we have results:
              (results.length > 0 ?
                results.map(book => (
                  <Book
                    book={book}
                    key={book.id}
                    updateBook={this.updateBook}
                  />
                )) :
                // if the search is finished but we have no results:
                results.length === 0 ?
                  term === "" ?
                    <h1>Please enter your search query</h1> :
                    <h1>No Results. Please Try Again</h1>
                : ''
              )
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;