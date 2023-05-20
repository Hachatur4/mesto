import './index.css';
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js"
import initialCards from "../utils/arrayCards.js"
import PopupWithImage from "../components/PicturePopup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  popupProfileButton,
  profileName,
  profileJob,
  popupCardButton,
  profileinputName,
  profileInputDescription,
  validationSelector
} from "../utils/constants.js";


const formProfileValidation = new FormValidator(validationSelector, '.form-profile');
formProfileValidation.enableValidation();
const formCardValidation = new FormValidator(validationSelector, '.form-card');
formCardValidation.enableValidation();
const userInfoProfile = new UserInfo(profileName, profileJob);
const popupImageOpen = new PopupWithImage('.popup-image');


const createNewCard = (item) => {
  const card = new Card({
    item,
    handleCardClick: (name, link)=>{
      popupImageOpen.open(name, link);
    },
    templateElement: '.templateCard'
  });
  return card.generateCard();
} 

const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createNewCard(item));
  }
}, '.element');


const newCardPopup = new PopupWithForm({
  handleFormSubmit: (data) => {
    cardList.addItem(createNewCard(data));
    formCardValidation.cardButtonValidation();
  }
}, '.popup-card'); 

const userInfoPopup = new PopupWithForm({
  handleFormSubmit: (data) => {
    userInfoProfile.setUserInfo(data)
  }
}, '.popup-profile'); 

newCardPopup.setEventListeners();
userInfoPopup.setEventListeners();
popupImageOpen.setEventListeners();


function passTheValueUserProfile (data) {
  profileinputName.value = data.userName;
  profileInputDescription.value = data.userDescription;
}

function handlingEventsWhenOpeningProfileForm () {
  formProfileValidation.clearInputError();
  userInfoPopup.open();
  passTheValueUserProfile(userInfoProfile.getUserInfo());
}

function handlingEventsWhenOpeningCardForm () {
  formCardValidation.clearInputError();
  newCardPopup.open();
}

cardList.renderItems(initialCards);


popupProfileButton.addEventListener('click', ()=>{
  handlingEventsWhenOpeningProfileForm();
});

popupCardButton.addEventListener('click', ()=> {
  handlingEventsWhenOpeningCardForm(); 
});