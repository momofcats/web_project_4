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

  updateUserInfo(formData) {
    return this.request(
      "/users/me",
      "PATCH",
      JSON.stringify({
        name: formData.name,
        about: formData.about,
      })
    );
  }

  postNewCard(formData) {
    return this.request(
      "/cards/",
      "POST",
      JSON.stringify({
        name: formData.name,
        link: formData.link,
      })
    );
  }

  request(api, method, body) {
    return fetch(`${this.options.baseUrl}${api}`, {
      headers: this.options.headers,
      method,
      body,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}

// other methods for working with the API
