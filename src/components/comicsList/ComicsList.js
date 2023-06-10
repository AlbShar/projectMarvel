import './comicsList.scss';
import { useState, useEffect } from 'react';
import useMarvelService from "../../services/MarvelService";
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import {Link} from "react-router-dom";

const ComicsList = () => {

    const {error, loading, getComics} = useMarvelService();
    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(218);// 55664
    const [isNewComicsLoading, setIsNewComicsLoading] = useState(null);
    const [isComicsEnded, setIsComicsEnded] = useState(false);
    const styleButton = isComicsEnded ? {display: 'none'} : {display: 'block'};

    const spinner = loading && !isNewComicsLoading ? <Spinner/> : null;
    const errorMes = error ? <ErrorMessage/> : null;

    const onRequest = (offset, initial) => {
        initial ? setIsNewComicsLoading(false) : setIsNewComicsLoading(true);
        getComics(offset).then(comicsHasLoaded).then(() => setIsNewComicsLoading(false));
        
    };

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const comicsHasLoaded = (listComics) => {
        let isComicsHasEnded = false;
        if (listComics.length < 8) {
            isComicsHasEnded = true;
        }
        setComics(comics => [...comics, ...listComics]);
        setOffset(offset => offset + 8);
        setIsComicsEnded(isComicsHasEnded);
    };


   const renderComics = (comics) => {
    const listComics = comics.map((comic, index) => {
        const {id, name, price, thumbnail} = comic;
        const _price = price ? `${price} $` : 'NOT AVAILABLE';

        return (
            <li className="comics__item" key={index}>
                <Link to={`/comics/${id}`}>
                    <img src={thumbnail} alt="ultimate war" className="comics__item-img"/>
                    <div className="comics__item-name">{name}</div>
                    <div className="comics__item-price">{_price}</div>
                </Link>
            </li>
        )
    })
    return (
        <ul className="comics__grid">
            {listComics}
        </ul>
    )
   };

    const viewComics = renderComics(comics);

    
    return (
        <div className="comics__list">
            {spinner}
            {errorMes}
            {viewComics}
            <button style={styleButton} className="button button__main button__long" onClick={() => onRequest(offset, false)} disabled={isNewComicsLoading}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;