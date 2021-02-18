import {Popup} from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(popupSelector, validatorForm, {handleFormSubmit}, validationParams) {
    super(popupSelector);
    this._popup = popupSelector;
    this._handleFormSubmit = handleFormSubmit;
    this._validationParams = validationParams;
    this._form = this._popup.querySelector(this._validationParams.formSelector);
    this._validatorForm = validatorForm;
    this._submitButton = this._form.querySelector([this._validationParams.submitButtonSelector])
  }
  close(){
    this._form.reset();
    super.close();
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(this._validationParams.inputSelector);
    this._formValues = {};
    this._inputList.forEach((inputElement) => {
      this._formValues[inputElement.name] = inputElement.value;
    });
    return this._formValues;
  }

  _submitEvent = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitEvent)
  }
}
