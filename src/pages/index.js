import { FormValidator } from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  PopupWithForm,
  PopupWithFormSubmit,
  PopupWithImage,
} from "../components/popup";
import { DefaultCard, MyCard } from "../components/card";
import { Section } from "../components/Section.js";
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

let myId = "";

const getCardElement = (cardName, cardLink, cardId, cardOwner, cardLikes) => {
  const isMyCard = myId.length > 0 && myId === cardOwner._id;
  const card = isMyCard
    ? new MyCard(
        cardName,
        cardLink,
        cardLikes,
        "#my-card",
        (name, link) => {
          popupWithImage.open(name, link);
        },
        () => {
          popupDelete.open();
          popupDelete.setSubmitAction(() => {
            api
              .deleteCard(cardId)
              .then(() => {
                card.deleteCard();
                popupDelete.close();
              })
              .catch((err) =>
                console.error(`Error api.deleteCard():\n ${err}`)
              );
          });
        }
      )
    : new DefaultCard(
        cardName,
        cardLink,
        cardLikes,
        "#default-card",
        (name, link) => {
          popupWithImage.open(name, link);
        }
      );
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

const popupDelete = new PopupWithFormSubmit("#popup-delete");

const popupWithImage = new PopupWithImage("#popup-image");

const cardsContainer = new Section(
  {
    renderer: (item) => {
      const cardElement = getCardElement(
        item.name,
        item.link,
        item._id,
        item.owner,
        item.likes.length
      );
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
      const cardElement = getCardElement(
        res.name,
        res.link,
        res._id,
        res.owner,
        res.likes.length
      );
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
    myId = user._id;
    userInfo.setUserInfo(user.name, user.about);
    cardsContainer.renderItems(initialCards);
  })
  .catch((err) => console.error(`Error api.getAppInfo():\n ${err}`));

popupProfile.setEventListeners();
popupWithImage.setEventListeners();
popupCard.setEventListeners();
popupDelete.setEventListeners();
profileFormValidator.enableValivation();
cardFormValidator.enableValivation();
