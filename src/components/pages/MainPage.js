import { useState } from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/errorBoundary";
import CharSearchForm from "../charSearchForm/charSearchForm";
import decoration from "../../resources/img/vision.png";

const MainPage = () => {
    const [id, setId] = useState(null);

    const onCharSelected = (id) => {
      setId(+id);
    };
  
  return (
    <>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char__content">
        <CharList onCharSelected={onCharSelected} />
        <div>
          <ErrorBoundary>
          <CharInfo id={id} />
        </ErrorBoundary>
        <ErrorBoundary>
          <CharSearchForm/>
        </ErrorBoundary>
        </div>
        
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;
