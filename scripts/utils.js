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

export const popupImg = document.querySelector('.popup_theme_image');
export const imgPopup = popupImg.querySelector('.popup__img');
export const captionPopup = popupImg.querySelector('.popup__caption');
export const popupCloseForImg = popupImg.querySelector('.popup__close');

//закрытия popup по нажатию на esc
export function handleEsc(evt) {
  const popupOpened = document.querySelector('.popup_opened')
  if (evt.key === 'Escape') {
    if (popupOpened) {
      closePopup(popupOpened)
    }
  }
}

//функция открытия popup
export function openPopup(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', handleEsc);
}

//функция закрытия popup
export function closePopup(popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', handleEsc);
}

//функция закрытия popup по клику на overlay
function closePopupByClickingOverlay() {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popupElement) => {
    popupElement.addEventListener('mousedown', evt => {
      if(evt.target !== evt.currentTarget) {
        return
      }
      closePopup(popupElement)
    });
  });
}
closePopupByClickingOverlay();

