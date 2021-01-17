import {validationParams} from './validation-params.js';
import {Validator} from './validator.js'

export const popupEdit = document.querySelector(".popup-edit");
export const popupAddItem = document.querySelector(".popup-add");
export const popupImg = document.querySelector(".popup-image");
export const formElementEdit = document.querySelector(".popup__form_edit");
export const formElementAdd = document.querySelector(".popup__form_add");

const popupAddButtonSubmit = document.querySelector(".popup__button-submit_addcard");

export function openPopup(element) {
  element.classList.add("popup_opened");
  const popupOpened = document.querySelector(".popup_opened");
  popupClickClose(popupOpened);
  popupAddButtonSubmit.classList.add(validationParams.inactiveButtonClass);
  popupAddButtonSubmit.disabled = true;
}

let validationElement = {};

function popupClickClose(currentPopup) {
  currentPopup.addEventListener("mousedown", function (evt) {
    closePopupSelector(evt);
  });

  document.addEventListener("keydown", escClose);
}

function closePopupSelector(evt) {
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

export function closePopup(element) {

  element.classList.remove("popup_opened")
  const form = element.querySelector(validationParams.formSelector);

  const inputList = element.querySelectorAll(validationParams.inputSelector);
  inputList.forEach((inputElement) => {
    validationElement[form.name].hideInputError(inputElement);
  });
}

function escClose(evt) {
  if (evt.keyCode === 27) {
    closePopupSelector(evt);
  }
}

export function validateForms () {
  //Валидируем форму редактирования
  validationElement[formElementEdit.name] = new Validator(validationParams, formElementEdit);
  validationElement[formElementEdit.name].enableValidation();
  // Валидируем форму добавления
  validationElement[formElementAdd.name] = new Validator(validationParams, formElementAdd);
  validationElement[formElementAdd.name].enableValidation();
}
