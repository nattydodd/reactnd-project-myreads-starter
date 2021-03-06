import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Main from './Main';
import Search from './Search';

const BooksApp = () => {
  return (
    <div className="app">
      <Route exact path='/' component={Main} />
      <Route path='/search' component={Search} />
    </div>
  )
}

export default BooksApp;
