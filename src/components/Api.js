export default class Api {
  constructor(options,) {
    this._options = options;
    this._authorization = options.headers.authorization;
    this._contentType = options.headers.ContentType;
  }

  getAppInfo(){
    return Promise.all([this.getInitialCards(), this.getUserInfo()])
  }

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
    })
    .then(res => this._resStatus(res)) 
  }

  createCard(data){
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(res => this._resStatus(res))
  }

  getUserInfo(){
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
    })
    .then(res => this._resStatus(res)) 
  }

  sendUserInfo(data){
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: data.profileName,
        about: data.profileJob
      })
    })
    .then(res => this._resStatus(res))
  }

  userAvatar(data){
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        avatar: data.avatarLink,
      })
    })
    .then(res => this._resStatus(res))
  }

  putLike(cardId){
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes `, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
    })
    .then(res => this._resStatus(res)) 
  }

  deleteLike(cardId){
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
    })
    .then(res => this._resStatus(res)) 
  }

  deleteCard(id){
    return fetch(`${this._options.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
    })
    .then(res => this._resStatus(res)) 
  }

  _resStatus(res){
    if(res.ok){
      return res.json()
    }else{
      return Promise.reject(`Ошибка ${res.status}`)
    }
  }

}