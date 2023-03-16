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

  getAllCharacters = () => {
    return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
  }

  getCharacter = (id) => {
    return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
  }
}

export default MarvelService;
