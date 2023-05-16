import { FormValidator } from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { Card } from "../components/Card.js";
import {
  initialCards,
  validatorConfig,
  buttonOpenProfile,
  buttonOpenPopupCard,
  profileForm,
  cardForm,
} from "../utils/constants.js";
import "../pages/index.css";

const userInfo = new UserInfo({
  nameSelector: "#popup-input-name",
  jobSelector: "#popup-input-job",
});

const popupProfile = new PopupWithForm("#popup-change-profile", () => {
  userInfo.setUserInfo();
});
const popupWithImage = new PopupWithImage("#popup-image");

const cardsContainer = new Section(
  {
    dataItems: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link, "#card", (name, link) => {
        popupWithImage.open(name, link);
      });
      const cardElement = card.generateCard();
      cardsContainer.addItem(cardElement);
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
      popupWithImage.open(name, link);
    }
  );
  const cardElement = card.generateCard();
  cardsContainer.addItem(cardElement);
});

const profileFormValidator = new FormValidator(validatorConfig, profileForm);
const cardFormValidator = new FormValidator(validatorConfig, cardForm);

buttonOpenProfile.addEventListener("click", () => {
  popupProfile.open();
  userInfo.getUserInfo();
});

buttonOpenPopupCard.addEventListener("click", () => {
  cardFormValidator.toggleButtonState();
  popupCard.open();
});

userInfo.getUserInfo();
cardsContainer.renderItems();
popupProfile.setEventListeners();
popupWithImage.setEventListeners();
popupCard.setEventListeners();
profileFormValidator.enableValivation();
cardFormValidator.enableValivation();
