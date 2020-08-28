import {
  btnSubmitSelector
} from './constants';

export const loaderForSubmit = (loading, popupSelector) => {
  const popupOpened = document.querySelector(popupSelector);
  const btnSubmit = popupOpened.querySelector(btnSubmitSelector);

    btnSubmit.textContent = loading ? 'Сохранение...' : 'Сохранить';
}