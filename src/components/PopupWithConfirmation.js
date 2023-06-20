import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(selector) {
    super(selector);
  }

  setEventListeners(){
    this._formElement.addEventListener('submit', (evt)=>{
      evt.preventDefault();
      const submitPromise = Promise.resolve(this._handleSubmit())
      submitPromise.then(this.close())
      
    });
    super.setEventListeners();
  }

  setSubmitAction(callBack){
    this._handleSubmit = callBack;
  }
};