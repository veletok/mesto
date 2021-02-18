import {Popup} from './Popup.js'

export class DeletePopup extends Popup {
  constructor(popupSelector, validatorForm, {handleFormSubmit}, validationParams) {
    super(popupSelector);
    this._popup = popupSelector;
    this._handleFormSubmit = handleFormSubmit;
    this._validationParams = validationParams;
    this._form = this._popup.querySelector(this._validationParams.formSelector);
    this._validatorForm = validatorForm;
    this._submitButton = this._form.querySelector([this._validationParams.submitButtonSelector])
  }

  _submitEvent = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._cardDeleteData, this._cardElement);
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
