const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup-form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup-form__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup-form__input_type_error");
  errorElement.classList.remove("popup-form__input-error_active");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) =>
  inputList.some((inputElement) => !inputElement.validity.valid);

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup-form__button_disabled");
  } else {
    buttonElement.classList.remove("popup-form__button_disabled");
  }
};

const setEvenListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(".popup-form__input")
  );
  const buttonElement = formElement.querySelector(".popup-form__button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

enableValivation = () => {
  const formList = Array.from(document.querySelectorAll(".popup-form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEvenListeners(formElement);
  });
};

enableValivation();
