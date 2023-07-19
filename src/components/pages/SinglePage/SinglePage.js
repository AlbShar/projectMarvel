import { useState, useEffect } from "react";
import MarvelService from "../../../services/MarvelService";
import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../../errorMessage/errorMessage";
import AppBanner from "../../appBanner/AppBanner"; 
import { useParams } from "react-router-dom";

const SinglePage = ({BaseComponent, dataType}) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { loading, error, getCharacter, getComic, clearError } = MarvelService();


  const onDataLoaded = (data) => {
    setData(data);
  };

  const updateData = () => {
    clearError();

    switch (dataType) {
        case 'comic':
            getComic(id).then(onDataLoaded);
            break;
        case 'character':
            getCharacter(id).then(onDataLoaded);
    }
}

  useEffect(() => {
    updateData();
  }, [id]);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !data) ? (
    <BaseComponent data={data} />
  ) : null;

  return (
    <>
    <AppBanner/>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

export default SinglePage;
