import {Popup} from './Popup.js'

export class PicturePopup extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageImg = this._popup.querySelector(".popup-image__img");
    this._popupImageTitle = this._popup.querySelector(".popup-image__title");
  }
  open(data){
    this._imgName = data.name;
    this._imgLink = data.link;
    this._popupImageImg.alt = `Фото ${this._imgName}`;
    this._popupImageImg.src = this._imgLink;
    this._popupImageTitle.textContent = this._imgName;
    super.open();
  }
}

