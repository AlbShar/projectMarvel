import "./charList.scss";
import { useEffect, useState, useRef } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import PropTypes from 'prop-types';

const setContent = (process, Component, newItemsLoading) => {
  console.log(process)
  switch (process) {
    case 'waiting':
      return <Spinner/>;
      break;
    case 'loading':
      return newItemsLoading ? <Component /> : <Spinner/>;
      break;
    case 'error':
      return <ErrorMessage />;
      break;
    case 'confirmed':
      return <Component/>;
      break;
    default:
      throw new Error('Unexpected process value');
  }

};

const CharList = (props) => {
  const [characters, setCharacters] = useState([]);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const itemsRef = useRef([]);

  const { getAllCharacters, process, setProcess} = MarvelService();
  
  const renderItems = (arrayItems) => {
      const characterItem = arrayItems.map((char, index) => {
      const styleEmptyImg =  char.thumbnail.includes("image_not_available")
        ? { objectFit: "contain" }
        : null;
      return (
        <li
          className="char__item"
          id={index}
          ref={(el) => itemsRef.current[index] = el}
          key={char.id}
          onClick={() => {
            props.onCharSelected(char.id);
            onFocutItem(index)
          }}
          tabIndex={0}
          
        >
          <img
            src={`${char.thumbnail}`}
            alt={char.name}
            style={styleEmptyImg}
          />
          <div className="char__name">{char.name}</div>
        </li>
      );
    });

    return (<ul className="char__grid">{characterItem}</ul>);
    
  }

  const onCharactersLoaded = (characters) => {
    let ended = false;
    if (characters.length < 9) {
      ended = true;
    }
    setCharacters(state => [...state, ...characters]);
    setNewItemsLoading(false);
    setOffset(offset => offset + 9);
    setCharEnded(ended);
  };

  
  const onFocutItem = (id) => {
    itemsRef.current.forEach(item => item.classList.remove("char__item_selected"));
    itemsRef.current[id].classList.add('char__item_selected');
  };

  const onRequest = (offset, initial) => {
    initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
    getAllCharacters(offset).then(onCharactersLoaded).then(() => setProcess('confirmed'))
  };

  useEffect(() => {
    onRequest(offset, true);
  }, [])
 
    return (
      <div className="char__list">
        
        {setContent(process, () => renderItems(characters), newItemsLoading)}
        <button 
            className="button button__main button__long" 
            style={{display: charEnded ? 'none' : 'block'}} 
            onClick={() => onRequest(offset)} 
            disabled={newItemsLoading}>
          <div className="inner">
            load more
          </div>
        </button>
      </div>
    );
}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
