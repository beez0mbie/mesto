import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageElement = this._popup.querySelector(".popup-img__image");
    this._popupFigcaption = this._popup.querySelector(".popup-img__figcaption");
  }

  open(imageName, imageLink) {
    this._popupImageElement.src = imageLink;
    this._popupImageElement.alt = `Фото: ${imageName}`;
    this._popupFigcaption.textContent = imageName;
    super.open();
  }
}
