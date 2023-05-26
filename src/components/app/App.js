import AppHeader from "../appHeader/AppHeader";
import React, { useState } from "react";
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
// import RandomChar from "../randomChar/RandomChar";
// import CharList from "../charList/CharList";
// import CharInfo from "../charInfo/CharInfo";
// import ErrorBoundary from "../errorBoundary/errorBoundary";

import decoration from "../../resources/img/vision.png";

const App = () => {
  const [id, setId] = useState(null);

 const onCharSelected = (id) => {
  setId(+id);
  };

    return (
      <div className="app">
        <AppHeader />
        <main>
          <AppBanner/>
          <ComicsList/>
          {/* <ErrorBoundary>
            <RandomChar />
          </ErrorBoundary>
          <div className="char__content">
            <CharList  onCharSelected={onCharSelected} />
            <ErrorBoundary>
              <CharInfo id={id} />
            </ErrorBoundary>
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" /> */}
        </main>
      </div>
    );
}

export default App;
