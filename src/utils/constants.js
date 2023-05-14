const page = document.querySelector(".page");
export const buttonOpenProfile = page.querySelector(".profile__edit-button");
export const buttonOpenPopupCard = page.querySelector(".profile__add-button");
export const profileForm = document.forms["profile-form"];
export const cardForm = document.forms["card-form"];

export const validatorConfig = {
  inputSelector: ".popup-form__input",
  submitButtonSelector: ".popup-form__button",
  inactiveButtonClass: "popup-form__button_disabled",
  inputErrorClass: "popup-form__input_type_error",
  errorClass: "popup-form__input-error_active",
};

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
