import {openPopup, popupImg} from './popups.js'

export class Card {
  constructor(data, cardSelector) {
    this._titleValue = data.name;
    this._imgValue = data.link;
    this._cardSelector = cardSelector;
  }

  //Получаем template
  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content.cloneNode(true);
    return cardTemplate;
  }
  //Генерируем новую карточку, возвращаем её
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const elementImg = this._element.querySelector(".element__img");
    elementImg.src = this._imgValue;
    this._element.querySelector(".element__text").textContent = this._titleValue;
    elementImg.alt = `Фото ${this._titleValue}`;

    return this._element;
  }


  _setEventListeners() {
    //Срабатывает при клике на кнопку лайка
    this._element.querySelector(".element__like-button").addEventListener("click", (evt) => {
      this._toogleLikeClick(evt);
    });
    //Срабатывает при клике на кнопку удаления
    this._element.querySelector(".element__delete-button").addEventListener("click", (evt) => {
      this._handleDeleteClick(evt);
    });
    //Срабатывает при клике на картинку
    this._element.querySelector(".element__img").addEventListener("click", () => {
      this._popupImgZoom();
    });
  }
  //Срабатывает при клике на кнопку лайка, переключает его состояние
  _toogleLikeClick(evt) {
    evt.target.classList.toggle("element__like-button_active");
  }
  //Удаляет элемент
  _handleDeleteClick(evt) {
    evt.target.closest(".element").remove();
    this._element = null;
  }
  //Вызывает попап с картинкой
  _popupImgZoom() {
    const popupImageImg = popupImg.querySelector(".popup-image__img");
    popupImageImg.alt = `Фото ${this._titleValue}`;
    popupImageImg.src = this._imgValue;
    popupImg.querySelector(".popup-image__title").textContent = this._titleValue;
    openPopup(popupImg);
  }
}