import React, { Component } from 'react';

class Book extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.updateBook(e.target.value, this.props.book);
  }

  render() {
    const { book } = this.props;

    const options = [
      {
        name: 'Currently Reading',
        value: 'currentlyReading'
      },
      {
        name: 'Want to Read',
        value: 'wantToRead'
      },
      {
        name: 'Read',
        value: 'read'
      },
      {
        name: 'None',
        value: 'none'
      }
    ]

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select
                value={book.shelf}
                onChange={this.handleChange}
              >
                <option value="move" disabled>Move to...</option>
                {options.map(option => (
                  <option
                    value={option.value}
                    key={option.value}
                  >
                    {option.name}
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

export default Book;