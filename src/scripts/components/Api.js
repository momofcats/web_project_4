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
    return fetch("https://around.nomoreparties.co/v1/group-2/users/me", {
      method: "PATCH",
      headers: {
        authorization: "2ea24103-3839-4671-8e47-57675e6fba9c",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: formData.name,
        about: formData.about
      })
    });
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
