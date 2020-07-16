export default class Api {
  constructor(options) {
    this.options = options;
  }

  getInitialCards() {
    return this.request("/cards");
  }

  getUserInfo() {
    return this.request("/users/me");
  }

  request(api) {
    return fetch(`${this.options.baseUrl}${api}`, {
      headers: this.options.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}

// other methods for working with the API
