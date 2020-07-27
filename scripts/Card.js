import {openPopup, closePopup, popupCloseForImg, captionPopup, imgPopup, popupImg} from "./utils.js";

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._alt = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  //метод получения clone template
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  }

  //метод удаление карточки
  _removeCard() {
    this._element.remove();
  }

  //метод измения статуса кнопки like
  _toggleLike() {
    this._element.querySelector('.button__like').classList.toggle('button__like_active');
  }

  _handleOpenPopup(){
    imgPopup.src = this._link;
    imgPopup.alt = this._name;
    captionPopup.textContent = this._name;
    openPopup(popupImg);
  }
  //метод добавления слушателя
  _setEventListener(){
    //вешаем обработчик на кнопку delete
    this._element.querySelector('.button_delete').addEventListener('click', () => {
      this._removeCard();
    });

    //вешаем обработчик на кнопку like
    this._element.querySelector('.button__like').addEventListener('click', () => {
      this._toggleLike();
    });

    //вешаем обработчик саму картинку
    this._element.querySelector('.elements__img').addEventListener('click', () => {
      this._handleOpenPopup();
    });

    //вешаем обработчик на кнопку popup__close
    popupCloseForImg.addEventListener('click', () => {
      closePopup(popupImg);
    });
  }
  //создаем новую карточку и сразу добавляем обработчики
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListener();

    this._element.querySelector('.elements__title').textContent = this._name;
    this._element.querySelector('.elements__img').alt = this._alt;
    this._element.querySelector('.elements__img').src = this._link;

    return this._element;
  }
}



