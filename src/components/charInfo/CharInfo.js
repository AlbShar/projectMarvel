import "./charInfo.scss";
import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import Skeleton from "../skeleton/Skeleton";


class CharInfo extends Component {


  state = {
    char: null,
    loading: false,
    error: false,
  };

  marvelService = new MarvelService();

  onChatLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  updateCharg = () => {
    if (!this.props.id) {
      return;
    }
    this.setState({ loading: true });
    this.marvelService
      .getCharacter(this.props.id)
      .then(this.onChatLoaded)
      .catch(this.onError);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.updateCharg();
    }
  }

  render() {
    const { char, loading, error } = this.state;

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
      <div className="char__info">
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;
  const styleEmptyImg = thumbnail.includes('image_not_available') ? {objectFit: 'contain'} : null;


  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt="abyss" style={styleEmptyImg}/>
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <ComicsInfo comics={comics} />
    </>
  );
};

const ComicsInfo = ({ comics }) => {

    if (comics.length === 0) {
        return <div className="char__comics">There is no data about comics</div>
    };

  const liElements = comics
    .filter((item, index) => index <= 8)
    .map((element, index) => {
      return (
        <li className="char__comics-item" key={index}>
          <a href={element.resourceURI}>{element.name}</a>
        </li>
      );
    });

  return (
    <>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">{liElements}</ul>
    </>
  );
};
export default CharInfo;
