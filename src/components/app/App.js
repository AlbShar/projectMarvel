import AppHeader from "../appHeader/AppHeader";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {ComicsPage, MainPage} from "../pages";

const App = () => {

  return (
    <div>
      <Router>
        <div className="app">
          <AppHeader />
          <main>
            <Switch>
              <Route exact path="/comics">
              <ComicsPage/>
              
              </Route>
              <Route exact path="/">
              <MainPage/>
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    </div>
  );
};

export default App;
