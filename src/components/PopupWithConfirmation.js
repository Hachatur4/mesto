import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(selector) {
    super(selector);
  }

  setEventListeners(){
    this._formElement.addEventListener('submit', (evt)=>{
      evt.preventDefault();
      this._handleSubmit()
    });
    super.setEventListeners();
  }

  setSubmitAction(callBack){
    this._handleSubmit = callBack;
  }
};