import './index.css';
import Card from '../components/Card.js';
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";


import {
  templateElementSelector,
  config,
  containerCardSelector,
  initialCards,
  popupAddCardSelector,
  popupImgSelector,
  popupProfileSelector,
  profileJobSelector,
  profileNameSelector,
} from "../utils/constants.js";


export const btnEditProfile = document.querySelector('.button_edit');
export const btnAddCard = document.querySelector('.button_add');
export const formProfile = document.querySelector('.popup__content_theme_profile');
export const formCard = document.querySelector('.popup__content_theme_elements');
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_job');

const profileFormValidator = new FormValidator(config, formProfile);
profileFormValidator.enableValidation(config);

const cardFormValidator = new FormValidator(config, formCard);
cardFormValidator.enableValidation(config);

const popupWithImg = new PopupWithImage(popupImgSelector);

//функция создания карточки
function createCard(item) {
  return new Card({
    data: item,
    handleCardClick: (item) => {
      popupWithImg.open(item);
      popupWithImg.setEventListeners();
    }
  }, templateElementSelector)
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

//при открытие popup profile устанавливаем первоначальные значения инпутам
export function setValueInputPopupProfile(data) {
  nameInput.value = data.name;
  jobInput.value = data.job;
}

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
