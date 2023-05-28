import { FormValidator } from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { Card } from "../components/Card.js";
import { Api } from "../components/Api.js";
import {
  validatorConfig,
  buttonOpenProfile,
  buttonOpenPopupCard,
  profileForm,
  cardForm,
} from "../utils/constants.js";
import "../pages/index.css";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66/cards",
  headers: {
    authorization: "b5ca8ab9-6ed2-4347-9257-2874be1468dc",
    "Content-Type": "application/json",
  },
});

const getCardElement = (cardName, cardLink) => {
  const card = new Card(cardName, cardLink, "#card", (name, link) => {
    popupWithImage.open(name, link);
  });
  return card.generateCard();
};

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
});

const popupProfile = new PopupWithForm("#popup-change-profile", (inputData) => {
  const newUserName = inputData["popup-input-name"];
  const newUserJob = inputData["popup-input-job"];
  userInfo.setUserInfo(newUserName, newUserJob);
  popupProfile.close();
});
const popupWithImage = new PopupWithImage("#popup-image");

const cardsContainer = new Section(
  {
    renderer: (item) => {
      const cardElement = getCardElement(item.name, item.link);
      cardsContainer.addItem(cardElement);
    },
  },
  ".cards"
);

const popupCard = new PopupWithForm("#popup-add-card", (formData) => {
  const cardElement = getCardElement(
    formData["popup-input-place"],
    formData["popup-input-link"]
  );
  cardsContainer.addItem(cardElement);
  popupCard.close();
});

const profileFormValidator = new FormValidator(validatorConfig, profileForm);
const cardFormValidator = new FormValidator(validatorConfig, cardForm);

buttonOpenProfile.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();
  popupProfile.setInputValues({
    "popup-input-name": name,
    "popup-input-job": job,
  });
  profileFormValidator.resetValidation();
  popupProfile.open();
});

buttonOpenPopupCard.addEventListener("click", () => {
  cardFormValidator.resetValidation();
  popupCard.open();
});

api
  .getInitialCards()
  .then((result) => cardsContainer.renderItems(result))
  .catch((err) => console.error(`Ошибка api.getInitialCards ${err}`));

// cardsContainer.renderItems(initialCards);
popupProfile.setEventListeners();
popupWithImage.setEventListeners();
popupCard.setEventListeners();
profileFormValidator.enableValivation();
cardFormValidator.enableValivation();
