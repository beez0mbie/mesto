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

  getUserInfo = () =>
    fetch(`${this.baseUrl}/users/me `, {
      headers: this.headers,
    }).then(this._getJsonPromise);

  getInitialCards = () =>
    fetch(`${this.baseUrl}/car2ds`, {
      headers: this.headers,
    }).then(this._getJsonPromise);

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
}
