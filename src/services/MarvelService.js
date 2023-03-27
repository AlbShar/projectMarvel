class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = 'apikey=a840405266debdb45f81af34a2215e0b';
  getResource = async (url) => {
    let response = await fetch(url);

    if (!response) {
      throw new Error(`Could not fetch ${url}, status: ${response.status} `);
    }

    return response.json();
  };

  getAllCharacters = async() => {
    const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
    return res.data.results.map(this._transformCharacter);
  }

  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    return this._transformCharacter(res.data.results[0]);
  }

  _transformCharacter = (char) => {
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
}

export default MarvelService;
