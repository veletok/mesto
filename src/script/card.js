export class Card {
  constructor(data, cardSelector, {handleCardClick}) {
    this._titleValue = data.name;
    this._imgValue = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  //Получаем template
  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
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
      this._handleCardClick();
    });
  }
  //Срабатывает при клике на кнопку лайка, переключает его состояние
  _toogleLikeClick(evt) {
    evt.target.classList.toggle("element__like-button_active");
  }
  //Удаляет элемент
  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
  }
}
