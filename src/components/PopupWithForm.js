import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({handleFormSubmit}, selector) {
    super(selector);
    this._input = this._selector.querySelectorAll('.form__input');
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues(){
    this._formValues = {};
    this._input.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners(){
    this._selector.addEventListener('submit', (evt)=>{
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }

  close(){
    this._input.forEach(item => {
      item.value = '';
    });
    super.close();
  }
};

