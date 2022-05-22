import AuthService from './auth.service';

export default class DataService {
  constructor(entrypoint) {
    this.entrypoint = entrypoint;
  }

  static toJsonAndRejectNok(responsePromise) {
    return responsePromise.then(async (response) => {
      const responseData = await response.json();
      if (!response.ok) {
        return Promise.reject(responseData);
      }
      return response;
    });
  }

  getData(path) {
    return fetch(this.entrypoint + path, { headers: AuthService.authHeader() })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 401) {
          AuthService.logout();
        }
        return data;
      });
  }

  postData(path, data) {
    return this.constructor.toJsonAndRejectNok(
      fetch(this.entrypoint + path, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.authHeader(),
        },
      }),
    );
  }

  putData(path, data) {
    return this.constructor.toJsonAndRejectNok(
      fetch(this.entrypoint + path, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.authHeader(),
        },
      }),
    );
  }

  deleteData(path) {
    return fetch(this.entrypoint + path, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...AuthService.authHeader(),
      },
    });
  }
}
