export class Card {
  constructor(
    cardName,
    cardLink,
    templateSelector,
    popupImageElement,
    popupFigcaption,
    openPopup,
    popupImage
  ) {
    this._cardName = cardName;
    this._cardLink = cardLink;
    this._templateSelector = templateSelector;
    this._popupImageElement = popupImageElement;
    this._popupFigcaption = popupFigcaption;
    this._openPopup = openPopup;
    this._popupImage = popupImage;
  }

  _getTemplate() {
    const templateCard = document.querySelector(this._templateSelector).content;
    const cardElement = templateCard.querySelector(".card").cloneNode(true);
    return cardElement;
  }

  _getHeart() {
    return this._element.querySelector(".card__heart");
  }

  _getTrash() {
    return this._element.querySelector(".card__trash");
  }

  _getImage() {
    return this._element.querySelector(".card__image");
  }

  _handleOpenPopup() {
    this._popupImageElement.src = this._cardLink;
    this._popupImageElement.alt = `Фото: ${this._cardName}`;
    this._popupFigcaption.textContent = this._cardName;
    this._openPopup(this._popupImage);
  }

  _setEventListeners() {
    this._heart.addEventListener("click", (evt) => {
      evt.target.classList.toggle("card__heart_active");
    });

    this._trash.addEventListener("click", () => {
      this._element.remove();
    });

    this._image.addEventListener("click", () => {
      this._handleOpenPopup();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._heart = this._getHeart();
    this._trash = this._getTrash();
    this._image = this._getImage();
    this._setEventListeners();
    this._image.src = this._cardLink;
    this._image.alt = `Фото: ${this._cardName}`;
    this._element.querySelector(".card__title").textContent = this._cardName;
    return this._element;
  }
}
