import {Popup} from './Popup.js'
import {popupDelete, validationParams} from '../utils/constants.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, validatorForm, {handleFormSubmit}) {
    super(popupSelector);
    this._popup = popupSelector;
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(validationParams.formSelector);
    this._validatorForm = validatorForm;
    this._submitButton = this._form.querySelector([validationParams.submitButtonSelector])
  }

  open(){
    this._form.addEventListener('submit', this._submitEvent)
    super.open();
  }
  close(){
    if(this._popup != popupDelete){
      this._submitButton.disabled = true;
      this._submitButton.classList.add(validationParams.inactiveButtonClass);
    }
    this._inputList = this._popup.querySelectorAll(validationParams.inputSelector);
    this._inputList.forEach((inputElement) => {
      this._validatorForm.hideInputError(inputElement);
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
    if(this._popup === popupDelete){
      this._handleFormSubmit(this._cardDeleteData, this._cardElement);
    }else{
      this._handleFormSubmit(this._getInputValues());
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitEvent)
  }

  deletePopupData(data, element) {
    this._cardDeleteData = data;
    this._cardElement = element;

  }
}
