import ENTRYPOINT from '../config/entrypoint';
import authService from './auth.service';

function toJsonAndRejectNok(responsePromise) {
  return responsePromise.then(async (response) => {
    const responseData = await response.json();
    if (!response.ok) {
      return Promise.reject(responseData);
    }
    return response;
  });
}

export function getData(path) {
  return fetch(ENTRYPOINT + path, { headers: authService.authHeader() })
    .then((response) => response.json())
    .then((data) => {
      if (data.code === 401) {
        authService.logout();
      }
      return data;
    });
}

export function postData(path, data) {
  return toJsonAndRejectNok(
    fetch(ENTRYPOINT + path, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...authService.authHeader(),
      },
    }),
  );
}

export function putData(path, data) {
  return toJsonAndRejectNok(
    fetch(ENTRYPOINT + path, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...authService.authHeader(),
      },
    }),
  );
}

export function deleteData(path) {
  return fetch(ENTRYPOINT + path, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...authService.authHeader(),
    },
  });
}
