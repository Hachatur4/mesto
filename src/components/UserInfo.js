

export default class UserInfo {
  constructor(elementName, elementInformation, avatarImage) {
    this._elementName = elementName;
    this._elementInformation = elementInformation;
    this._avatarImage = avatarImage;
  }

  getUserInfo(){
    return {
      userName: this._elementName.textContent,
      userDescription: this._elementInformation.textContent,
    };
  }

  setUserInfo(formData){
    this._elementName.textContent  = formData.profileName;
    this._elementInformation.textContent = formData.profileJob;
  }

  setUserAvatar(data){
    console.log(data)
    this._avatarImage.src = data.avatarLink;
  }

  setApiAvatar(data){
    this._avatarImage.src = data.avatar;
  }

  getDataProfile(userData){
    this._elementName.textContent = userData.name;
    this._elementInformation.textContent = userData.about;
  }
}