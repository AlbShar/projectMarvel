import useHttp from "../hooks/http.hooks";

const useMarvelService = () => {
  const { error, loading, request, clearError } = useHttp();
  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=a840405266debdb45f81af34a2215e0b";
  const offsetNumber = 210;

  const getAllCharacters = async (offset = offsetNumber) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getCharacterByName = async (name) => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
    // return _transformCharacter(res.data.results[0]);
    return res;
  };

  const getComics = async (offset = offsetNumber) => {
    const res = await request(
      `${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformComics);
  };

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };

  const _transformComics = (comics) => {
    return {
      name: comics.title,
      description: comics.description || `No description`,
      thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
      url: comics.urls[0].url,
      id: comics.id,
      language: comics.textObjects.language || "en-us",
      price: comics.prices[0].price
        ? `${comics.prices[0].price}$`
        : "No price informartion",
      pageCount: comics.pageCount ? `${comics.pageCount} p.` : "not avaliable",
    };
  };

  const _transformCharacter = (char) => {
    return {
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 200)}...`
        : `Данные о персонаже ${char.name} отсутствуют`,
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      id: char.id,
      comics: char.comics.items,
    };
  };

  return {
    error,
    loading,
    getAllCharacters,
    getCharacter,
    clearError,
    getComics,
    getComic,
    getCharacterByName,
  };
};

export default useMarvelService;
