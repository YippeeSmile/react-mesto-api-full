export const BASE_URL = 'http://localhost:3000';

export const checkResponse = (res) => {
  if(res.ok) {
    return res.json();
  }
  return Promise.reject('Error' + res.status)
}

export const register = ({email, password}) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password: password, email: email})
  })
  .then(checkResponse)
}

export const authorize = ({email, password}) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password: password, email: email})
  })
  .then(checkResponse)
}

export const tokenCheck = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem("jwt")}`,
    },
  })
  .then(checkResponse);
}

