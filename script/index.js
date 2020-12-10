let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

let popupType = '';
let popupEdit = document.querySelector('.popup-edit');
let popupImg = document.querySelector('.popup-image');
let popupTitle = document.querySelector('.popup__title');

let formElement = document.querySelector('.popup__form');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelectorAll('.popup__button-close');
const likeButton = document.querySelector('.element__like-button');

let profileName = document.querySelector('.popup__input_type_name');
let profileProfession = document.querySelector('.popup__input_type_title');

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function tooglePopup (type) {
  popupType = type;

  if (!type) {
    popupEdit.classList.remove('popup_opened');
    popupImg.classList.remove('popup_opened');
    return;
  }

  if (type === 'editInfo') {
    popupEdit.classList.add('popup_opened');
    profileName.value = profileTitle.textContent;
    profileProfession.value = profileSubtitle.textContent;
  }
  else if (type === 'addItem') {
    popupEdit.classList.add('popup_opened');
    popupTitle.textContent = 'Новое место'
    profileName.value = '';
    profileProfession.value = '';
    profileName.placeholder = 'Название';
    profileProfession.placeholder = 'Ссылка на картинку';
  }
}

function formSubmitHandler(evt) {
  if (profileName.value != '' && profileProfession.value != ''){
    if (popupType === 'editInfo') {
      evt.preventDefault();
      profileTitle.textContent = profileName.value;
      profileSubtitle.textContent = profileProfession.value;
      tooglePopup(false);
    }
    else if(popupType === 'addItem') {
      evt.preventDefault();
      addElement(profileName.value, profileProfession.value);
      tooglePopup(false);
    }
  }
  else {
    tooglePopup(false);
  }
}

editButton.addEventListener('click', function () {
  tooglePopup('editInfo');
});

addButton.addEventListener('click', function () {
  tooglePopup('addItem');
});

closeButton.forEach(function (close) {
  close.addEventListener('click', function () {
  tooglePopup(false);
})});

formElement.addEventListener('submit', formSubmitHandler);




const cardsElements = document.querySelector('.elements');

function addElement(titleValue, imgValue) {
  const elementTemplate = document.querySelector('#element-template').content;
  const itemElement = elementTemplate.cloneNode(true);
  const imgPopupButton = itemElement.querySelector('.element__img');

  itemElement.querySelector('.element__img').src = imgValue;
  itemElement.querySelector('.element__text').textContent = titleValue;
  itemElement.querySelector('.element__img').alt = 'Фото ' + titleValue;

  itemElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });

  itemElement.querySelector('.element__delete-button').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });

  imgPopupButton.addEventListener('click', function () {
    popupImg.classList.add('popup_opened');
    popupImg.querySelector('.popup-image__img').alt = 'Фото ' + titleValue;
    popupImg.querySelector('.popup-image__img').src = imgValue;
    popupImg.querySelector('.popup-image__title').textContent = titleValue;
  });

  cardsElements.prepend(itemElement);
}

function currentElements() {
  initialCards.forEach( function (element) {
    addElement(element.name, element.link);
  });
}

currentElements();

