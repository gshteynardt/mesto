import {popupImg} from "../pages";

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
];

export const config = {
  formSelector: '.popup__content',
  popupFieldSelector: '.popup__field',
  inputSelector: '.popup__input',
  errorSelector: '.popup__error',
  submitButtonSelector: '.button_submit',
  inactiveButtonClass: 'button_disabled',
  inputErrorVisibleClass: 'popup__error_visible',
  inputErrorClass: 'popup__input_type_error',
};

export const templateElementSelector = '.template-element';
export const containerCardSelector = '.elements__items';
export const popupProfileSelector = '.popup_theme_profile';
export const popupAddCardSelector = '.popup_theme_elements';
export const popupImgSelector = '.popup_theme_image';
export const profileNameSelector = '.profile__name';
export const profileJobSelector = '.profile__job';
export const imgPopupSelector = '.popup__img';
export const captionImgPopupSelector = '.popup__caption';