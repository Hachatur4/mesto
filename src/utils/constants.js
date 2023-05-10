
export const popupImageTitle = document.querySelector('.popup__title-image');
export const popupImage = document.querySelector('.popup__element-image');

export const popupProfileButton = document.querySelector('.profile__edit-button');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
export const formCard = document.forms['form-card'];
export const popupCardSubmit = formCard.closest('.popup');
export const popupCardButton = document.querySelector('.profile__add-button');

export const inputNameFormAddNewCard = document.querySelector('#name-input');
export const inputLinkFormAddNewCard = document.querySelector('#link-input');
export const profileinputName = document.querySelector('#username-input');
export const profileInputDescription = document.querySelector('#job-input');
export const profileFormSubmit = document.querySelector('.popup-profile');

export const validationSelector = {
  formSet: '.form__set',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
}
