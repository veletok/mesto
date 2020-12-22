const validationParams = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_disable",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

function showInputError(formElement, inputElement, validationParams) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.classList.add(validationParams.errorClass);
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(validationParams.inputErrorClass);
}

function hideInputError(formElement, inputElement, validationParams) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.classList.remove(validationParams.errorClass);
  errorElement.textContent = "";
  inputElement.classList.remove(validationParams.inputErrorClass);
}

function checkInputValidity(formElement, inputElement, validationParams) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, validationParams);
  } else {
    hideInputError(formElement, inputElement, validationParams);
  }
}

function toggleButtonState(elementButton, isValid, validationParams) {
  if (isValid) {
    elementButton.classList.remove(validationParams.inactiveButtonClass);
    elementButton.disabled = false;
  } else {
    elementButton.classList.add(validationParams.inactiveButtonClass);
    elementButton.disabled = true;
  }
}
function setEventListeners(formElement, validationParams) {
  const inputList = formElement.querySelectorAll(
    validationParams.inputSelector
  );
  const submitButton = formElement.querySelector(
    validationParams.submitButtonSelector
  );
  inputList.forEach((inputElement) => {
    if(inputElement.classList.contains('popup__input_type_name')) {
      buttonToogle(formElement, inputElement, validationParams, submitButton);
    }
    inputElement.addEventListener("input", () => {
      buttonToogle(formElement, inputElement, validationParams, submitButton);
    });
  });
}

function buttonToogle(formElement, inputElement, validationParams, submitButton) {
  checkInputValidity(formElement, inputElement, validationParams);
      toggleButtonState(
        submitButton,
        formElement.checkValidity(),
        validationParams
      );
}
function enableValidation(validationParams) {
  const formList = document.querySelectorAll(validationParams.formSelector);
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationParams);
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    const submitButton = formElement.querySelector(
      validationParams.submitButtonSelector
    );
    toggleButtonState(
      submitButton,
      formElement.checkValidity(),
      validationParams
    );
  });
}

enableValidation(validationParams);
