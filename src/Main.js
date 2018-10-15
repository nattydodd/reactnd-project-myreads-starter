import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Shelf from './Shelf';
import * as BooksAPI from './BooksAPI'

class Main extends Component {
  state = {}

  componentDidMount() {
    BooksAPI.getAll().then((response) => {
      console.log(response);

      this.setState({
        shelves: [
          {
            title: 'Currently Reading',
            books: response.filter(book => book.shelf === 'currentlyReading')
          },
          {
            title: 'Want to Read',
            books: response.filter(book => book.shelf === 'wantToRead')
          },
          {
            title: 'Read',
            books: response.filter(book => book.shelf === 'read')
          }
        ]
      });
    });
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