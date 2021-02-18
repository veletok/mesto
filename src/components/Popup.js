export class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._popupCloseButton = this._popup.querySelector('.popup__button-close');
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
    if (evt.keyCode === 27) {
      this.close();
    }
  }

  setEventListeners() {
    //закрытие попапа по кнопке
    this._popupCloseButton.addEventListener("click", () => {
      this.close();
    });

    this._popup.addEventListener("mousedown", (evt) => {
      if(evt.srcElement.classList.contains("popup")) {
        this.close();
      }
    });
  }
}
