let page = document.querySelector(".page");
let profileEditButton = page.querySelector(".profile__edit-button");

let popup = document.querySelector(".popup");
let closePopupButton = popup.querySelector(".popup__close-button");

let form = popup.querySelector(".popup__form");
let formInputs = form.querySelectorAll(".popup__input");
let nameInput = formInputs[0];
let jobInput = formInputs[1];

function handleOpenPopup() {
  let profileNameText = page.querySelector(".profile__title").textContent;
  let profileJobText = page.querySelector(".profile__subtitle").textContent;

  popup.classList.add("popup_opened");

  nameInput.value = profileNameText;
  jobInput.value = profileJobText;
}

function handleClosePopup() {
  popup.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  let name = nameInput.value;
  let job = jobInput.value;

  let profileName = page.querySelector(".profile__title");
  let profileJob = page.querySelector(".profile__subtitle");

  profileName.textContent = name;
  profileJob.textContent = job;

  handleClosePopup();
}

profileEditButton.addEventListener("click", handleOpenPopup);
closePopupButton.addEventListener("click", handleClosePopup);
form.addEventListener("submit", handleFormSubmit);
