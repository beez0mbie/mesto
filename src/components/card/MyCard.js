import { DefaultCard } from "./DefaultCard";

export class MyCard extends DefaultCard {
  constructor(
    cardName,
    cardLink,
    templateSelector,
    handleCardClick,
    handleDeleteClick
  ) {
    super(cardName, cardLink, templateSelector, handleCardClick);
    this._handleDeleteClick = handleDeleteClick;
  }
  _getTrash() {
    return this._element.querySelector(".card__trash");
  }

  deleteCard = () => {
    this._element.remove();
    this._element = null;
  };

  _setEventListeners() {
    super._setEventListeners();
    this._trash.addEventListener("click", () => {
      this._handleDeleteClick();
    });
  }

  _prepareCard() {
    super._prepareCard();
    this._trash = this._getTrash();
  }

  generateCard() {
    this._prepareCard();
    this._setEventListeners();
    return this._element;
  }
}
