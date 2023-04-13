import "./charList.scss";
import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import PropTypes from 'prop-types';

class CharList extends Component {
  constructor(props) {
    super(props);
    this.onCharSelected = this.props.onCharSelected;
  }

  state = {
    characters: [],
    loading: true,
    error: false,
    newItemsLoading: false,
    offset: 210,
    charEnded: false
  };

  marvelService = new MarvelService();

  onCharactersLoaded = (characters) => {
    let ended = false;
    if (characters.length < 9) {
      ended = true;
    }
    this.setState((state) => ({
      characters: [...state.characters, ...characters],
      loading: false,
      newItemsLoading: false,
      offset: state.offset + 9,
      charEnded: ended
    }));
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  itemsRef = [];
  setItemRef = elem => {
    this.itemsRef.push(elem);
  }
  componentDidMount() {
    this.onRequest();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.myRef !== this.myRef) {
      console.log('done')
    }
  }

  onCharListLoading = () => {
    this.setState({ newItemsLoading: true });
  };
  
  onFocutItem = (i) => {
    this.itemsRef.forEach(item => item.classList.remove("char__item_selected"));
    this.itemsRef[i].classList.add('char__item_selected');
  };

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharactersLoaded)
      .catch(this.onError);
  };

  renderItems(arrayItems) {
    const characterItem = arrayItems.map((character, index) => {
      const styleEmptyImg = character.thumbnail.includes("image_not_available")
        ? { objectFit: "contain" }
        : null;

      return (
        <li
          className="char__item"
          id={character.id}
          ref={this.setItemRef}
          key={character.id}
          onClick={() => {
            this.onCharSelected(character.id);
            this.onFocutItem(index)
          }}
          tabIndex={0}
          
        >
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
    const { characters, loading, error, newItemsLoading, offset, charEnded } = this.state;
    const items = this.renderItems(characters);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;
    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button 
            className="button button__main button__long" 
            style={{display: charEnded ? 'none' : 'block'}} 
            onClick={() => this.onRequest(offset)} 
            disabled={newItemsLoading}>
          <div className="inner">
            load more
          </div>
        </button>
      </div>
    );
  }
}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
