import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({handleFormSubmit}, selector) {
    super(selector);
    this._form = this._formElement.querySelector('.form');
    this._buttonLoader = this._form.querySelector('.form__submit-button')
    this._input = this._formElement.querySelectorAll('.form__input');
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
    this._formElement.addEventListener('submit', (evt)=>{
      evt.preventDefault();
      this._buttonLoader.textContent = 'Сохранение...'
      
      const submitPromise = Promise.resolve(this._handleFormSubmit(this._getInputValues(), this._buttonLoader,))
      submitPromise.then(this.close())

    super.setEventListeners();
    })
  }

  close(){
    this._form.reset();
    super.close();
  }
};