import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup-form");
    this._inutList = this._popup.querySelectorAll(".popup-form__input");
    this._submitButton = this._popup.querySelector(".popup-form__button");
  }

  _getInputValues() {
    this._formValues = {};
    this._inutList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setInputValues(inputValues) {
    this._inutList.forEach((input) => {
      input.value = inputValues[input.name];
    });
  }

  close() {
    super.close();
    this._form.reset();
    this._submitButton.textContent = "Сохранить";
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._submitButton.textContent = "Сохранение...";
    });
  }
}
