import React, { Component } from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';

import RecipesPage from "./components/RecipesPage";
import NotFoundPage from "./components/NotFoundPage";

import configureStore from './configureStore';

import './styles/styles.scss';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <HashRouter>
      <Provider store={store}>

        <div className="App">
          <Switch>
            <Route exact path="/" component={RecipesPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Provider>
      </HashRouter>
    );
  }
}

export default App;
