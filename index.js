let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

let popup = document.querySelector('.popup');

let formElement = document.querySelector('.popup__form');

let profileName = document.querySelector('.popup__input_type_name');
let profileProfession = document.querySelector('.popup__input_type_title');

function popupOpened () {
  popup.classList.add('popup_opened');
}

function popupClosed () {
  popup.classList.remove('popup_opened');

  profileName.value = profileTitle.textContent;
  profileProfession.value = profileSubtitle.textContent;
}


formElement.onsubmit = function(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileName.value;
  profileSubtitle.textContent = profileProfession.value;
  popup.classList.remove('popup_opened');
}
