import './singleComicPage.scss';
import { useState, useEffect } from "react";
import MarvelService from "../../../services/MarvelService";
import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../../errorMessage/errorMessage";
import Skeleton from "../../skeleton/Skeleton";
import xMen from '../../../resources/img/x-men.png';
import {useParams, Link} from "react-router-dom";

const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);
    const {error, loading, getComic, clearError} = MarvelService();

    
    const skeleton = comic || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null;
  
  
    const onComicLoaded = (comic) => {
        setComic(comic);
    };
  
  
    const updateComic = () => {
      clearError();
      getComic(comicId).then(onComicLoaded)
    };
  
    useEffect(() => {
      updateComic()
    }, [comicId])
  

    return (
        <>
        {errorMessage}
        {spinner}
        {content}
        </>
    )
}

const View = ({comic}) => {
    const {name, thumbnail, description, language, pageCount, price} = comic;

    return (
        <div className="single-comic">
        <img src={thumbnail} alt={name} className="single-comic__img"/>
        <div className="single-comic__info">
            <h2 className="single-comic__name">{name}</h2>
            <p className="single-comic__descr">{description}</p>
            <p className="single-comic__descr">{pageCount}</p>
            <p className="single-comic__descr">{`Language: ${language}`}</p>
            <div className="single-comic__price">{price}</div>
        </div>
        <Link to="/comics" className="single-comic__back">Back to all</Link>
    </div>
    )
};

export default SingleComicPage;