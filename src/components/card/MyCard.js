import { DefaultCard } from "./DefaultCard";

export class MyCard extends DefaultCard {
  constructor(
    cardName,
    cardLink,
    cardId,
    templateSelector,
    handleCardClick,
    handleDeleteClick
  ) {
    super(cardName, cardLink, cardId, templateSelector, handleCardClick);
    this._handleDeleteClick = handleDeleteClick;
  }
  _getTrash() {
    return this._element.querySelector(".card__trash");
  }

  _deleteCard = () => {
    this._element.remove();
    this._element = null;
  };

  _setEventListeners() {
    super._setEventListeners();
    this._trash.addEventListener("click", () => {
      this._handleDeleteClick();
      this._deleteCard();
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
