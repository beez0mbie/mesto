export class Api {
  constructor(options) {
    this.options = options;
    this.token = options.headers.authorization;
    this.baseUrl = options.baseUrl;
  }

  getInitialCards() {
    return fetch(this.baseUrl, {
      headers: {
        authorization: this.token,
      },
    }).then((res) => {
      return res.ok
        ? res.json()
        : Promise.reject(`Ошибка: ${res.status}, ${res.statusText}`);
    });
  }
}
