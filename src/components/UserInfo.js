

export default class UserInfo {
  constructor(elementName, elementInformation) {
    this._elementName = elementName;
    this._elementInformation = elementInformation;
    this._profileInput = document.querySelectorAll('.profile-content');
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
}