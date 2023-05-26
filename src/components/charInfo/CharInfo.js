import "./charInfo.scss";
import { useState, useEffect } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import Skeleton from "../skeleton/Skeleton";
import PropTypes from 'prop-types'; 

const CharInfo = (props) => {
  const [char, setChar] = useState(null);
  const {error, loading, getCharacter, clearError} = MarvelService();

  const skeleton = char || loading || error ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;


  const onChatLoaded = (char) => {
    setChar(char);
  };


  const updateCharg = () => {
    if (!props.id) {
      return;
    }
    clearError();
    getCharacter(props.id).then(onChatLoaded)
  };

  useEffect(() => {
    updateCharg()
  }, [props.id])


    return (
      <div className="char__info">
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
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


CharInfo.propTypes = {
  id: PropTypes.number
};

export default CharInfo;
