
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

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
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

  delCard(cardId) {
    return this.request(`/cards/${cardId}`, "DELETE");
  }

  updateAvatar(formData) {
    return this.request(
      "/users/me/avatar",
      "PATCH",
      JSON.stringify({ avatar: formData.avatar })
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

  addLike(cardId) {
    return this.request(`/cards/likes/${cardId}`, "PUT");
  }

  removeLike(cardId) {
    return this.request(`/cards/likes/${cardId}`, "DELETE");
  }

  request(api, method, body) {
    return fetch(`${this.options.baseUrl}${api}`, {
      headers: this.options.headers,
      method,
      body,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
  }
}
