import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SearchContext } from './context/SearchContext';
import Navbar from './view/Navbar/index.js';
import SearchInput from './components/SearchInput/index.js';
import CharacterList from './view/CharacterListPage/index.js';
import CharacterDetailPage from './view/CharacterDetailPage/index.js';
import EpisodeListPage from './view/EpisodeListPage/index.js';
import LocationListPage from './view/LocationListPage/index.js';
import NotFoundPage from './view/NotFoundPage/index.js';

import './App.css';
import './app.scss';

function App () {
  const [inputWord, setInputWord] = useState('');
  const [search, setSearch] = useState('');

  const handleChange = event => {
    setInputWord(event.target.value);
  };

  const onPressSubmit = event => {
    event.preventDefault();
    setSearch(inputWord);
  };

  return (
    <SearchContext.Provider value={ search }>
      <Router>
        <div className="App">
          <header className="App-header">
            <div className="header">
              <Navbar/>
            </div>
          &nbsp;
            <SearchInput search={ inputWord } onSearchChange={ handleChange } onPressSubmit={ onPressSubmit }/>
          &nbsp;
            <Switch>
              <Route exact path="/" component={ CharacterList } />
              <Route exact path="/detail/:id" component={ CharacterDetailPage } />
              <Route exact path="/episode" component={ EpisodeListPage } />
              <Route exact path="/location" component={ LocationListPage } />
              <Route component={ NotFoundPage } />
            </Switch>
          </header>
        </div>
      </Router>
    </SearchContext.Provider>
  );
}

export default App;
