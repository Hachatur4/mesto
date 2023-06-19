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

const userInfoProfile = new UserInfo(profileName, profileJob);
const popupImageOpen = new PopupWithImage('.popup-image');
const cardDeletePopup = new PopupWithConfirmation('.delete-card')

const avatarChange = document.querySelector('.profile__avatar-pencil');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: '028c01f3-79c5-47ed-9e7a-c79c4643af33',
    ContentType: 'application/json'
  }
})

api.getAppInfo()
.then(([cards, userData])=>{
  cardList.renderItems(cards, userData);
})
.catch((err)=> console.log(`catch: ${err}`))

api.getUserInfo()
  .then((result)=>{
    profileName.textContent = result.name;
    profileJob.textContent = result.about;
  })  
  .catch((err)=> console.log(`catch: ${err}`))

  api.getAvatar()
  .then((result)=>{
    avatarImage.src = result.avatar;
  })
  .catch((err)=> console.log(`catch: ${err}`))


  const cardList = new Section({
    renderer: (cards, userData) => {
      cardList.addItem(createNewCard(cards, userData));
    }
  }, '.element');


  const createNewCard = (cards, userData) => {
    const card = new Card({
      cards,
      userData,
      handleCardClick,
      handleDeleteCard,
      handleApi_idOwner,
      putAndDeleteLike,
      templateElement: '.templateCard'
    });
    return card.generateCard();
}


function handleDeleteCard (element, cardId){
  cardDeletePopup.open();
  cardDeletePopup.setSubmitAction(()=>{
    api.deleteCard(cardId)
    .then((result)=>{
      element.remove()
    })
    .catch((err)=> console.log(`catch: ${err}`))
  })
}

function handleApi_idOwner(data, allId){
  api.getUserInfo()
    .then((result)=>{
      if (allId === result._id){
        data.querySelector('.card__delete').classList.remove("card__delete_disable");
      }else{
        data.querySelector('.card__delete').classList.add("card__delete_disable");
      }
    })
    .catch((err)=> console.log(`catch: ${err}`))
}

function handleCardClick(name, link){
  popupImageOpen.open(name, link);
}

function putAndDeleteLike (cardId, element, userData, allUsersLiked, numberLikes){
  const getNumberLike = (result)=>{
    return numberLikes.textContent = result.likes.length;
  }
  const isLikedUser = allUsersLiked.some((user)=>{
    return userData._id === user._id;
  })
    if(isLikedUser){
      api.deleteLike(cardId)
      .then((result)=>{
        getNumberLike(result)
      element.querySelector('.card__like-button').classList.remove("card__like-button_active")
      })
      .catch((err)=> console.log(`catch: ${err}`))
    } else {
      api.putLike(cardId)
      .then((result)=>{
        getNumberLike(result)
      element.querySelector('.card__like-button').classList.add("card__like-button_active")
      })
      .catch((err)=> console.log(`catch: ${err}`))
  }
}

const newCardPopup = new PopupWithForm({
  handleFormSubmit: (data, buttonLoader) => {
    api.createCard(data)
    .then((result)=>{
      cardList.newAddItems(createNewCard(result));
      buttonLoader.textContent = 'Создать'
    })
    .catch((err)=> console.log(`catch: ${err}`))
    formCardValidation.cardButtonValidation();
  }
}, '.popup-card'); 

const userInfoPopup = new PopupWithForm({
  handleFormSubmit: (data, buttonLoader) => {
    api.sendUserInfo(data)
    .then((result)=>{
      userInfoProfile.setUserInfo(data);
      buttonLoader.textContent = 'Сохранить'
    })
    .catch((err)=> console.log(`catch: ${err}`))
  }
}, '.popup-profile'); 

const avatarChangePopup = new PopupWithForm({
  handleFormSubmit: (data, buttonLoader) => {
    api.userAvatar(data)
    .then((result)=>{
      avatarImage.src = data.avatarLink;
      buttonLoader.textContent = 'Сохранить'
    })
    .catch((err)=> console.log(`catch: ${err}`))
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
}

function openChangeAvatar(){
  formAvatarValidation.clearInputError();
  avatarChangePopup.open();
}


popupProfileButton.addEventListener('click', ()=>{
  handlingEventsWhenOpeningProfileForm();
});

popupCardButton.addEventListener('click', ()=> {
  handlingEventsWhenOpeningCardForm(); 
});

avatarChange.addEventListener('click', ()=>{
  openChangeAvatar();
});