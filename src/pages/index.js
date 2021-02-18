import '../pages/index.css';
import {Card} from '../components/Card.js';
import {formElementEdit, formElementAdd, formElementAvatar, formElementDelete, validationParams, popupDeleteButtonSubmit, popupAddButtonSubmit, popupEditButtonSubmit, popupAvatarButtonSubmit, avatarButton, popupAvatar, popupDelete, profileImage, profileTitle, profileSubtitle, popupImg, popupEdit, popupAddItem, editButton, addButton, name, about, cardListSection} from '../utils/constants.js';
import {PicturePopup} from '../components/PicturePopup.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {DeletePopup} from '../components/DeletePopup.js';
import Section from '../components/Section.js';
import UserInfo from '../components/Userinfo.js';
import Api from '../components/Api.js';
import {FormValidator} from '../components/FormValidator.js'

export const validationEditPopup = new FormValidator(validationParams, formElementEdit);
export const validationAddPopup = new FormValidator(validationParams, formElementAdd);
export const validationAvatarPopup = new FormValidator(validationParams, formElementAvatar);
export const validationDeletePopup = new FormValidator(validationParams, formElementDelete);

const userInfo = new UserInfo(profileTitle, profileSubtitle, profileImage);

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
  })
  .catch((error)=>{
    console.log(error);
  })
const popupWithImage = new PicturePopup(popupImg);

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
    .catch((error)=>{
      console.log(error);
    })
  }
}, validationParams);

const avatarPopup = new PopupWithForm(
  popupAvatar, validationAvatarPopup, {
  handleFormSubmit: (data) => {
    popupAvatarButtonSubmit.textContent = "Сохранение.."
    api.setAvatar(data.avatar)
    .then((data) => {
      userInfo.setUserInfo(data);
      avatarPopup.close();
      popupAvatarButtonSubmit.textContent = "Сохранить"
    })
    .catch((error)=>{
      console.log(error);
    })
  }
}, validationParams);

const editPopup = new PopupWithForm(
  popupEdit, validationEditPopup, {
  handleFormSubmit: (data) => {
    popupEditButtonSubmit.textContent = "Сохранение.."
    api.setPersonInfo(data.name, data.about)
    .then((result) => {
      popupEditButtonSubmit.textContent = "Сохранить"
      userInfo.setUserInfo(result);
      editPopup.close();
    })
    .catch((error)=>{
      console.log(error);
    })
  }
}, validationParams);

export const deletePopup = new DeletePopup(
  popupDelete, validationDeletePopup, {
    handleFormSubmit:(data, cardElement) => {
      popupDeleteButtonSubmit.textContent = "Удаление.."
      api.deleteCard(data._id)
      .finally(() => {
        popupDeleteButtonSubmit.textContent = "Да"
        cardElement.remove();
        cardElement = null;
        deletePopup.close();
      })
      .catch((error)=>{
        console.log(error);
      })
    }
  }, validationParams);

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

addButton.addEventListener("click", function () {
  addPopup.open();
});

avatarButton.addEventListener("click", function () {
  avatarPopup.open();
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
  }},
  {setLikeAPI: (callback) => {
    api.setLike(data._id)
    .then((result) => {
      callback (result);
    })
    .catch((error)=>{
      console.log(error);
    })
  }},
  {removeLikeAPI: (callback) => {
    api.removeLike(data._id)
    .then((result) => {
      callback (result);
    })
    .catch((error)=>{
      console.log(error);
    })
  }},
  userInfoData);
  const cardElement = card.generateCard();
  cardList.setItem(cardElement);
}

const cardList = new Section({
  data: api.getCardsList().then((data)=> {
    return data.reverse();
  })
  .catch((error)=>{
    console.log(error);
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
