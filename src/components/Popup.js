
export default class Popup {
  constructor(selector) {
    this._selector = document.querySelector(selector);
  }

  setEventListeners(){
    this._selector.addEventListener('click', (evt)=>{
      if (evt.target.classList.contains('popup')){
        this.close()
      }
    });
    document.addEventListener('keydown', (evt)=>{
      this._handleEscClose(evt)
    });
    this._selector.querySelector('.popup__close-icon').addEventListener('click', ()=>{
      this.close()
    });
  }

  open(){
    this._selector.classList.add('popup_opened');
  }

  close(){
    this._selector.classList.remove('popup_opened');
  }

  _handleEscClose(evt){
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}