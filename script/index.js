let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

let popup = document.querySelector('.popup');

let formElement = document.querySelector('.popup__form');

let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__button-close');

let profileName = document.querySelector('.popup__input_type_name');
let profileProfession = document.querySelector('.popup__input_type_title');

function popupStatus (status) {
  if (status === true) {
    popup.classList.add('popup_opened');
    profileName.value = profileTitle.textContent;
    profileProfession.value = profileSubtitle.textContent;
  }
  else {
    popup.classList.remove('popup_opened');
  }
}

editButton.addEventListener('click', function () {
  popupStatus(true);
});

closeButton.addEventListener('click', function () {
  popupStatus(false);
});

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileName.value;
  profileSubtitle.textContent = profileProfession.value;
  popupStatus(false);
}

formElement.addEventListener('submit', formSubmitHandler);
