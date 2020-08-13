
import Card from '../components/Card.js';
import  Section  from "../components/Section.js";
import  FormValidator  from "../components/FormValidator.js";
import Popup from '../components/Popup.js';
import PopupWithForm from "../components/PopupWithForm.js";

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

//экземпляр popup добавлени я новых карточек
const popupFormAddCard = new PopupWithForm({
  popupSelector: popupAddCardSelector,
  handleFormSubmit: (item) => {
    console.log(item)
    const card = new Card({ name: item.place, link: item.url }, '.template-element');
    const cardElement = card.generateCard();
    initialArray.addItem(cardElement);
  }
});
popupFormAddCard.setEventListeners();

//экземпляр popup редактирования профиля
const popupEditProfile = new PopupWithForm({
  popupSelector: popupProfileSelector,
  handleFormSubmit: () => {

  }
});


  btnEditProfile.addEventListener('click', () => {

  });

  btnAddCard.addEventListener('click', () => {
    popupFormAddCard.open();
    cardFormValidator.resetErrorElement();
});


