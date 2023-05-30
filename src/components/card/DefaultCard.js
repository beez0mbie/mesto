export class DefaultCard {
  constructor(
    { cardData, handleCardClick, handleLikeCard },
    templateSelector,
    userId
  ) {
    this._cardName = cardData.name;
    this._cardLink = cardData.link;
    this._cardLikesData = cardData.likes;
    this._cardLikes = cardData.likes.length;
    this._cardId = cardData._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeCard = handleLikeCard;
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
    console.log(usersIdLikes);
    return usersIdLikes.some((id) => id === this._userId);
  }

  likeCard = (count) => {
    this._likesCounter = this._getLikesCounter();
    this._likesCounter.textContent = count;
    this._heart.classList.toggle("card__heart_active");
  };

  _setEventListeners() {
    this._heart.addEventListener("click", () =>
      this._handleLikeCard(this._cardId)
    );
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
    this._likesCounter.textContent = this._cardLikes;
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
