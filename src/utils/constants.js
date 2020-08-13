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
  inputSelector: '.popup__input',
  submitButtonSelector: '.button_submit',
  inactiveButtonClass: '.button_disabled',
  inputErrorClass: '.popup__input_type_error',
  errorSelector: '.popup__error',
  errorClass: '.popup__error_visible',
  popupFieldSelector: '.popup__field',
};

export const containerCardSelector = '.elements__items';
export const popupProfileSelector = '.popup_theme_profile';
export const popupAddCardSelector = '.popup_theme_elements';
export const popupImgSelector = '.popup_theme_image';
export const profileNameSelector = '.profile__name';
export const profileJobSelector = '.profile__job';

export const popupImg = document.querySelector('.popup_theme_image');
export const imgPopup = popupImg.querySelector('.popup__img');
export const captionPopup = popupImg.querySelector('.popup__caption');

export const btnEditProfile = document.querySelector('.button_edit');
export const btnAddCard = document.querySelector('.button_add');

export const formProfile = document.querySelector('.popup__content_theme_profile');
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_job');

export const popupAddCard = document.querySelector('.popup_theme_elements');
export const formCard = popupAddCard.querySelector('.popup__content_theme_elements');



