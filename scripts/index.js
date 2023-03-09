let page = document.querySelector(".page");

//Элементы профиля
let profileEditButton = page.querySelector(".profile__edit-button");
let profileName = page.querySelector(".profile__title");
let profileJob = page.querySelector(".profile__subtitle");

//Элементы попап меню
let popup = document.querySelector(".popup");
let closePopupButton = popup.querySelector(".popup__close-button");
let form = popup.querySelector(".popup__form");
let nameInput = document.getElementById("popup-input-name");
let jobInput = document.getElementById("popup-input-job");

function handleOpenPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  popup.classList.add("popup_opened");
}

function handleClosePopup() {
  popup.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  handleClosePopup();
}

profileEditButton.addEventListener("click", handleOpenPopup);
closePopupButton.addEventListener("click", handleClosePopup);
form.addEventListener("submit", handleFormSubmit);
