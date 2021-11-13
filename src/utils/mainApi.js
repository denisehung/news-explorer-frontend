class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _returnRes(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  getCurrentUser(token) {
    return fetch(this._baseUrl + '/users/me', {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }).then((res) => {
      return this._returnRes(res);
    });
  }

  getArticles(token) {
    return fetch(this._baseUrl + '/articles', {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }).then((res) => {
      return this._returnRes(res);
    });
  }

  saveArticle({ name, link }, token) {
    return fetch(this._baseUrl + '/articles', {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => {
      return this._returnRes(res);
    });
  }

  deleteArticle(articleId, token) {
    return fetch(this._baseUrl + '/articles/' + articleId, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    }).then((res) => {
      return this._returnRes(res);
    });
  }
}

const api = new Api({
  baseUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://api.aloha.students.nomoreparties.site'
      : 'http://localhost:3000',
});

export default api;

// setUserInfo({ name, about }, token) {
//   return fetch(this._baseUrl + '/users/me', {
//     headers: {
//       authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//     method: 'PATCH',
//     body: JSON.stringify({
//       name,
//       about,
//     }),
//   }).then((res) => {
//     return this._returnRes(res);
//   });
// }

// addLike(cardId, token) {
//   return fetch(this._baseUrl + '/cards/likes/' + cardId, {
//     headers: {
//       authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//     method: 'PUT',
//   }).then((res) => {
//     return this._returnRes(res);
//   });
// }

// removeLike(cardId, token) {
//   return fetch(this._baseUrl + '/cards/likes/' + cardId, {
//     headers: {
//       authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//     method: 'DELETE',
//   }).then((res) => {
//     return this._returnRes(res);
//   });
// }
