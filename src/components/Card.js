export class Card {
  constructor(cardName, cardLink, templateSelector, handleCardClick) {
    this._cardName = cardName;
    this._cardLink = cardLink;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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

  _likeCard = () => {
    this._heart.classList.toggle("card__heart_active");
  };

  _deleteCard = () => {
    this._element.remove();
  };

  _setEventListeners() {
    this._heart.addEventListener("click", () => this._likeCard());
    this._trash.addEventListener("click", () => this._deleteCard());
    this._image.addEventListener("click", () =>
      this._handleCardClick(this._cardName, this._cardLink)
    );
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
