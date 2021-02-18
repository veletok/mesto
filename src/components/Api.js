export default class Api{
  constructor(config){
    this._url = config.url;
    this.headers = config.headers;
  }

  getPersonInfo(){
    return fetch(this._url + `users/me` , {
      method: "GET",
      headers: this.headers
    })
    .then(res => this._checkRequestResult(res))
    .catch(error => this._errorHandler(error));
  }

  setPersonInfo(personName, personAbout){
    return fetch(this._url + `users/me` , {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: personName,
        about: personAbout
      })
    })
    .then(res => this._checkRequestResult(res))
    .catch(error => this._errorHandler(error));
  }

  getCardsList(){
    return fetch(this._url + `cards` , {
      method: "GET",
      headers: this.headers
    })
    .then(res => this._checkRequestResult(res))
    .catch(error => this._errorHandler(error));
  }


  sendCard(data){
    return fetch(this._url + `cards` , {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(res => this._checkRequestResult(res))
    .catch(error => this._errorHandler(error));
  }

  deleteCard(cardID){
    return fetch(this._url + `cards/` + cardID, {
      method: "DELETE",
      headers: this.headers
    })
    .then(res => this._checkRequestResult(res))
    .catch(error => this._errorHandler(error));
  }

  setLike(cardID){
    return fetch(this._url + `cards/likes/` + cardID, {
      method: "PUT",
      headers: this.headers
    })
    .then(res => this._checkRequestResult(res))
    .catch(error => this._errorHandler(error));
  }


  removeLike(cardID){
    return fetch(this._url + `cards/likes/` + cardID, {
      method: "DELETE",
      headers: this.headers
    })
    .then(res => this._checkRequestResult(res))
    .catch(error => this._errorHandler(error));
  }

  setAvatar(url){
    return fetch(this._url + `users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: url,
      })
    })
    .then(res => this._checkRequestResult(res))
    .catch(error => this._errorHandler(error));
  }

  _checkRequestResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Возникла ошибка: ${res.status}`);
  }

  _errorHandler(error) {
    console.log(error);
  }

}
