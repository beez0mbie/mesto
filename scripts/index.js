let page = document.querySelector(".page");

//Общий метод открытия закрытия попапа
const togglePopup = (popup) => {
  popup.classList.toggle("popup_opened");
};

const closePopupByClickOnOverlay = (evt) => {
  if (evt.target !== evt.currentTarget) {
    return;
  }
  togglePopup(evt.target);
};

//Попап картинки
let popupImage = document.querySelector("#popup-image");
let popupImageElement = popupImage.querySelector(".popup-img__image");
let popupFigcaption = popupImage.querySelector(".popup-img__figcaption");
let closePopupImageButton = popupImage.querySelector(".popup__close-button");
closePopupImageButton.addEventListener("click", () => togglePopup(popupImage));
popupImage.addEventListener("click", closePopupByClickOnOverlay);

//Элементы профиля
let profileEditButton = page.querySelector(".profile__edit-button");
let profileName = page.querySelector(".profile__title");
let profileJob = page.querySelector(".profile__subtitle");

//Элементы попап меню профиля
let popupProfile = document.querySelector("#popup-change-profile");
let closePopupProfileButton = popupProfile.querySelector(
  ".popup__close-button"
);
let formProfile = popupProfile.querySelector(".popup-form");
let nameInput = popupProfile.querySelector("#popup-input-name");
let jobInput = popupProfile.querySelector("#popup-input-job");
nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  togglePopup(popupProfile);
};

profileEditButton.addEventListener("click", () => togglePopup(popupProfile));
closePopupProfileButton.addEventListener("click", () =>
  togglePopup(popupProfile)
);
popupProfile.addEventListener("click", closePopupByClickOnOverlay);
formProfile.addEventListener("submit", handleProfileFormSubmit);

//Общие элементы карт
let cardsElement = page.querySelector(".cards");
let templateCard = document.querySelector("#card").content;

//Общий метод добавления карточек
const addCard = (cardName, cardLink) => {
  const cardElement = templateCard.querySelector(".card").cloneNode(true);

  const heart = cardElement.querySelector(".card__heart");
  heart.addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__heart_active");
  });

  const trash = cardElement.querySelector(".card__trash");
  trash.addEventListener("click", () => {
    cardElement.remove();
  });

  const image = cardElement.querySelector(".card__image");
  image.addEventListener("click", () => {
    popupImageElement.src = cardLink;
    popupImageElement.alt = `Фото: ${cardName}`;
    popupFigcaption.textContent = cardName;
    togglePopup(popupImage);
  });

  cardElement.querySelector(".card__image").src = cardLink;
  cardElement.querySelector(".card__image").alt = `Фото: ${cardName}`;
  cardElement.querySelector(".card__title").textContent = cardName;
  cardsElement.prepend(cardElement);
};

//Заполнение карточек начальным состоянием
const fillInitialCards = () => {
  const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];

  initialCards.forEach((card) => {
    addCard(card.name, card.link);
  });
};

fillInitialCards();

//Элементы добавления карточки
let addCardsButton = page.querySelector(".profile__add-button");

//Попап добавления карточки
let popupCard = document.querySelector("#popup-add-card");
let closePopupCardButton = popupCard.querySelector(".popup__close-button");
let formAddCard = popupCard.querySelector(".popup-form");
let nameCard = popupCard.querySelector("#popup-input-place");
let linkCard = popupCard.querySelector("#popup-input-link");

const handleaAdCardFormSubmit = (evt) => {
  evt.preventDefault();

  addCard(nameCard.value, linkCard.value);

  togglePopup(popupCard);
  nameCard.value = "";
  linkCard.value = "";
};

addCardsButton.addEventListener("click", () => togglePopup(popupCard));
closePopupCardButton.addEventListener("click", () => togglePopup(popupCard));
popupCard.addEventListener("click", closePopupByClickOnOverlay);
formAddCard.addEventListener("submit", handleaAdCardFormSubmit);
