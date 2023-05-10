import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({submitForm}, selector) {
    super(selector);
    this._input = this._selector.querySelectorAll('.form__input');
    this._submitForm = submitForm;
  }

  open(){
    super.open();
    this.setEventListeners();
    this._submitForm();
  }

  _getInputValues(){
    this._formValues = {};
    this._input.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners(){
    super.setEventListeners();
    this._selector.addEventListener('submit', ()=>{
      this.close();
    });
  }

  close(){
    super.close();
    this._input.forEach(item => {
      item.value = '';
    });
  }
};

