const today = new Date();
const weekAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate()-7);
const apiKey = '89646cd537e44c1685691caa70a539b4';

class NewsApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _returnRes = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };

  searchArticles(keyword) {
    return fetch(
      `${this._baseUrl}?q=${keyword}&from=${weekAgo.toISOString()}&to=${today.toISOString()}&sortBy=relevancy&pageSize=10&apiKey=${apiKey}`
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
