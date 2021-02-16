
import {Validator} from '../script/Validator.js'

export const popupEdit = document.querySelector(".popup-edit");
export const popupAddItem = document.querySelector(".popup-add");
export const popupImg = document.querySelector(".popup-image");
export const popupDelete = document.querySelector(".popup-delete");
export const popupAvatar = document.querySelector(".popup-avatar");
export const formElementEdit = document.querySelector(".popup__form_edit");
export const formElementAdd = document.querySelector(".popup__form_add");
export const formElementAvatar = document.querySelector(".popup__form_avatar");
export const popupAddButtonSubmit = document.querySelector(".popup__button-submit_addcard");
export const popupDeleteButtonSubmit = document.querySelector(".popup__button-submit_delete");
export const popupAvatarButtonSubmit = document.querySelector(".popup__button-submit_avatar");
export const popupEditButtonSubmit = document.querySelector(".popup__button-submit_edit");
export const formElementDelete = document.querySelector(".popup__form_delete");

export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const avatarButton = document.querySelector(".profile__avatar-button");

export const buttonPopupEditClose = document.querySelector(".popup__edit-close");
export const buttonPopupAddClose = document.querySelector(".popup__add-close");
export const buttonPopupDeleteClose = document.querySelector(".popup__delete-close");
export const buttonPopupImageClose = document.querySelector(".popup__image-close");
export const buttonPopupAvatarClose = document.querySelector(".popup__avatar-close");

export const name = document.querySelector(".popup__input_type_name");
export const about = document.querySelector(".popup__input_type_title");

export const cardListSection = '.elements';

export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");

export const profileImage = document.querySelector(".profile__img");
export const escCode = 27;

export const validationParams = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_disable",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

export const validationEditPopup = new Validator(validationParams, formElementEdit);
export const validationAddPopup = new Validator(validationParams, formElementAdd);
export const validationAvatarPopup = new Validator(validationParams, formElementAvatar);
export const validationDeletePopup = new Validator(validationParams, formElementDelete);

