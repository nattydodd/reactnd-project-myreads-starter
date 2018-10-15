import React, { Component } from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import { Route } from 'react-router-dom';
import Main from './Main';
import Search from './Search';

class BooksApp extends Component {

  render() {
    return (
      <div className="app">
        <Route path='/search' component={Main} />
        <Route exact path='/' component={Search} />
      </div>
    )
  }
}

export default BooksApp;
