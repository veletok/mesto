import '../pages/index.css';
import {Card} from './card.js';
import {validationParams, profileTitle, profileSubtitle, initialCards, popupImg, popupEdit, popupAddItem, formElementAdd, formElementEdit, editButton, addButton, buttonPopupAddClose, buttonPopupEditClose, buttonPopupImageClose, profileName, profileProfession, cardListSection} from '../utils/constants.js';
import {PopupWithImage} from './PopupWithImage.js';
import {PopupWithForm} from './PopupWithForm.js';
import Section from './section.js';
import UserInfo from './userinfo.js';
import {Validator} from './validator.js'

const userInfo = new UserInfo(profileTitle, profileSubtitle);

const popupWithImage = new PopupWithImage(popupImg);

const addPopup = new PopupWithForm(
  popupAddItem,{
  handleFormSubmit: (data) => {
    createCard(data);
    addPopup.close();
  }
});

const editPopup = new PopupWithForm(
  popupEdit,{
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
    editPopup.close();
  }
});

editButton.addEventListener("click", function () {
  const data = userInfo.getUserInfo();
  profileName.value = data.profilename;
  profileProfession.value = data.profileprofession;
  userInfo.setUserInfo(data);
  editPopup.open();
});


buttonPopupEditClose.addEventListener("click", function () {
  editPopup.close();
});

addButton.addEventListener("click", function () {
  addPopup.open();
});


buttonPopupAddClose.addEventListener("click", function () {
  addPopup.close();
});

buttonPopupImageClose.addEventListener("click", function () {
  popupWithImage.close();
});

//Функция создания карты
function createCard (data) {
  const card = new Card(data, '#element-template',{
    handleCardClick: () => {
      popupWithImage.open(data);
  }});
  const cardElement = card.generateCard();
  cardList.setItem(cardElement);
}

const cardList = new Section({
  data: initialCards,
  renderer: (data) => {
    const card = new Card(data, '#element-template',{
      handleCardClick: () => {
        popupWithImage.open(data);
    }});
    const cardElement = card.generateCard();
    cardList.setItem(cardElement);
    },
  },
  cardListSection
);

export let validationElement = {};

export function validateForms () {
  validationElement[formElementEdit.name] = new Validator(validationParams, formElementEdit);
  validationElement[formElementEdit.name].enableValidation();

  validationElement[formElementAdd.name] = new Validator(validationParams, formElementAdd);
  validationElement[formElementAdd.name].enableValidation();
};

validateForms ();
cardList.renderItems();
