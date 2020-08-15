import './index.css';
import Card from '../components/Card.js';
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {setValueInputPopupProfile} from "../utils/utils.js";

import {
  btnAddCard,
  btnEditProfile,
  config,
  containerCardSelector,
  formCard,
  formProfile,
  initialCards,
  popupAddCardSelector,
  popupImgSelector,
  popupProfileSelector,
  profileJobSelector,
  profileNameSelector,
} from "../utils/constants.js";


const profileFormValidator = new FormValidator(config, formProfile);
profileFormValidator.enableValidation(config);

const cardFormValidator = new FormValidator(config, formCard);
cardFormValidator.enableValidation(config);

const popupImg = new PopupWithImage(popupImgSelector);

//функция создания карточки
function createCard(item) {
  return new Card({
    data: item,
    handleCardClick: (evt) => {
      popupImg.open(evt);
      popupImg.setEventListeners();
    }
  }, '.template-element')
}

//экземпляр для рендеринга первоначального массива карточек
const initialArray = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item).generateCard();
    initialArray.addItem(cardElement);
  }
},
  containerCardSelector
);
initialArray.renderItems();

export const userInfo = new UserInfo(profileNameSelector, profileJobSelector);

//экземпляр popup добавлени я новых карточек
const popupFormAddCard = new PopupWithForm({
  popupSelector: popupAddCardSelector,
  handleFormSubmit: (item) => {
    const cardElement = createCard({ name: item.place, link: item.url }).generateCard();
    initialArray.addItem(cardElement);
  }
});
popupFormAddCard.setEventListeners();

//экземпляр popup редактирования профиля
const popupEditProfile = new PopupWithForm({
  popupSelector: popupProfileSelector,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  }
});
popupEditProfile.setEventListeners();


  btnEditProfile.addEventListener('click', () => {
    popupEditProfile.open();
    profileFormValidator.resetErrorElement();
    setValueInputPopupProfile(userInfo.getUserInfo());
  });

  btnAddCard.addEventListener('click', () => {
    popupFormAddCard.open();
    cardFormValidator.resetErrorElement();
});


