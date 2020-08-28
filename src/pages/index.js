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
  popupReplaceAvatarSelector,
} from "../utils/constants.js";


export const btnEditProfile = document.querySelector('.button_edit');
export const btnAddCard = document.querySelector('.button_add');
export const formProfile = document.querySelector('.popup__content_theme_profile');
export const formCard = document.querySelector('.popup__content_theme_elements');
export const formAvatar = document.querySelector('.popup__content_theme_avatar');
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_job');
export const avatarUser = document.querySelector('.profile__avatar');

const profileFormValidator = new FormValidator(config, formProfile);
profileFormValidator.enableValidation(config);

const cardFormValidator = new FormValidator(config, formCard);
cardFormValidator.enableValidation(config);

const avatarFormValidator = new FormValidator(config, formAvatar);
avatarFormValidator.enableValidation(config);

const popupWithImg = new PopupWithImage(popupImgSelector);
popupWithImg.setEventListeners();

const popupDeleteCard = new PopupDeleteCard(popupDeleteCardSelector);
popupDeleteCard.setEventListeners();


//создаем экземпляр класса API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: 'c543d785-697b-4b19-aa15-a606529eab61',
    'Content-Type': 'application/json'
  }
});

api.gitAppInfo()
  .then(data => {
    const [ initialCards, profileData ] = data
    const userInfo = new UserInfo(profileNameSelector, profileJobSelector);
    userInfo.setUserInfo(profileData);

    const userId = profileData._id;

    const renderer = (item) => {
      const card = new Card({
        data: item,
        currentUserID: userId,
        handleCardClick: () => {
          popupWithImg.open(item);
        },

        handleLikeClick: () => {
          const isLiked = card.isLiked();

          if(isLiked) {
            api.deleteLikeCard(item._id)
              .then(item => card.updateLikes(item.likes))
              .catch(err => console.log(err));
          } else {
            api.addLikeCard(item._id)
              .then(item => card.updateLikes(item.likes))
              .catch(err => console.log(err))
          }
        },

        handleDeleteIconClick: () => {
          popupDeleteCard.open();
          popupDeleteCard.setSubmitHandler( () => {
            api.deleteCard(item._id)
              .then(() => {
                  card.removeCard();
                  popupDeleteCard.close();
                }
              )
              .catch(err => console.log(err));
          });
        }
      }, templateElementSelector);

      cardList.addItem(card.getCard());
    }

    const cardList = new Section({
        items: initialCards,
        renderer
      },
      containerCardSelector
    );
    cardList.renderItems();
  });

//экземпляр popup добавления новых карточек
const popupFormAddCard = new PopupWithForm({
  popupSelector: popupAddCardSelector,
  handleFormSubmit: data => {
    api.createCard(data)
      .then( data => {
          const cardElement = createCard(data).generateCard(data);
          renderCard(data).addItem(cardElement);
          popupFormAddCard.close();
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
  handleFormSubmit: () => {
    api.editUserInfo(data)
      .then(data => {
        userInfo.setUserInfo(data);
        popupEditProfile.close();
      })
      .catch(err => console.log(err));
  }
});
popupEditProfile.setEventListeners();

const popupChangeAvatar = new PopupWithForm({
  popupSelector: popupReplaceAvatarSelector,
  handleFormSubmit: (item) => {
    api.replaceUserPicture(item.link)
      .then(() => popupChangeAvatar.close())
      .catch(err => console.log(err))
  }
});
popupChangeAvatar.setEventListeners();


btnEditProfile.addEventListener('click', () => {
  popupEditProfile.open();
  profileFormValidator.resetErrorElement();
  setValueInputPopupProfile(userInfo.getUserInfo());
  });

btnAddCard.addEventListener('click', () => {
  popupFormAddCard.open();
  cardFormValidator.resetErrorElement();
});

avatarUser.addEventListener('click', () => {
  popupChangeAvatar.open();
  avatarFormValidator.resetErrorElement();
})