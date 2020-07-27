//this variables for profile block
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const btnEditProfile = document.querySelector('.button_edit');
const btnAddCard = document.querySelector('.button_add');
//this variables for popup_theme_profile
const popupEditProfile = document.querySelector('.popup_theme_profile');
const formProfile = document.querySelector('.popup__content_theme_profile');
const btnCloseForPopupProfile = popupEditProfile.querySelector('.popup__close');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
//this variables for popup_theme_elements
const popupAddCard = document.querySelector('.popup_theme_elements');
const formCard = popupAddCard.querySelector('.popup__content_theme_elements');
const placeInput = popupAddCard.querySelector('.popup__input_type_place');
const linkInput = popupAddCard.querySelector('.popup__input_type_link');
const btnCloseForPopupCard = popupAddCard.querySelector('.popup__close');
//this variables for elements
const elements = document.querySelector('.elements');
const elementsContainer = elements.querySelector('.elements__items');

import Card from "./Card.js";
import {cardFormValidator, profileFormValidator} from "./FormValidator.js";
import {config, initialCards, openPopup, closePopup,} from "./utils.js";

//функция добавления карточек
function addCard(card, container) {
  container.prepend(card);
}

//функция рендеринга карточек при загрузке
initialCards.forEach(function (item) {
  const card = new Card(item, '.template-element');
  const cardElement = card.generateCard();

  addCard(cardElement, elementsContainer);
});

//открытие popup profile
function popupEditProfileShow(popup, formElement, inputElement) {
  profileFormValidator.resetErrorElement()
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  profileFormValidator.resetErrorElement()
  openPopup(popupEditProfile, formElement, inputElement);
}

//функция очистки полей в popupCard
function resetCardForm() {
  placeInput.value = '';
  linkInput.value = '';
}

//открытие popup addCard
function popupAddCardShow() {
  openPopup(popupAddCard);
  resetCardForm();
  cardFormValidator.resetErrorElement();
}

//обработчик profile form
function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile)
}

//обработчик card form
function cardFormSubmitHandler(evt) {
  evt.preventDefault();
  const name = placeInput.value;
  const link = linkInput.value;
  const cardItem = {
    name,
    link,
  }
  const card = new Card(cardItem, '.template-element');
  const cardElement = card.generateCard()
  addCard(cardElement, elementsContainer);
  closePopup(popupAddCard);
  formCard.reset();
}

btnEditProfile.addEventListener('click', popupEditProfileShow);
btnAddCard.addEventListener('click', popupAddCardShow);
btnCloseForPopupCard.addEventListener('click', () => closePopup(popupAddCard));
btnCloseForPopupProfile.addEventListener('click', () => closePopup(popupEditProfile));
formProfile.addEventListener('submit', profileFormSubmitHandler);
formCard.addEventListener('submit', cardFormSubmitHandler);
