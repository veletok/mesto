import {escCode} from '../utils/constants.js';
export class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
  }

  open(){
    document.addEventListener("keydown", this._handleEscClose);
    this._popup.classList.add("popup_opened");
  }

  close(){
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.keyCode === escCode) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if(evt.srcElement.classList.contains("popup")) {
        this.close();
      }
    });
  }
}
