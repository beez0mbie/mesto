import { Card } from "./card.js";
import { initialCards } from "./initial-cards.js";

/**
 * Объявление переменных
 */

const page = document.querySelector(".page");
//Элементы профиля
const buttonOpenProfile = page.querySelector(".profile__edit-button");
const profileName = page.querySelector(".profile__title");
const profileJob = page.querySelector(".profile__subtitle");
//Элементы добавления карточки
const buttonOpenPopupCard = page.querySelector(".profile__add-button");
//Секция карточек
const cardsElement = page.querySelector(".cards");
//Все попапы
const popups = document.querySelectorAll(".popup");
//Попап картинки
const popupImage = document.querySelector("#popup-image");
const popupImageElement = popupImage.querySelector(".popup-img__image");
const popupFigcaption = popupImage.querySelector(".popup-img__figcaption");
//Элементы попап меню профиля
const popupProfile = document.querySelector("#popup-change-profile");
const formProfile = document.forms["profile-form"];
const popupInputName = formProfile.querySelector("#popup-input-name");
const popupInputJob = formProfile.querySelector("#popup-input-job");
//Попап добавления карточки
const popupCard = document.querySelector("#popup-add-card");
const formAddCard = document.forms["card-form"];
const nameCard = formAddCard.querySelector("#popup-input-place");
const linkCard = formAddCard.querySelector("#popup-input-link");
const buttonSubmitCard = formAddCard.querySelector(".popup-form__button");

/**
 * Объявление функций
 */

// Закрытие попапа на Esc
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

//Обработчик сабмита для профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileJob.textContent = popupInputJob.value;
  closePopup(popupProfile);
};

//Обработчик добавления карточки
const handleaAddCardFormSubmit = (evt) => {
  evt.preventDefault();
  addCard(nameCard.value, linkCard.value);
  closePopup(popupCard);
  buttonSubmitCard.classList.add("popup-form__button_disabled");
  evt.target.reset();
};

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

/**
 * Добавление слушателей
 */
// Найти и закрыть все попапы по крестику или оверлею
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

// Click
buttonOpenProfile.addEventListener("click", () => {
  openPopup(popupProfile);
});
buttonOpenPopupCard.addEventListener("click", () => openPopup(popupCard));

// Submit
formProfile.addEventListener("submit", handleProfileFormSubmit);
formAddCard.addEventListener("submit", handleaAddCardFormSubmit);

/**
 * Функциональная часть
 */

// Присвоить попап инпутам текст имени и работы
popupInputName.value = profileName.textContent;
popupInputJob.value = profileJob.textContent;

// Заполнить карточки из предоставленных данных
fillInitialCards(initialCards);
