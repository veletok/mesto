export default class UserInfo {
  constructor(profileTitle, profileSubtitle) {
    this._title = profileTitle; // text
    this._subtitle = profileSubtitle; // text
  }

  getUserInfo() {
    return {
      profilename: this._title.textContent,
      profileprofession: this._subtitle.textContent
    };
  }

  setUserInfo(data) {
    this._title.textContent = data.profilename;
    this._subtitle.textContent = data.profileprofession;
  }
}
