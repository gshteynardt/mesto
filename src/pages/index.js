import './index.css';
import Card from '../components/Card.js';
import  Section  from "../components/Section.js";
import  FormValidator  from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { setValueInputPopupProfile } from "../utils/utils.js";

import {
  config,
  initialCards,
  containerCardSelector,
  popupProfileSelector,
  popupAddCardSelector,
  formProfile,
  formCard,
  btnEditProfile,
  btnAddCard,
  profileNameSelector,
  profileJobSelector,

} from "../utils/constants.js";

const profileFormValidator = new FormValidator(config, formProfile);
profileFormValidator.enableValidation(config);

const cardFormValidator = new FormValidator(config, formCard);
cardFormValidator.enableValidation(config);

//экземпляр для рендеринга первоначального массива карточек
const initialArray = new Section({
  items: initialCards,

  renderer: (item) => {
    const card = new Card(item, '.template-element');
    const cardElement = card.generateCard();
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
    const card = new Card({ name: item.place, link: item.url }, '.template-element');
    const cardElement = card.generateCard();
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


