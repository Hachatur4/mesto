import './index.css';
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js"
import PopupWithImage from "../components/PicturePopup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  popupProfileButton,
  profileName,
  profileJob,
  popupCardButton,
  profileinputName,
  profileInputDescription,
  validationSelector,
  avatarImage
} from "../utils/constants.js";
                                
const formProfileValidation = new FormValidator(validationSelector, '.form-profile');
formProfileValidation.enableValidation();
const formCardValidation = new FormValidator(validationSelector, '.form-card');
formCardValidation.enableValidation();
const formAvatarValidation = new FormValidator(validationSelector, '.form-avatar');
formAvatarValidation.enableValidation();

const userInfoProfile = new UserInfo(profileName, profileJob, avatarImage);
const popupImageOpen = new PopupWithImage('.popup-image');
const cardDeletePopup = new PopupWithConfirmation('.delete-card')

const avatarClick = document.querySelector('.profile__avatar');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: '028c01f3-79c5-47ed-9e7a-c79c4643af33',
    ContentType: 'application/json'
  }
})

let userId = null;

api.getAppInfo()
.then(([cards, userData])=>{
  userId = userData._id;
  cardList.renderItems(cards);
  getDataProfile(userData);
  setNewAvatar(userData)
})
.catch((err)=> console.log(`catch: ${err}`))


function setNewAvatar(userData){
  userInfoProfile.setApiAvatar(userData);
}

  const cardList = new Section({
    renderer: (cards) => {
      cardList.addItem(createNewCard(cards, userId));
    }
  }, '.element');


  const createNewCard = (cards) => {
    const card = new Card({
      cards, 
      userId,
      handleCardClick, 
      handleDeleteCard,
      putAndDeleteLike, 
      templateElement: '.templateCard' 
    }); 
    return card.generateCard(); 
  } 

const newCardPopup = new PopupWithForm({
  handleFormSubmit: (data, buttonLoader) => {
    api.createCard(data)
    .then((result)=>{
      cardList.newAddItems(createNewCard(result));
      newCardPopup.close()
    })
    .catch((err)=> console.log(`catch: ${err}`))
    .finally(()=>{
      buttonLoader.textContent = 'Сохранить'
    })
  }
}, '.popup-card'); 

function handleDeleteCard (deleteCard, card){
  cardDeletePopup.open();
  cardDeletePopup.setSubmitAction(()=>{
    api.deleteCard(card._cardId)
    .then((result)=>{
      deleteCard(card)
      cardDeletePopup.close()
    })
    .catch((err)=> console.log(`catch: ${err}`))
  })
}

function handleCardClick(name, link){
  popupImageOpen.open(name, link);
}

function putAndDeleteLike (element) {
  if(element.checkIsLiked()){
    api.deleteLike(element._cardId)
    .then((result)=>{
      element.updateCardLikeNumber(result);
      element._element.querySelector('.card__like-button').classList.remove("card__like-button_active")
    })
    .catch((err)=> console.log(`catch: ${err}`))
  } else {
    api.putLike(element._cardId)
    .then((result)=>{
      element.updateCardLikeNumber(result);
      element._element.querySelector('.card__like-button').classList.add("card__like-button_active")
    })
    .catch((err)=> console.log(`catch: ${err}`))
  }
}

const getDataProfile = (userData)=>{
  userInfoProfile.getDataProfile(userData);
}

const userInfoPopup = new PopupWithForm({
  handleFormSubmit: (data, buttonLoader) => {
    api.sendUserInfo(data)
    .then((result)=>{
      userInfoProfile.setUserInfo(data);
      userInfoPopup.close()
    })
    .catch((err)=> console.log(`catch: ${err}`))
    .finally(()=>{
      buttonLoader.textContent = 'Сохранить'
    })
  }
}, '.popup-profile'); 

const avatarChangePopup = new PopupWithForm({
  handleFormSubmit: (data, buttonLoader) => {
    api.userAvatar(data)
    .then((result)=>{
      userInfoProfile.setUserAvatar(data);
      avatarChangePopup.close()
    })
    .catch((err)=> console.log(`catch: ${err}`))
    .finally(()=>{
      buttonLoader.textContent = 'Сохранить'
    })
  }
}, '.popup-changeAvatar');


newCardPopup.setEventListeners();
userInfoPopup.setEventListeners();
popupImageOpen.setEventListeners();
avatarChangePopup.setEventListeners();
cardDeletePopup.setEventListeners();


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
  formCardValidation.cardButtonValidation();
}

function openChangeAvatar(){
  formAvatarValidation.clearInputError();
  avatarChangePopup.open();
  formAvatarValidation.cardButtonValidation()
}


popupProfileButton.addEventListener('click', ()=>{
  handlingEventsWhenOpeningProfileForm();
});

popupCardButton.addEventListener('click', ()=> {
  handlingEventsWhenOpeningCardForm(); 
});

avatarClick.addEventListener('click', ()=>{
  openChangeAvatar();
});