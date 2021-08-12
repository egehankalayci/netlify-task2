import React from 'react';
import './App.css';
import DataList from './DataList';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DataDetailPage from './DataDetailPage';
import Navbar from './Navbar';
import NotFound from './NotFound';
import EpisodePage from './EpisodePage';
import LocationPage from './LocationPage';

function App () {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>The Rick and Morty API</h1>
          <Navbar title="User App" />
          <hr />
          <Switch>
            <Route exact path="/" component={ DataList } />
            <Route exact path="/detail/:id" component={ DataDetailPage } />
            <Route exact path="/episode" component={ EpisodePage } />
            <Route exact path="/location" component={ LocationPage } />
            <Route component={ NotFound } />
          </Switch>
        </header>
      </div>
    </Router>
  );
  //<Route component={"404 sayfası buraya"} />
}

export default App;
