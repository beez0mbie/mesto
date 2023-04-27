export const popupImage = document.querySelector("#popup-image");
export const popupImageElement = popupImage.querySelector(".popup-img__image");
export const popupFigcaption = popupImage.querySelector(
  ".popup-img__figcaption"
);
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

// Закрытие попапа на Esc
const closePopupByEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

//Общий метод открытия попапа
export const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
};

//Общий метод закрытия попапа
export const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
};
