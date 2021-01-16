import {Card} from './card.js';
import {initialCards} from './initial-сards.js';;
import {openPopup, closePopup, popupEdit, popupAddItem, popupImg, validateForms} from './popups.js'

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const formElementEdit = document.querySelector(".popup__form_edit");
const formElementAdd = document.querySelector(".popup__form_add");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const buttonPopupEditClose = document.querySelector(".popup__edit-close");
const buttonPopupAddClose = document.querySelector(".popup__add-close");
const buttonPopupImageClose = document.querySelector(".popup__image-close");

const profileName = document.querySelector(".popup__input_type_name");
const profileProfession = document.querySelector(".popup__input_type_title");

const elementAddTitle = document.querySelector(".popup__input_type_addtitle");
const elementAddSrc = document.querySelector(".popup__input_type_img-src");

function prependElementList(item) {
  cardsElements.prepend(item);
}


function editInfoPopupSettings() {
  profileName.value = profileTitle.textContent;
  profileProfession.value = profileSubtitle.textContent;
}

function addPopupSettings() {
  formElementAdd.reset();
}
function editSubmitHandler() {
  profileTitle.textContent = profileName.value;
  profileSubtitle.textContent = profileProfession.value;
  closePopup(popupEdit);
}

function addSubmitHandler() {
  const data = {
      name: elementAddTitle.value,
      link: elementAddSrc.value
    }
  cardCreate(data);
  closePopup(popupAddItem);
}

editButton.addEventListener("click", function () {
  editInfoPopupSettings();
  openPopup(popupEdit);
});

addButton.addEventListener("click", function () {
  addPopupSettings();
  openPopup(popupAddItem);
});

buttonPopupEditClose.addEventListener("click", function () {
  closePopup(popupEdit);
});

buttonPopupAddClose.addEventListener("click", function () {
  closePopup(popupAddItem);
});

buttonPopupImageClose.addEventListener("click", function () {
  closePopup(popupImg);
});


formElementEdit.addEventListener("submit", editSubmitHandler);
formElementAdd.addEventListener("submit", addSubmitHandler);

const cardsElements = document.querySelector(".elements");

//Проходим элементы из объекта, создаем карточки
function addPageElements() {
  initialCards.forEach((data) => {
    cardCreate(data);
  });
}

//Функция создания карты
function cardCreate (data) {
  const card = new Card(data, '#element-template');
  const cardElement = card.generateCard();
  prependElementList(cardElement);
}

//Вывзываем функцию, которая выводит карточки из объекта
addPageElements();
validateForms();
