import useHttp from "../hooks/http.hooks";

const useMarvelService = () => {
  const {error, loading, request, clearError} = useHttp();
  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=a840405266debdb45f81af34a2215e0b';
  const offsetNumber = 210;

  const getAllCharacters = async (offset = offsetNumber) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  }

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  }


  const getComics = async (offset = offsetNumber) => {
    const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformComics);
  }


  const _transformComics = (char) => {
        return {
          name: char.title,
          thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
          url: char.urls[0].url,
          id: char.id,
          price: char.prices[0].price,
        };
  }

  const _transformCharacter = (char) => {
        return {
          name: char.name,
          description: char.description ? `${char.description.slice(0,200)}...` : `Данные о персонаже ${char.name} отсутствуют`, 
          thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
          homepage: char.urls[0].url,
          wiki:  char.urls[1].url,
          id: char.id,
          comics: char.comics.items
        };
  }

  return {error, loading, getAllCharacters, getCharacter, clearError, getComics}
}

export default useMarvelService;
