const today = new Date().toISOString;
const weekAgo = new Date(Date.now - 7 * 24 * 60 * 60 * 1000).toISOString;

class NewsApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._apiKey = '89646cd537e44c1685691caa70a539b4';
  }

  _returnRes = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };

  searchArticles(keyword) {
    return fetch(
      `${this._baseUrl}?q=${keyword}&from=${weekAgo}&to=${today}&sortBy=popularity&pageSize=100&apiKey=${this._apiKey}`
    )
      .then((res) => this._returnRes(res))
      .then((res) => res.articles);
  }
}

const newsApi = new NewsApi({
  baseUrl: 'https://nomoreparties.co/news/v2/everything',
  headers: {
    'Content-Type': 'X-Api-Key',
  },
});

export default newsApi;
