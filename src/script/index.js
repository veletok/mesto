import '../pages/index.css';
import {Card} from './Card.js';
import {popupDeleteButtonSubmit, validationDeletePopup, popupAddButtonSubmit, popupEditButtonSubmit, popupAvatarButtonSubmit, buttonPopupAvatarClose, avatarButton, validationAvatarPopup, popupAvatar, buttonPopupDeleteClose, popupDelete, profileImage, validationAddPopup, validationEditPopup, profileTitle, profileSubtitle, popupImg, popupEdit, popupAddItem, editButton, addButton, buttonPopupAddClose, buttonPopupEditClose, buttonPopupImageClose, name, about, cardListSection} from '../utils/constants.js';
import {PopupWithImage} from './PopupWithImage.js';
import {PopupWithForm} from './PopupWithForm.js';
import Section from './Section.js';
import UserInfo from './Userinfo.js';
import Api from './Api.js';

const userInfo = new UserInfo(profileTitle, profileSubtitle);

export const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-20/",
  headers: {
    "content-type": 'application/json',
    authorization: '10333c32-2980-48cb-a84e-2ba96b8cc836'
  }
})

api.
  getPersonInfo()
  .then((data)=> {
    userInfo.setUserInfo(data);
    profileImage.src = data.avatar;
})
const popupWithImage = new PopupWithImage(popupImg);

const addPopup = new PopupWithForm(
  popupAddItem, validationAddPopup, {
  handleFormSubmit: (data) => {
    popupAddButtonSubmit.textContent = "Сохранение.."
    api.sendCard(data)
    .then((res)=> {
      createCard(res);
      addPopup.close();
      popupAddButtonSubmit.textContent = "Сохранить"
    })
  }
});

const avatarPopup = new PopupWithForm(
  popupAvatar, validationAvatarPopup, {
  handleFormSubmit: (data) => {
    popupAvatarButtonSubmit.textContent = "Сохранение.."
    api.setAvatar(data.avatar)
    .then(() => {
      profileImage.src = data.avatar;
      avatarPopup.close();
      popupAvatarButtonSubmit.textContent = "Сохранить"
    })
  }
});

const editPopup = new PopupWithForm(
  popupEdit, validationEditPopup, {
  handleFormSubmit: (data) => {
    popupEditButtonSubmit.textContent = "Сохранение.."
    api.setPersonInfo(data.name, data.about)
    .finally(() => {
      popupEditButtonSubmit.textContent = "Сохранить"
      userInfo.setUserInfo(data);
      editPopup.close();
    })
  }
});

export const deletePopup = new PopupWithForm(
  popupDelete, validationDeletePopup, {
    handleFormSubmit:(data, cardelement) => {
      popupDeleteButtonSubmit.textContent = "Удаление.."
      api.deleteCard(data._id)
      .finally(() => {
        popupDeleteButtonSubmit.textContent = "Да"
        cardelement.remove();
        cardelement = null;
        deletePopup.close();
      })
    }
  });

popupWithImage.setEventListeners();
addPopup.setEventListeners();
editPopup.setEventListeners();
deletePopup.setEventListeners();
avatarPopup.setEventListeners();

editButton.addEventListener("click", function () {
  const data = userInfo.getUserInfo();
  name.value = data.name;
  about.value = data.about;
  editPopup.open();
});


buttonPopupEditClose.addEventListener("click", function () {
  editPopup.close();
});

addButton.addEventListener("click", function () {
  addPopup.open();
});

avatarButton.addEventListener("click", function () {
  avatarPopup.open();
});

buttonPopupAvatarClose.addEventListener("click", function () {
  avatarPopup.close();
});

buttonPopupAddClose.addEventListener("click", function () {
  addPopup.close();
});

buttonPopupDeleteClose.addEventListener("click", function () {
  deletePopup.close();
});

buttonPopupImageClose.addEventListener("click", function () {
  popupWithImage.close();
});
//Функция создания карты
function createCard (data) {
  const userInfoData = userInfo.getUserInfo();
  const card = new Card(data, '#element-template',{
    handleCardClick: () => {
      popupWithImage.open(data);
  }},
  {deleteClick: (data, element) => {
    deletePopup.deletePopupData(data, element);
    deletePopup.open();
    deletePopup.setEventListeners();
  }},
  {setLikeAPI: (callback) => {
    api.setLike(data._id)
    .then((result) => {
      callback (result);
    })
  }},
  {removeLikeAPI: (callback) => {
    api.removeLike(data._id)
    .then((result) => {
      callback (result);
    })
  }},
  userInfoData);
  const cardElement = card.generateCard();
  cardList.setItem(cardElement);
}

const cardList = new Section({
  data: api.getCardsList().then((data)=> {
    return data.reverse();
  }),
  renderer: (data) => {
    createCard(data);
    },
  },
  cardListSection
);


export function validateForms () {
  validationEditPopup.enableValidation();
  validationAddPopup.enableValidation();
  validationAvatarPopup.enableValidation();
};

validateForms ();
cardList.renderItems();
