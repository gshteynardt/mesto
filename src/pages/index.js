
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

// //функция добавления карточек
// function addCard(card, container) {
//   container.prepend(card);
// }
//
// //функция рендеринга карточек при загрузке
// initialCards.forEach(function (item) {
//   const card = new Card(item, '.template-element');
//   const cardElement = card.generateCard();
//
//   addCard(cardElement, elementsContainer);
// });



// //открытие popup profile
// function popupEditProfileShow(popup, formElement, inputElement) {
//   profileFormValidator.resetErrorElement()
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileJob.textContent;
//   profileFormValidator.resetErrorElement()
//   openPopup(popupEditProfile, formElement, inputElement);
// }
//
// //функция очистки полей в popupCard
// function resetCardForm() {
//   placeInput.value = '';
//   linkInput.value = '';
// }
//
// //открытие popup addCard
// function popupAddCardShow() {
//   openPopup(popupAddCard);
//   resetCardForm();
//   cardFormValidator.resetErrorElement();
// }
//
// //обработчик profile form
// function profileFormSubmitHandler(evt) {
//   evt.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileJob.textContent = jobInput.value;
//   closePopup(popupEditProfile)
// }
//
// //обработчик card form
// function cardFormSubmitHandler(evt) {
//   evt.preventDefault();
//   const name = placeInput.value;
//   const link = linkInput.value;
//   const cardItem = {
//     name,
//     link,
//   }
//   const card = new Card(cardItem, '.template-element');
//   const cardElement = card.generateCard()
//   addCard(cardElement, elementsContainer);
//   closePopup(popupAddCard);
//   formCard.reset();
// }
//
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
