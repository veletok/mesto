export const popupEdit = document.querySelector(".popup-edit");
export const popupAddItem = document.querySelector(".popup-add");
export const popupImg = document.querySelector(".popup-image");
export const formElementEdit = document.querySelector(".popup__form_edit");
export const formElementAdd = document.querySelector(".popup__form_add");
export const popupAddButtonSubmit = document.querySelector(".popup__button-submit_addcard");

export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const buttonPopupEditClose = document.querySelector(".popup__edit-close");
export const buttonPopupAddClose = document.querySelector(".popup__add-close");
export const buttonPopupImageClose = document.querySelector(".popup__image-close");

export const profileName = document.querySelector(".popup__input_type_name");
export const profileProfession = document.querySelector(".popup__input_type_title");

export const cardListSection = '.elements';

export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");

export const validationParams = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_disable",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

export const initialCards = [{
  name: "Архыз",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
},
{
  name: "Челябинская область",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
},
{
  name: "Иваново",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
},
{
  name: "Камчатка",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
},
{
  name: "Холмогорский район",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
},
{
  name: "Байкал",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
},
];
