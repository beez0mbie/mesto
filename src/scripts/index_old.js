import { Card } from "./card.js";
import { FormValidator } from "./formValidator.js";
import { initialCards, validatorConfig } from "./data.js";
import { openPopup, closePopup } from "./utils.js";

import "../pages/index.css";

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
//Элементы попап меню профиля
const popupProfile = document.querySelector("#popup-change-profile");
const profileForm = document.forms["profile-form"];
const popupInputName = profileForm.querySelector("#popup-input-name");
const popupInputJob = profileForm.querySelector("#popup-input-job");
//Попап добавления карточки
const popupCard = document.querySelector("#popup-add-card");
const cardForm = document.forms["card-form"];
const nameCard = cardForm.querySelector("#popup-input-place");
const linkCard = cardForm.querySelector("#popup-input-link");
// Создание и присваивание экземляров класса
const profileFormValidator = new FormValidator(validatorConfig, profileForm);
const cardFormValidator = new FormValidator(validatorConfig, cardForm);

/**
 * Объявление функций
 */

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
  evt.target.reset();
  cardFormValidator.toggleButtonState();
};

//Добавление карточки
const addCard = (cardName, cardLink) => {
  const card = new Card(cardName, cardLink, "#card");
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

// Click
buttonOpenProfile.addEventListener("click", () => {
  openPopup(popupProfile);
});
buttonOpenPopupCard.addEventListener("click", () => openPopup(popupCard));

// Submit
profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleaAddCardFormSubmit);

/**
 * Функциональная часть
 */

// Присвоить попап инпутам текст имени и работы
popupInputName.value = profileName.textContent;
popupInputJob.value = profileJob.textContent;

// Заполнить карточки из предоставленных данных
fillInitialCards(initialCards);

// Включить валидацию
profileFormValidator.enableValivation();
cardFormValidator.enableValivation();
