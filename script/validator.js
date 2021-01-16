export class Validator {
  constructor(validationParams, formElement) {
    this._validationParams = validationParams;
    this._formElement = formElement;
  }

  enableValidation() {
    this._setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    const submitButton = this._formElement.querySelector(
      this._validationParams.submitButtonSelector
    );
    this._toggleButtonState(submitButton, this._formElement.checkValidity());
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.add(this._validationParams.errorClass);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._validationParams.inputErrorClass);
  }

  hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(this._validationParams.errorClass);
    errorElement.textContent = "";
    inputElement.classList.remove(this._validationParams.inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this.hideInputError(inputElement);
    }
  }

  _toggleButtonState(elementButton, isValid) {
    if (isValid) {
      elementButton.classList.remove(this._validationParams.inactiveButtonClass);
      elementButton.disabled = false;
    } else {
      elementButton.classList.add(this._validationParams.inactiveButtonClass);
      elementButton.disabled = true;
    }
  }

  _setEventListeners() {
    const inputList = this._formElement.querySelectorAll(
      this._validationParams.inputSelector
    );
    const submitButton = this._formElement.querySelector(
      this._validationParams.submitButtonSelector
    );
    inputList.forEach((inputElement) => {
      if (inputElement.classList.contains('popup__input_type_name')) {
        this._buttonToogle(inputElement, submitButton);
      }
      inputElement.addEventListener("input", () => {
        this._buttonToogle(inputElement, submitButton);
      });
    });
  }

  _buttonToogle(inputElement, submitButton) {
    this._checkInputValidity(inputElement);
    this._toggleButtonState(
      submitButton,
      this._formElement.checkValidity(),
      this._validationParams
    );
  }
}
