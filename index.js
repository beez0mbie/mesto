const page = document.querySelector(".page");
const profileEditButton = page.querySelector(".profile__edit-button");

const popup = document.querySelector(".popup");
const closePopupButton = popup.querySelector(".popup__close-button");

profileEditButton.addEventListener("click", openPopup);
closePopupButton.addEventListener("click", closePopup);

function openPopup() {
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}
