import React, { useState } from 'react';
import './App.css';
import DataList from './DataList';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DataDetailPage from './DataDetailPage';
import Navbar from './Navbar';
import NotFound from './NotFound';
import EpisodePage from './EpisodePage';
import LocationPage from './LocationPage';
import SearchInput from './components/SearchInput';

function App () {
  const [search, setSearch] = useState('');

  const handleChange = event => {
    setSearch(event.target.value);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>The Rick and Morty API</h1>
          <Navbar/>
          &nbsp;
          <SearchInput search={ search } onSearchChange={ handleChange } />
          &nbsp;
          <Switch>
            <Route exact path="/" component={ ()=> <DataList search={ search.trim().toLowerCase() }/> } />
            <Route exact path="/detail/:id" component={ DataDetailPage } />
            <Route exact path="/episode" component={ ()=> <EpisodePage search={ search.trim().toLowerCase() }/> } />
            <Route exact path="/location" component={ ()=> <LocationPage search={ search.trim().toLowerCase() }/> } />
            <Route component={ NotFound } />
          </Switch>
        </header>
      </div>
    </Router>
  );
  //<Route component={"404 sayfası buraya"} />
}

export default App;
