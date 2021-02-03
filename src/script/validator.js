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
    this._toggleButtonState(this._submitButton, this._formElement.checkValidity());
  }

  _showInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    this._errorElement.classList.add(this._validationParams.errorClass);
    this._errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._validationParams.inputErrorClass);
  }

  hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    this._errorElement.classList.remove(this._validationParams.errorClass);
    this._errorElement.textContent = "";
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
    this._inputList = this._formElement.querySelectorAll(
      this._validationParams.inputSelector
    );
    this._submitButton = this._formElement.querySelector(
      this._validationParams.submitButtonSelector
    );
    this._inputList.forEach((inputElement) => {
      if (inputElement.classList.contains('popup__input_type_name')) {
        this._buttonToogle(inputElement);
      }
      inputElement.addEventListener("input", () => {
        this._buttonToogle(inputElement);
      });
    });
  }

  _buttonToogle(inputElement) {
    this._checkInputValidity(inputElement);
    this._toggleButtonState(
      this._submitButton,
      this._formElement.checkValidity(),
      this._validationParams
    );
  }
}
