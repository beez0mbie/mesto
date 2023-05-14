import { FormValidator } from "./formValidator.js";
import { initialCards, validatorConfig } from "./data.js";
import { UserInfo } from "../components/UserInfo";
import { PopupWithForm } from "../components/PopupWithForm";
import { PopupWithImage } from "../components/PopupWithImage";
import { Section } from "../components/Section";
import { Card } from "../components/Card.js";
import "../pages/index.css";

const page = document.querySelector(".page");
const buttonOpenProfile = page.querySelector(".profile__edit-button");
const buttonOpenPopupCard = page.querySelector(".profile__add-button");
const profileForm = document.forms["profile-form"];
const cardForm = document.forms["card-form"];
const profileFormValidator = new FormValidator(validatorConfig, profileForm);
const cardFormValidator = new FormValidator(validatorConfig, cardForm);

const userInfo = new UserInfo({
  nameSelector: "#popup-input-name",
  jobSelector: "#popup-input-job",
});

const popupProfile = new PopupWithForm("#popup-change-profile", () => {
  userInfo.setUserInfo();
});

const cardList = new Section(
  {
    dataItems: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link, "#card", (name, link) => {
        const popupWithImage = new PopupWithImage("#popup-image");
        popupWithImage.open(name, link);
        popupWithImage.setEventListeners();
      });
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  ".cards"
);

const popupCard = new PopupWithForm("#popup-add-card", (formData) => {
  const card = new Card(
    formData["popup-input-place"],
    formData["popup-input-link"],
    "#card",
    (name, link) => {
      const popupWithImage = new PopupWithImage("#popup-image");
      popupWithImage.open(name, link);
      popupWithImage.setEventListeners();
    }
  );
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
});

buttonOpenProfile.addEventListener("click", () => {
  popupProfile.open();
  userInfo.getUserInfo();
});

buttonOpenPopupCard.addEventListener("click", () => {
  cardFormValidator.toggleButtonState();
  popupCard.open();
});

userInfo.getUserInfo();
cardList.renderItems();
popupProfile.setEventListeners();
popupCard.setEventListeners();
profileFormValidator.enableValivation();
cardFormValidator.enableValivation();
