const page = document.querySelector(".page");

// Закрытие попапа

const closePopupByEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

//Общий метод открытия попапа
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
};
//Общий метод закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
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

const disabledSubmitButtonClass = "popup-form__button_disabled";

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
const submitProfileButton = formProfile.querySelector(".popup-form__button");
nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  const hasInvalid = Array.from(submitProfileButton.classList).includes(
    disabledSubmitButtonClass
  );
  if (!hasInvalid) {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfile);
  }
};

profileEditButton.addEventListener("click", () => {
  openPopup(popupProfile);
});
formProfile.addEventListener("submit", handleProfileFormSubmit);

//Общие элементы карт
const cardsElement = page.querySelector(".cards");
const templateCard = document.querySelector("#card").content;

//Создание карточки
const createCard = (cardName, cardLink) => {
  const cardElement = templateCard.querySelector(".card").cloneNode(true);

  const heart = cardElement.querySelector(".card__heart");
  heart.addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__heart_active");
  });

  const trash = cardElement.querySelector(".card__trash");
  trash.addEventListener("click", () => {
    cardElement.remove();
  });

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", () => {
    popupImageElement.src = cardLink;
    popupImageElement.alt = `Фото: ${cardName}`;
    popupFigcaption.textContent = cardName;
    openPopup(popupImage);
  });

  cardImage.src = cardLink;
  cardImage.alt = `Фото: ${cardName}`;
  cardElement.querySelector(".card__title").textContent = cardName;

  return cardElement;
};

//Добавление карточки
const addCard = (cardName, cardLink) => {
  const cardElement = createCard(cardName, cardLink);
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
const submitCardButton = formAddCard.querySelector(".popup-form__button");

const handleaAddCardFormSubmit = (evt) => {
  evt.preventDefault();
  const hasInvalid = Array.from(submitCardButton.classList).includes(
    disabledSubmitButtonClass
  );
  if (!hasInvalid) {
    addCard(nameCard.value, linkCard.value);

    closePopup(popupCard);
    evt.target.reset();
  }
};

addCardsButton.addEventListener("click", () => openPopup(popupCard));
formAddCard.addEventListener("submit", handleaAddCardFormSubmit);
