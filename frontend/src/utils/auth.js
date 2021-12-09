// duckAuth.js

export const BASE_URL = 'https://api.mesto.adel.nabiullina.nomoredomains.work';

export const register = ({password, email}) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password,
      email,
      })
  })
  .then((res) => {
    if(res.status === 400) {
      return Promise.reject("Некорректно заполнено одно из полей "); 
    }
    return res.json();
  })
};


export const authorize = ({password, email}) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password,
      email,
      })
  })
  .then((res) => {
    if(res.status === 400) {
      return Promise.reject("Не передано одно из полей");
    }
    if(res.status === 401) {
      return Promise.reject("Пользователь с email не найден");
    }
    res.json();
  })
  .then((data) => {
      if (data.token){
        localStorage.setItem('token', data.token);
        return data;
      }
  })
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then((res) => {
    if(res.status === 400) {
      return Promise.reject("Токен не передан или передан не в том формате");
    }
    if(res.status === 401) {
      return Promise.reject("Переданный токен некорректен");
    }
    return res.json();
  })
};