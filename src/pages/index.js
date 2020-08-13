
import Card from '../components/Card.js';
import  Section  from "../components/Section.js";
import  FormValidator  from "../components/FormValidator.js";
import Popup from '../components/Popup.js';

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


  btnEditProfile.addEventListener('click', () => {
    const popupEditProfile = new Popup(popupProfileSelector);
    popupEditProfile.open();
    popupEditProfile.setEventListeners();
  });


  btnAddCard.addEventListener('click', () => {
  const popupAddCard = new Popup(popupAddCardSelector);
    popupAddCard.open();
    popupAddCard.setEventListeners();
});


// formProfile.addEventListener('submit', profileFormSubmitHandler);
// formCard.addEventListener('submit', cardFormSubmitHandler);
