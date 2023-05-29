export class DefaultCard {
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

  _getImage() {
    return this._element.querySelector(".card__image");
  }

  _getTitle() {
    return this._element.querySelector(".card__title");
  }

  _likeCard = () => {
    this._heart.classList.toggle("card__heart_active");
  };

  _setEventListeners() {
    this._heart.addEventListener("click", () => this._likeCard());
    this._image.addEventListener("click", () =>
      this._handleCardClick(this._cardName, this._cardLink)
    );
  }

  _prepareCard() {
    this._element = this._getTemplate();
    this._heart = this._getHeart();
    this._image = this._getImage();
    this._title = this._getTitle();
    this._image.src = this._cardLink;
    this._image.alt = `Фото: ${this._cardName}`;
    this._title.textContent = this._cardName;
  }

  generateCard() {
    this._prepareCard();
    this._setEventListeners();
    return this._element;
  }
}
