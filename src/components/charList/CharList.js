import "./charList.scss";
import { Component } from "react";
import abyss from "../../resources/img/abyss.jpg";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";

class CharList extends Component {
  state = {
    characters: [],
    loading: true,
    error: false,
  };
  marvelService = new MarvelService();

  onCharactersLoaded = (characters) => {
    this.setState({ characters: characters, loading: false });
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  componentDidMount() {
    this.marvelService
      .getAllCharacters()
      .then(this.onCharactersLoaded)
      .catch(this.onError);
  }

  renderItems(arrayItems) {
    const characterItem = arrayItems.map((character) => {
      const styleEmptyImg = character.thumbnail.includes("image_not_available")
        ? { objectFit: "contain" }
        : null;

      return (
        <li className="char__item" key={character.id}>
          <img
            src={`${character.thumbnail}`}
            alt={character.name}
            style={styleEmptyImg}
          />
          <div className="char__name">{character.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{characterItem}</ul>;
  }

  render() {
    const {characters, loading, error} = this.state;
    const items = this.renderItems(characters);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? items : null;
    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
