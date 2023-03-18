let page = document.querySelector(".page");

//Элементы профиля
let profileEditButton = page.querySelector(".profile__edit-button");
let profileName = page.querySelector(".profile__title");
let profileJob = page.querySelector(".profile__subtitle");

//Элементы попап меню профиля
let popupProfile = document.querySelector("#popupChangeProfile");
let closePopupButton = popupProfile.querySelector(".popup__close-button");
let formProfile = popupProfile.querySelector(".popup__form");
let nameInput = document.getElementById("popup-input-name");
let jobInput = document.getElementById("popup-input-job");
nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

function togglePopup(popup) {
  popup.classList.toggle("popup_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  togglePopup(popupProfile);
}

profileEditButton.addEventListener("click", () => togglePopup(popupProfile));
closePopupButton.addEventListener("click", () => togglePopup(popupProfile));
formProfile.addEventListener("submit", handleProfileFormSubmit);

// Cards
const fillInitialCards = () => {
  const initialCards = [
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
  const cardsElement = page.querySelector(".cards");
  const templateCard = document.querySelector("#card").content;

  initialCards.forEach((card) => {
    const cardElement = templateCard.querySelector(".card").cloneNode(true);
    cardElement.querySelector(".card__image").src = card.link;
    cardElement.querySelector(".card__image").alt = `Фото: ${card.name}`;
    cardElement.querySelector(".card__title").textContent = card.name;
    cardsElement.append(cardElement);
  });
};

fillInitialCards();
