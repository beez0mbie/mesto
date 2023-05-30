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
  avatarImage,
  avatarForm,
} from "../utils/constants.js";
import "../pages/index.css";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "b5ca8ab9-6ed2-4347-9257-2874be1468dc",
    "Content-Type": "application/json",
  },
});

let myUserId = null;

const getCardElement = (item) => {
  const isMyCard = myUserId !== null && myUserId === item.owner._id;
  const card = isMyCard
    ? new MyCard(
        {
          cardData: item,
          handleCardClick: (name, link) => {
            popupWithImage.open(name, link);
          },
          handleLikeCard: (id) => {
            api
              .likeCard(id)
              .then((res) => {
                card.setLikesInfo(res.likes);
                card.updateLikes();
              })
              .catch((err) => console.error(`Error api.likeCard():\n ${err}`));
          },
          handleDislikeCard: (id) => {
            api
              .dislikeCard(id)
              .then((res) => {
                card.setLikesInfo(res.likes);
                card.updateLikes();
              })
              .catch((err) => console.error(`Error api.likeCard():\n ${err}`));
          },
          handleDeleteClick: (id) => {
            popupDelete.open();
            popupDelete.setSubmitAction(() => {
              api
                .deleteCard(id)
                .then(() => {
                  card.deleteCard();
                  popupDelete.close();
                })
                .catch((err) =>
                  console.error(`Error api.deleteCard():\n ${err}`)
                );
            });
          },
        },
        "#my-card",
        myUserId
      )
    : new DefaultCard(
        {
          cardData: item,
          handleCardClick: (name, link) => {
            popupWithImage.open(name, link);
          },
          handleLikeCard: (id) => {
            api
              .likeCard(id)
              .then((res) => {
                card.setLikesInfo(res.likes);
                card.updateLikes();
              })
              .catch((err) => console.error(`Error api.likeCard():\n ${err}`));
          },
          handleDislikeCard: (id) => {
            api
              .dislikeCard(id)
              .then((res) => {
                card.setLikesInfo(res.likes);
                card.updateLikes();
              })
              .catch((err) => console.error(`Error api.likeCard():\n ${err}`));
          },
        },
        "#default-card",
        myUserId
      );
  return card.generateCard();
};

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
  avatarSelector: ".profile__logo",
});

const popupProfile = new PopupWithForm("#popup-change-profile", (inputData) => {
  const newUserName = inputData["popup-input-name"];
  const newUserJob = inputData["popup-input-job"];
  api
    .updateUserInfo(newUserName, newUserJob)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      popupProfile.close();
    })
    .catch((err) => console.error(`Error api.updateUserInfo():\n ${err}`));
});

const popupAvatar = new PopupWithForm("#popup-avatar", (formData) => {
  const avatarLink = formData["popup-input-link-avatar"];
  api
    .updateAvatar(avatarLink)
    .then((res) => {
      userInfo.setAvatar(res.avatar);
      popupAvatar.close();
    })
    .catch((err) => console.error(`Error api.updateAvatar():\n ${err}`));
});

const popupDelete = new PopupWithFormSubmit("#popup-delete");

const popupWithImage = new PopupWithImage("#popup-image");

const cardsContainer = new Section(
  {
    renderer: (item) => {
      const cardElement = getCardElement(item);
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
      const cardElement = getCardElement(res);
      cardsContainer.addItem(cardElement);
      popupCard.close();
    })
    .catch((err) => console.error(`Error api.addCard():\n ${err}`));
});

const profileFormValidator = new FormValidator(validatorConfig, profileForm);
const cardFormValidator = new FormValidator(validatorConfig, cardForm);
const avatarFormValidator = new FormValidator(validatorConfig, avatarForm);

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

avatarImage.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  popupAvatar.open();
});

api
  .getAppInfo()
  .then((res) => {
    const [user, initialCards] = res;
    myUserId = user._id;
    userInfo.setUserInfo(user.name, user.about);
    userInfo.setAvatar(user.avatar);
    cardsContainer.renderItems(initialCards);
  })
  .catch((err) => console.error(`Error api.getAppInfo():\n ${err}`));

popupProfile.setEventListeners();
popupWithImage.setEventListeners();
popupCard.setEventListeners();
popupDelete.setEventListeners();
popupAvatar.setEventListeners();
profileFormValidator.enableValivation();
cardFormValidator.enableValivation();
avatarFormValidator.enableValivation();
