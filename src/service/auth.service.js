export default class AuthService {
  constructor() {
    this.entrypoint = process.env.REACT_APP_ENTRYPOINT;
  }

  login(email, password) {
    const request = new Request(
      `${this.entrypoint}authentication_token`,
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: new Headers({ 'Content-Type': 'application/json' }),
      },
    );
    return fetch(request)
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem('user', JSON.stringify(data));
          return Promise.resolve(data);
        }
        return Promise.reject(data);
      });
  }

  static logout() {
    localStorage.removeItem('user');
    window.location.reload();
  }

  static getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  static authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    }
    return {};
  }
}
