const page = document.querySelector(".page");

//Общий метод открытия попапа
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
};
//Общий метод закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
};

// Найти и закрыть все попапы по крестику или оверлею
const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__close-button")
    ) {
      closePopup(popup);
    }
  });
});

//Попап картинки
const popupImage = document.querySelector("#popup-image");
const popupImageElement = popupImage.querySelector(".popup-img__image");
const popupFigcaption = popupImage.querySelector(".popup-img__figcaption");

//Элементы профиля
const profileEditButton = page.querySelector(".profile__edit-button");
const profileName = page.querySelector(".profile__title");
const profileJob = page.querySelector(".profile__subtitle");

//Элементы попап меню профиля
const popupProfile = document.querySelector("#popup-change-profile");

const formProfile = document.forms["profile-form"];
const nameInput = formProfile.querySelector("#popup-input-name");
const jobInput = formProfile.querySelector("#popup-input-job");

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupProfile);
};

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile);
});
formProfile.addEventListener("submit", handleProfileFormSubmit);

//Общие элементы карт
const cardsElement = page.querySelector(".cards");
const templateCard = document.querySelector("#card").content;

//Общий метод добавления карточек
const addCard = (cardName, cardLink) => {
  const cardElement = templateCard.querySelector(".card").cloneNode(true);

  const heart = cardElement.querySelector(".card__heart");
  heart.addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__heart_active");
  });

  const trash = cardElement.querySelector(".card__trash");
  trash.addEventListener("click", () => {
    cardElement.remove();
  });

  const image = cardElement.querySelector(".card__image");
  image.addEventListener("click", () => {
    popupImageElement.src = cardLink;
    popupImageElement.alt = `Фото: ${cardName}`;
    popupFigcaption.textContent = cardName;
    openPopup(popupImage);
  });

  cardElement.querySelector(".card__image").src = cardLink;
  cardElement.querySelector(".card__image").alt = `Фото: ${cardName}`;
  cardElement.querySelector(".card__title").textContent = cardName;
  cardsElement.prepend(cardElement);
};

//Заполнение карточек начальным состоянием
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

  initialCards.forEach((card) => {
    addCard(card.name, card.link);
  });
};

fillInitialCards();

//Элементы добавления карточки
const addCardsButton = page.querySelector(".profile__add-button");

//Попап добавления карточки
const popupCard = document.querySelector("#popup-add-card");

const formAddCard = document.forms["card-form"];
const nameCard = formAddCard.querySelector("#popup-input-place");
const linkCard = formAddCard.querySelector("#popup-input-link");

const handleaAdCardFormSubmit = (evt) => {
  evt.preventDefault();

  addCard(nameCard.value, linkCard.value);

  closePopup(popupCard);
  nameCard.value = "";
  linkCard.value = "";
};

addCardsButton.addEventListener("click", () => openPopup(popupCard));
formAddCard.addEventListener("submit", handleaAdCardFormSubmit);
