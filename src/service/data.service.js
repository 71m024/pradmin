import AuthService from './auth.service';

export default class DataService {
  constructor() {
    this.entrypoint = process.env.REACT_APP_ENTRYPOINT;
  }

  static headers(raw = false) {
    return {
      ...AuthService.authHeader(),
      Accept: 'application/json',
      ...(raw ? {} : { 'Content-Type': 'application/json' }),
    };
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
    return fetch(this.entrypoint + path, {
      headers: this.constructor.headers(),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 401) {
          AuthService.logout();
        }
        return data;
      });
  }

  postData(path, data, raw = false) {
    return this.constructor.toJsonAndRejectNok(
      fetch(this.entrypoint + path, {
        method: 'POST',
        body: raw ? data : JSON.stringify(data),
        headers: this.constructor.headers(raw),
      }),
    );
  }

  putData(path, data) {
    return this.constructor.toJsonAndRejectNok(
      fetch(this.entrypoint + path, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: this.constructor.headers(),
      }),
    );
  }

  deleteData(path) {
    return this.constructor.toJsonAndRejectNok(
      fetch(this.entrypoint + path, {
        method: 'DELETE',
        headers: this.constructor.headers(),
      }),
    );
  }
}
