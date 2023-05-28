export class Api {
  constructor(options) {
    this.options = options;
    this.headers = options.headers;
    this.baseUrl = options.baseUrl;
  }

  _getJsonPromise = (result) =>
    result.ok
      ? result.json()
      : Promise.reject(`Impossible to get result.json(): ${result.status}`);

  addCard = (name, link) =>
    fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._getJsonPromise);

  updateUserInfo = (name, about) =>
    fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._getJsonPromise);

  getUserInfo = () =>
    fetch(`${this.baseUrl}/users/me `, {
      headers: this.headers,
    }).then(this._getJsonPromise);

  getInitialCards = () =>
    fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then(this._getJsonPromise);

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
}
