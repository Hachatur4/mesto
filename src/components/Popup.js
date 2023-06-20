
export default class Popup {
  constructor(selector) {
    this._formElement = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this); 
  }

  setEventListeners(){
    this._formElement.addEventListener('click', (evt)=>{
      if (evt.target.classList.contains('popup')){
        this.close()
      }
    });

    this._formElement.querySelector('.popup__close-icon').addEventListener('click', ()=>{
      this.close()
    });
  }

  open(){
    this._formElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close(){
    document.removeEventListener('keydown', this._handleEscClose);
    this._formElement.classList.remove('popup_opened');
  }

  _handleEscClose(evt){
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}