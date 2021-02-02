import {Popup} from './Popup.js'
import {validationParams} from '../utils/constants.js';
import {Validator} from './validator.js'

export class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._popup = popupSelector;
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(validationParams.formSelector);
  }

  close(){
    this._inputList = this._popup.querySelectorAll(validationParams.inputSelector);
    this._validationElement = new Validator(validationParams, this._form);
    this._inputList.forEach((inputElement) => {
      this._validationElement.hideInputError(inputElement);
    });

    this._form.removeEventListener('submit', this._submitEvent)
    this._form.reset();
    super.close();
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(validationParams.inputSelector);
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