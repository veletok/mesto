export default class UserInfo {
  constructor(profileTitle, profileSubtitle, profileImage) {
    this._title = profileTitle; // text
    this._subtitle = profileSubtitle; // text
    this._profileImage = profileImage;
    this._personID = null;
  }

  getUserInfo() {
    return {
      name: this._title.textContent,
      about: this._subtitle.textContent,
      personID: this._personID,
      avatar : this._profileImage
    };
  }

  setUserInfo(data) {
    this._title.textContent = data.name;
    this._subtitle.textContent = data.about;
    this._personID = data._id;
    this._profileImage.src = data.avatar;
  }
}
