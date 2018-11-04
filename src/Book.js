import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';
import titleCase from './helpers/titleCase';

class Book extends Component {

  state = {
    shelf: "none",
  }

  // this is used to clear memory leaks in BooksAPI.get
  mounted = false;

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      shelf: e.target.value
    })
    this.props.updateBook(e.target.value, this.props.book);
  }

  componentDidMount() {
    this.mounted = true;

    // The shelf does not get returned as part of the getAll() or search() response.
    // So to get the shelf of a book we need to look up this book specifically
    BooksAPI.get(this.props.book.id).then(response => {
      if (response.shelf && this.mounted) {
        this.setState({
          shelf: response.shelf
        });
      }
    });
  }

  componentWillUnmount() {
    // stop the async task of book fetching from
    // trying to setState on an Unmounted component
    this.mounted = false;
  }

  render() {
    const { book } = this.props;

    // the options for the dropdown list
    const options = [
      'currentlyReading',
      'wantToRead',
      'read',
      'none'
    ];

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})`
              }}>
            </div>
            <div className="book-shelf-changer">
              <select
                value={this.state.shelf}
                onChange={this.handleChange}
              >
                <option value="move" disabled>Move to...</option>
                {options.map(option => (
                  <option
                    value={option}
                    key={option}
                  >
                    {titleCase(option)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>
      </li>
    )
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  updateBook: PropTypes.func.isRequired
}

export default Book;