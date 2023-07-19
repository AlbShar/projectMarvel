import {useState, useEffect} from 'react';
import MarvelService from "../../../services/MarvelService";
import {useParams, Link} from "react-router-dom";
import ErrorMessage from '../../errorMessage/errorMessage';
import Spinner from '../../spinner/Spinner';

const SingleCharacterPage = () => {
    const {characterId} = useParams();
    const [character, setCharacter] = useState(null);
    const {error, loading, getCharacter, clearError} = MarvelService();

    
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !character) ? <View character={character} /> : null;
  
  
    const onCharacterLoaded = (character) => {
        console.log(character);
        setCharacter(character);
    };
  
  
    const updateComic = () => {
      clearError();
      getCharacter(characterId).then(onCharacterLoaded)
    };
  
    useEffect(() => {
      updateComic()
    }, [characterId])
  

    return (
        <>
        {errorMessage}
        {spinner}
        {content}
        </>
    )
};

const View = ({character}) => {
    const {name, thumbnail, description} = character;

    return (
        <div className="single-comic">
        <img src={thumbnail} alt={name} className="single-comic__img"/>
        <div className="single-comic__info">
            <h2 className="single-comic__name">{name}</h2>
            <p className="single-comic__descr">{description}</p>
        </div>
    </div>
    )
};

export default SingleCharacterPage;