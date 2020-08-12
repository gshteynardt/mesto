
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

