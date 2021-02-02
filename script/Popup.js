import {popupAddButtonSubmit } from '../utils/constants.js';

export class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
  }

  open(){
    this._popup.classList.add("popup_opened");
    popupAddButtonSubmit.disabled = true;
    this.setEventListeners();
  }

  close(){
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.keyCode === 27) {
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popup.addEventListener("mousedown", (evt) => {
      if(evt.srcElement.classList.contains("popup")) {
        this.close();
      }
    });
  }
}
