class Api {

  constructor(options) {
    this.url = options.baseUrl;
    this.headers = options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status} ${res.message}`);
    }
    return res.json();
  }

  //получение массива карточек 
  getInitialCards() {
    return fetch(this.url + '/cards', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      credentials: 'include'
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  //получаем данные пользователя
  getUserProfile() {
    return fetch(this.url + '/users/me', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'GET',
      credentials: 'include'
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  //добавить карточку
  addNewCard(data) {
    return fetch(this.url + '/cards', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data)
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  //удаляем карточку
  deleteCard(cardID) {
    return fetch(this.url + '/cards/' + cardID, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'DELETE',
      credentials: 'include'
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  //обновляем данные пользователя
  updateUserProfile(userName, userAbout) {
    return fetch(this.url + '/users/me', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify({
        name: userName,
        about: userAbout
      })
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  //обновляем аватар пользователя
  updateAvatarProfile(avatarUrl) {
    return fetch(this.url + '/users/me/avatar', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify({
        avatar: avatarUrl
      })
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  //добавление или удаление лайка
  renderLikes(cardID, method) {
    return fetch(`${this.url}/cards/${cardID}/likes`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      method: method,
      credentials: 'include'
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.adel.nabiullina.nomoredomains.work',
});

export default api;