export class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._profileName = document.querySelector(".profile__title");
    this._profileJob = document.querySelector(".profile__subtitle");
  }

  getUserInfo() {
    this._nameElement.value = this._profileName.textContent;
    this._jobElement.value = this._profileJob.textContent;
  }

  setUserInfo() {
    this._profileName.textContent = this._nameElement.value;
    this._profileJob.textContent = this._jobElement.value;
  }
}
