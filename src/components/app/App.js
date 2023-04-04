import AppHeader from "../appHeader/AppHeader";
import { Component } from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/errorBoundary";

import decoration from "../../resources/img/vision.png";

class App extends Component {
  state = {
    id: "",
  };

  onSetId = (id) => {
    this.setState({ id });
  };

  render() {
    return (
      <div className="app">
        <AppHeader />
        <main>
          <ErrorBoundary>
            <RandomChar />
          </ErrorBoundary>
          <div className="char__content">
            <CharList onSetId={this.onSetId} />
            <ErrorBoundary>
              <CharInfo id={this.state.id} />
            </ErrorBoundary>
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    );
  }
}

export default App;
