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
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
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
  api
    .updateUserInfo(newUserName, newUserJob)
    .then((res) => userInfo.setUserInfo(res.name, res.about))
    .catch((err) => console.error(`Error api.updateUserInfo():\n ${err}`));
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
  const cardName = formData["popup-input-place"];
  const cardLink = formData["popup-input-link"];
  api
    .addCard(cardName, cardLink)
    .then((res) => {
      const cardElement = getCardElement(res.name, res.link);
      cardsContainer.addItem(cardElement);
    })
    .catch((err) => console.error(`Error api.addCard():\n ${err}`));
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
  .getAppInfo()
  .then((res) => {
    const [user, initialCards] = res;
    userInfo.setUserInfo(user.name, user.about);
    cardsContainer.renderItems(initialCards);
  })
  .catch((err) => console.error(`Error api.getAppInfo():\n ${err}`));

// cardsContainer.renderItems(initialCards);
popupProfile.setEventListeners();
popupWithImage.setEventListeners();
popupCard.setEventListeners();
profileFormValidator.enableValivation();
cardFormValidator.enableValivation();
