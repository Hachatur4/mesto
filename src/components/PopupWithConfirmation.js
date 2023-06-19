import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(selector) {
    super(selector);
  }

  setEventListeners(){
    this._selector.addEventListener('submit', (evt)=>{
      evt.preventDefault();
      this._handleSubmit()
      this.close()
    });
    super.setEventListeners();
  }

  setSubmitAction(callBack){
    this._handleSubmit = callBack;
  }
};