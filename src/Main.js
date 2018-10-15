import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Shelf from './Shelf';
import * as BooksAPI from './BooksAPI';

class Main extends Component {
  state = {}

  constructor(props) {
    super(props);

    this.fetchBooks = this.fetchBooks.bind(this);
  }

  fetchBooks() {
    BooksAPI.getAll().then((response) => {
      console.log(response);

      this.setState({
        shelves: [
          {
            shelf: 'currentlyReading',
            title: 'Currently Reading',
            books: response.filter(book => book.shelf === 'currentlyReading')
          },
          {
            shelf: 'wantToRead',
            title: 'Want to Read',
            books: response.filter(book => book.shelf === 'wantToRead')
          },
          {
            shelf: 'read',
            title: 'Read',
            books: response.filter(book => book.shelf === 'read')
          }
        ]
      });
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
                shelf={shelf.shelf}
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