import '../pages/index.css';
import {Card} from './Card.js';
import {validationAddPopup, validationEditPopup, profileTitle, profileSubtitle, initialCards, popupImg, popupEdit, popupAddItem, editButton, addButton, buttonPopupAddClose, buttonPopupEditClose, buttonPopupImageClose, profileName, profileProfession, cardListSection} from '../utils/constants.js';
import {PopupWithImage} from './PopupWithImage.js';
import {PopupWithForm} from './PopupWithForm.js';
import Section from './Section.js';
import UserInfo from './Userinfo.js';

const userInfo = new UserInfo(profileTitle, profileSubtitle);

const popupWithImage = new PopupWithImage(popupImg);

const addPopup = new PopupWithForm(
  popupAddItem, validationAddPopup, {
  handleFormSubmit: (data) => {
    createCard(data);
    addPopup.close();
  }
});

const editPopup = new PopupWithForm(
  popupEdit, validationEditPopup, {
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
    editPopup.close();
  }
});

popupWithImage.setEventListeners();
addPopup.setEventListeners();
editPopup.setEventListeners();

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


export function validateForms () {
  validationEditPopup.enableValidation();
  validationAddPopup.enableValidation();
};

validateForms ();
cardList.renderItems();
