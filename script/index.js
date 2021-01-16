import {Card} from './card.js';
import {initialCards} from './initial-сards.js';
import {validationParams} from './validation-params.js';
import {Validator} from './validator.js';

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const popupEdit = document.querySelector(".popup-edit");
const popupAddItem = document.querySelector(".popup-add");

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

export const popupImg = document.querySelector(".popup-image");

function prependElementList(item) {
  cardsElements.prepend(item);
}

//Открывает попап
export function openPopup(element) {
  openPopupParams(element);
  if (element != popupImg) {
  const form = element.querySelector('.popup__form')
  const validationElement = new Validator(validationParams, form);
  validationElement.enableValidation();
  }
}

function openPopupParams(element) {
  element.classList.add("popup_opened");
  const popupOpened = document.querySelector(".popup_opened");
  popupClickClose(popupOpened);
}
//Закрывает попап
function closePopup(element) {
  element.classList.remove("popup_opened")
  const form = element.querySelector('.popup__form');
  const validationElement = new Validator(validationParams, form);
  const inputList = element.querySelectorAll(validationParams.inputSelector);
  inputList.forEach((inputElement) => {
    validationElement.hideInputError(inputElement);
  });
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
  const card = new Card(data, '#element-template');
  const cardElement = card.generateCard();
  prependElementList(cardElement);
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

function escClose(evt) {
  if (evt.keyCode === 27) {
    popupSelectorClose(evt);
  }
}

function popupClickClose(currentPopup) {
  currentPopup.addEventListener("mousedown", function (evt) {
    popupSelectorClose(evt);
  });

  document.addEventListener("keydown", escClose);
}

formElementEdit.addEventListener("submit", editSubmitHandler);
formElementAdd.addEventListener("submit", addSubmitHandler);

function popupSelectorClose(evt) {
  document.removeEventListener("keydown", escClose);
  const targetClassList = evt.target.classList;
  if (
    targetClassList.contains("popup-add") ||
    targetClassList.contains("profile__add-button")
  ) {
    closePopup(popupAddItem);
  } else if (
    targetClassList.contains("popup-edit") ||
    targetClassList.contains("profile__edit-button")
  ) {
    closePopup(popupEdit);
  } else if (
    targetClassList.contains("popup-image") ||
    targetClassList.contains("main")
  ) {
    closePopup(popupImg);
  }
}

const cardsElements = document.querySelector(".elements");

//Проходим элементы из объекта, создаем карточки
function currentElements() {
  initialCards.forEach((data) => {
    const card = new Card(data, '#element-template');
    const cardElement = card.generateCard();
    prependElementList(cardElement);
  });
}

//Вывзываем функцию, которая выводит карточки из объекта
currentElements();
