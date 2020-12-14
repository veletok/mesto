const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupEdit = document.querySelector('.popup-edit');
const popupAddItem = document.querySelector('.popup-add');
const popupImg = document.querySelector('.popup-image');

const formElementEdit = document.querySelector('.popup__form_edit');
const formElementAdd = document.querySelector('.popup__form_add');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const buttonPopupEditClose = document.querySelector('.popup__edit-close');
const buttonPopupAddClose = document.querySelector('.popup__add-close');
const buttonPopupImageClose = document.querySelector('.popup__image-close');
const likeButton = document.querySelector('.element__like-button');

const profileName = document.querySelector('.popup__input_type_name');
const profileProfession = document.querySelector('.popup__input_type_title');

const elementAddTitle = document.querySelector('.popup__input_type_addtitle');
const elementAddSrc = document.querySelector('.popup__input_type_img-src');

const elementTemplate = document.querySelector('#element-template').content;

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


function addElement (titleValue, imgValue) {
  let item = createElement (titleValue, imgValue);
  return item;
}

function prependElementList (item) {
  cardsElements.prepend(item);
}
function openPopup (element) {
    element.classList.add('popup_opened');
}

function closePopup (element) {
    element.classList.remove('popup_opened');
}

function editInfoPopupSettings () {
  profileName.value = profileTitle.textContent;
  profileProfession.value = profileSubtitle.textContent;
}

function editSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileName.value;
  profileSubtitle.textContent = profileProfession.value;
  closePopup (popupEdit);
}

function addSubmitHandler(evt) {
  evt.preventDefault();
  let item = addElement(elementAddTitle.value, elementAddSrc.value);
  prependElementList(item);
  closePopup (popupAddItem);
}

editButton.addEventListener('click', function () {
  openPopup (popupEdit);
});

addButton.addEventListener('click', function () {
  openPopup (popupAddItem);
});

buttonPopupEditClose.addEventListener('click', function () {
  closePopup (popupEdit);
});

buttonPopupAddClose.addEventListener('click', function () {
  closePopup (popupAddItem);
});

buttonPopupImageClose.addEventListener('click', function () {
  closePopup (popupImg);
});

formElementEdit.addEventListener('submit', editSubmitHandler);
formElementAdd.addEventListener('submit', addSubmitHandler);




const cardsElements = document.querySelector('.elements');

function createElement(titleValue, imgValue) {
  const itemElement = elementTemplate.cloneNode(true);
  const imgPopupButton = itemElement.querySelector('.element__img');
  const imgPopupTitle = itemElement.querySelector('.element__text');

  const popupZoomImage = popupImg.querySelector('.popup-image__img');
  const popupZoomTitle = popupImg.querySelector('.popup-image__title');

  imgPopupButton.src = imgValue;
  imgPopupTitle.textContent = titleValue;
  imgPopupButton.alt = `Фото ${titleValue}`;

  itemElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });

  itemElement.querySelector('.element__delete-button').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });

  imgPopupButton.addEventListener('click', function () {
    openPopup(popupImg);
    popupZoomImage.alt = 'Фото ' + titleValue;
    popupZoomImage.src = imgValue;
    popupZoomTitle.textContent = titleValue;
  });

  return itemElement;
}

function currentElements() {
  initialCards.forEach( function (element) {
    let item = addElement(element.name, element.link);
    prependElementList(item);
  });
}

currentElements();

