
import {closeOnEscapeForm, closeFormOverlayClick} from "./index.js"

const popupImageTitle = document.querySelector('.popup__title-image');
const popupImage = document.querySelector('.popup__element-image');
const popupImageOpen = popupImage.closest('.popup');

function openPopup (item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closeOnEscapeForm);
  document.addEventListener('click', closeFormOverlayClick)
}


export {openPopup, popupImageOpen, popupImage, popupImageTitle};