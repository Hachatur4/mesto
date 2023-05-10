import './index.css';
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js"
import initialCards from "../components/arrayCards.js"
import PopupWithImage from "../components/PicturePopup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  popupProfileButton,
  profileName,
  profileJob,
  popupCardSubmit,
  popupCardButton,
  inputNameFormAddNewCard,
  inputLinkFormAddNewCard,
  profileinputName,
  profileInputDescription,
  profileFormSubmit,
  validationSelector
} from "../utils/constants.js";




const formProfileValidation = new FormValidator(validationSelector, '.form-profile');
const formCardValidation = new FormValidator(validationSelector, '.form-card');
const userInfoProfile = new UserInfo(profileName, profileJob);


const CardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card(item, {
      handleCardClick: (element)=>{
        const popupImageOpen = new PopupWithImage(element, '.popup-image');
        popupImageOpen.open();
      },
      templateElement: '.templateCard'
    });
    const cardElement = card.generateCard();
    CardList.addItem(cardElement);
  }
}, '.element');

function getCard (evt) {
  evt.preventDefault();
  const card = [{
    name: inputNameFormAddNewCard.value,
    alt: inputNameFormAddNewCard.value,
    link: inputLinkFormAddNewCard.value
  }];
  evt.target.reset();
  const Addcard = new Section({
    data: card,
    renderer: (item) => {
      const card = new Card(item, {
        handleCardClick: (element)=>{
          const popupImageOpen = new PopupWithImage(element, '.popup-image');
          popupImageOpen.open();
        },
        templateElement: '.templateCard'
      });
      const cardElement = card.generateCard();
      Addcard.addItem(cardElement);
    }
  }, '.element');

  Addcard.renderItems();
}

const popupFormCard = new PopupWithForm ({
  submitForm: ()=>{
    formCardValidation.clearInputError();
    formCardValidation.enableValidation();
  },
},'.popup-card');

const popupFormProfile = new PopupWithForm ({
  submitForm: ()=>{
    formProfileValidation.clearInputError();
    formProfileValidation.enableValidation();
  },
},'.popup-profile');


CardList.renderItems();



function passTheValueUserProfile (data) {
  profileinputName.value = data.userName;
  profileInputDescription.value = data.userDescription;
}

function handlingEventsWhenOpeningForm () {
  popupFormProfile.open();
  passTheValueUserProfile(userInfoProfile.getUserInfo());
}

popupProfileButton.addEventListener('click', ()=>{
  handlingEventsWhenOpeningForm();
});

popupCardButton.addEventListener('click', ()=> {
  popupFormCard.open();
});

profileFormSubmit.addEventListener('submit', ()=>{
  userInfoProfile.setUserInfo(popupFormProfile._getInputValues());
})

popupCardSubmit.addEventListener('submit', getCard)