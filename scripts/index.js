import { Card } from "./card.js";
const page = document.querySelector(".page");

// Закрытие попапа
const closePopupByEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

//Общий метод открытия попапа
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
};

//Общий метод закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
};

// Найти и закрыть все попапы по крестику или оверлею
const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__close-button")
    ) {
      closePopup(popup);
    }
  });
});

//Попап картинки
const popupImage = document.querySelector("#popup-image");
const popupImageElement = popupImage.querySelector(".popup-img__image");
const popupFigcaption = popupImage.querySelector(".popup-img__figcaption");

//Элементы профиля
const buttonOpenProfile = page.querySelector(".profile__edit-button");
const profileName = page.querySelector(".profile__title");
const profileJob = page.querySelector(".profile__subtitle");

//Элементы попап меню профиля
const popupProfile = document.querySelector("#popup-change-profile");
const formProfile = document.forms["profile-form"];
const nameInput = formProfile.querySelector("#popup-input-name");
const jobInput = formProfile.querySelector("#popup-input-job");

nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
};

buttonOpenProfile.addEventListener("click", () => {
  openPopup(popupProfile);
});
formProfile.addEventListener("submit", handleProfileFormSubmit);

//Секция карточек
const cardsElement = page.querySelector(".cards");

//Добавление карточки
const addCard = (cardName, cardLink) => {
  const card = new Card(
    cardName,
    cardLink,
    "#card",
    popupImageElement,
    popupFigcaption,
    openPopup,
    popupImage
  );
  const cardElement = card.generateCard();
  cardsElement.prepend(cardElement);
};

//Заполнение карточек начальным состоянием
const fillInitialCards = (initialCards) => {
  initialCards.forEach((card) => {
    addCard(card.name, card.link);
  });
};

fillInitialCards(initialCards);

//Элементы добавления карточки
const buttonOpenPopupCard = page.querySelector(".profile__add-button");

//Попап добавления карточки
const popupCard = document.querySelector("#popup-add-card");
const formAddCard = document.forms["card-form"];
const nameCard = formAddCard.querySelector("#popup-input-place");
const linkCard = formAddCard.querySelector("#popup-input-link");
const buttonSubmitCard = formAddCard.querySelector(".popup-form__button");

const handleaAddCardFormSubmit = (evt) => {
  evt.preventDefault();
  addCard(nameCard.value, linkCard.value);
  closePopup(popupCard);
  buttonSubmitCard.classList.add("popup-form__button_disabled");
  evt.target.reset();
};

buttonOpenPopupCard.addEventListener("click", () => openPopup(popupCard));
formAddCard.addEventListener("submit", handleaAddCardFormSubmit);
