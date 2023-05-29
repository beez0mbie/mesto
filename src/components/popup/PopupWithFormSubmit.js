import { Popup } from "./Popup";

export class PopupWithFormSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  setSubmitAction(submitAction) {
    this._submitAction = submitAction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitAction();
    });
  }
}
