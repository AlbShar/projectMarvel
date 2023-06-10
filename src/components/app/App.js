import AppHeader from "../appHeader/AppHeader";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {ComicsPage, MainPage, Page404, SingleComicPage} from "../pages";

const App = () => {

  return (
    <div>
      <Router>
        <div className="app">
          <AppHeader />
          <main>
            <Routes>
              <Route path="/comics" element={ <ComicsPage/>}/>
              <Route path="/" element={<MainPage/>}/>
              <Route path="*" element={<Page404/>}/>
              <Route path="/comics/:comicId" element={<SingleComicPage/>}/>
            </Routes>
          </main>
        </div>
      </Router>
    </div>
  );
};

export default App;
