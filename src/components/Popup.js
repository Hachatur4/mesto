
export default class Popup {
  constructor(selector) {
    this._selector = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this); 
  }

  setEventListeners(){
    this._selector.addEventListener('click', (evt)=>{
      if (evt.target.classList.contains('popup')){
        this.close()
      }
    });

    this._selector.querySelector('.popup__close-icon').addEventListener('click', ()=>{
      this.close()
    });
  }

  open(){
    this._selector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close(){
    document.removeEventListener('keydown', this._handleEscClose);
    this._selector.classList.remove('popup_opened');
  }

  _handleEscClose(evt){
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}