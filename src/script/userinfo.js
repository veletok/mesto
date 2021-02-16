export default class UserInfo {
  constructor(profileTitle, profileSubtitle) {
    this._title = profileTitle; // text
    this._subtitle = profileSubtitle; // text
    this._personID = null;
  }

  getUserInfo() {
    return {
      name: this._title.textContent,
      about: this._subtitle.textContent,
      personID: this._personID
    };
  }

  setUserInfo(data) {
    this._title.textContent = data.name;
    this._subtitle.textContent = data.about;
    this._personID = data._id;
  }
}
