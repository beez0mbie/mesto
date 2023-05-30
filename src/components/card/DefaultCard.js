export class DefaultCard {
  constructor(
    { cardData, handleCardClick, handleLikeCard, handleDislikeCard },
    templateSelector,
    userId
  ) {
    this._cardName = cardData.name;
    this._cardLink = cardData.link;
    this._cardLikesData = cardData.likes;
    this._cardId = cardData._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeCard = handleLikeCard;
    this._handleDislikeCard = handleDislikeCard;
    this._userId = userId;
  }

  _getTemplate() {
    const templateCard = document.querySelector(this._templateSelector).content;
    const cardElement = templateCard.querySelector(".card").cloneNode(true);
    return cardElement;
  }

  _getLikesCounter() {
    return this._element.querySelector(".card__heart-counter");
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

  _hasMyLike() {
    const usersIdLikes = this._cardLikesData.map((likeData) => likeData._id);
    return usersIdLikes.some((id) => id === this._userId);
  }

  setLikesInfo(likes) {
    this._cardLikesData = likes;
  }

  updateLikes = () => {
    this._likesCounter = this._getLikesCounter();
    this._likesCounter.textContent = this._cardLikesData.length;
    if (this._hasMyLike()) {
      this._heart.classList.add("card__heart_active");
    } else {
      this._heart.classList.remove("card__heart_active");
    }
  };

  _setEventListeners() {
    this._heart.addEventListener("click", () => {
      if (this._hasMyLike()) {
        this._handleDislikeCard(this._cardId);
      } else {
        this._handleLikeCard(this._cardId);
      }
    });
    this._image.addEventListener("click", () =>
      this._handleCardClick(this._cardName, this._cardLink)
    );
  }

  _prepareCard() {
    this._element = this._getTemplate();
    this._heart = this._getHeart();
    this._image = this._getImage();
    this._title = this._getTitle();
    this._likesCounter = this._getLikesCounter();
    this._likesCounter.textContent = this._cardLikesData.length;
    this._image.src = this._cardLink;
    this._image.alt = `Фото: ${this._cardName}`;
    this._title.textContent = this._cardName;
    if (this._hasMyLike()) {
      this._heart.classList.add("card__heart_active");
    }
  }

  generateCard() {
    this._prepareCard();
    this._setEventListeners();
    return this._element;
  }
}
