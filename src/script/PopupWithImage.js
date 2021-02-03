import {Popup} from './Popup.js'
import {popupImg} from '../utils/constants.js';

export class PopupWithImage extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(data){
    this._imgName = data.name;
    this._imgLink = data.link;

    this._popupImageImg = this._popup.querySelector(".popup-image__img");
    this._popupImageImg.alt = `Фото ${this._imgName}`;
    this._popupImageImg.src = this._imgLink;
    popupImg.querySelector(".popup-image__title").textContent = this._imgName;
    super.open();
  }
}

