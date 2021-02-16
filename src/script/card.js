export class Card {
  constructor (data, cardSelector, {handleCardClick}, {deleteClick}, {setLikeAPI}, {removeLikeAPI}, userInfoData) {
    this._titleValue = data.name;
    this._imgValue = data.link;
    this._likesValue = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._deleteClick = deleteClick;
    this._cardData = data;
    this._setLikeAPI = setLikeAPI;
    this._removeLikeAPI = removeLikeAPI;
    this._userInfoData = userInfoData;
  }

  //Получаем template
  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardTemplate;
  }
  //Генерируем новую карточку, возвращаем её
  generateCard() {
    this._element = this._getTemplate();
    this._deleteButton = this._element.querySelector(".element__delete-button");
    this._setEventListeners();

    const elementImg = this._element.querySelector(".element__img");
    elementImg.src = this._imgValue;
    this._element.querySelector(".element__text").textContent = this._titleValue;
    elementImg.alt = `Фото ${this._titleValue}`;
    if(this._likesValue != undefined){
      this._element.querySelector(".element__count").textContent = this._likesValue.length;
    }else{
      this._element.querySelector(".element__count").textContent = 0;
    }
    if(this._userInfoData.personID != this._cardData.owner._id){
      this._element.querySelector(".element__delete-button").classList.add("element__delete-button_hide")
    }
    const isLiked = this._cardData.likes.some(element => {
      return element._id === this._userInfoData.personID;
    });
    if(isLiked){
      this._element.querySelector(".element__like-button").classList.add("element__like-button_active");
    }
    return this._element;
  }


  _setEventListeners() {
    //Срабатывает при клике на кнопку лайка
    this._element.querySelector(".element__like-button").addEventListener("click", (evt) => {
      this._toogleLike(evt);
    });
    //Срабатывает при клике на кнопку удаления
    this._deleteButton.addEventListener("click", () => {
      this._deleteClick(this._cardData, this._element);
    });
    //Срабатывает при клике на картинку
    this._element.querySelector(".element__img").addEventListener("click", () => {
      this._handleCardClick();
    });
  }
  //Срабатывает при клике на кнопку лайка, переключает его состояние
  _toogleLike(evt) {
    if (evt.target.classList.contains("element__like-button_active")){
      this._removeLikeAPI((newdata) => {
        evt.target.classList.remove("element__like-button_active");
        this._element.querySelector(".element__count").textContent = newdata.likes.length;
      });
    } else{
      this._setLikeAPI((newdata) => {
        const isLiked = newdata.likes.some(element => {
          return element._id === this._userInfoData.personID;
        });
        if(isLiked){
          this._element.querySelector(".element__count").textContent = newdata.likes.length;
          evt.target.classList.add("element__like-button_active");
        }
      })
    }
    };
}
