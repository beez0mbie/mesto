import { Card } from "./card.js";
import { initialCards } from "./data.js";
import { openPopup, closePopup } from "./utils.js";

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
const formProfile = document.forms["profile-form"];
const popupInputName = formProfile.querySelector("#popup-input-name");
const popupInputJob = formProfile.querySelector("#popup-input-job");
//Попап добавления карточки
const popupCard = document.querySelector("#popup-add-card");
const formAddCard = document.forms["card-form"];
const nameCard = formAddCard.querySelector("#popup-input-place");
const linkCard = formAddCard.querySelector("#popup-input-link");
const buttonSubmitCard = formAddCard.querySelector(".popup-form__button");

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
// Найти и закрыть все попапы по крестику или оверлею

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
