import "./charInfo.scss";
import { useState, useEffect } from "react";
import MarvelService from "../../services/MarvelService";
import PropTypes from 'prop-types';
import setContent from "../../utils/setContent";


const CharInfo = (props) => {
  const [char, setChar] = useState(null);
  const { getCharacter, clearError, process, setProcess } = MarvelService();

  const onChatLoaded = (char) => {
    setChar(char);
  };


  const updateCharg = () => {
    if (!props.id) {
      return;
    }
    clearError();
    getCharacter(props.id).then(onChatLoaded).then(() => setProcess('confirmed'))
  };

  useEffect(() => {
    updateCharg()
  }, [props.id])


  return (
    <div className="char__info">
      {setContent(process, View, char)}
    </div>
  );
}

const View = ({ data }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = data;
  const styleEmptyImg = thumbnail.includes('image_not_available') ? { objectFit: 'contain' } : null;


  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt="abyss" style={styleEmptyImg} />
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
