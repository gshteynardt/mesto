import './index.css';
import Card from '../components/Card.js';
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from "../components/PopupWithForm.js";
import PopupDeleteCard from "../components/PopupDeleteCard.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import {
  templateElementSelector,
  config,
  containerCardSelector,
  popupAddCardSelector,
  popupImgSelector,
  popupProfileSelector,
  popupDeleteCardSelector,
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

//создаем экземпляр класса API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: 'c543d785-697b-4b19-aa15-a606529eab61',
    'Content-Type': 'application/json'
  }
});

//создаем перемнную для нашего ID
let myID;

//вставляем информацию о пользователе с сервера
api.getUserInfo()
  .then( data => {
    userInfo.setUserInfo(data);
    myID = data._id;
  })
  .catch( err => {
    console.log(err);
  })

//
const popupDeleteCard = new PopupDeleteCard(popupDeleteCardSelector);

//функция создания карточки
function createCard(item) {
  const card = new Card({
    data: item,
    myID,
    handleCardClick: () => {
      popupWithImg.open(item);
      popupWithImg.setEventListeners();
    },

    handleLikeClick: (evt) => {
      if(!evt.target.classList.contains('button__like_active')) {
        api.addLikeCard(item._id)
          .then((res) => card.getSumLikes(res))
          .then(evt.target.classList.add('button__like_active'))
          .catch(err => console.log(err));
      } else if (evt.target.classList.contains('button__like_active')){
        api.deleteLikeCard(item._id)
          .then((res) => card.getSumLikes(res))
          .then(evt.target.classList.remove('button__like_active'))
          .catch(err => console.log(err));
      }
    },

    handleDeleteIconClick: () => {
      popupDeleteCard.open();
      popupDeleteCard.setEventListeners( (item) => {
        api.deleteCard(item._id)
          .then(() => card.removeCard())
          .then(() => popupDeleteCard.close())
          .catch(err => console.log(err));
      })
    }
  }, templateElementSelector)

  return card
}

//функция рендеринга карточки
function renderCard(data) {
  const initialArray = new Section({
      items: data,
      renderer: (data) => {
        const cardElement = createCard(data).generateCard(data);
        initialArray.addItem(cardElement);
      }
    },
    containerCardSelector
  );

  return initialArray;
}

//рендерим первоначальный массив карточек
api.getInitialCards()
  .then( data => {
    renderCard(data).renderItems();
  })
  .catch( err => {
    console.log(err);
  });

export const userInfo = new UserInfo(profileNameSelector, profileJobSelector);

//экземпляр popup добавления новых карточек
const popupFormAddCard = new PopupWithForm({
  popupSelector: popupAddCardSelector,
  handleFormSubmit: data => {
    console.log(data)
    api.createCard(data)
      .then( data => {
          const cardElement = createCard(data).generateCard(data);
          renderCard(data).addItem(cardElement);
        }
      )
      .catch(err => console.log(err));
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
