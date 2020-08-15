
export default class Card {
  constructor({data, handleCardClick}, cardSelector) {
    this._cardData = data;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
  }

  //метод получения clone template
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);
  }

  //метод удаление карточки
  _removeCard() {
    this._element.remove();
    this._element = null;
  }

  //метод измения статуса кнопки like
  _toggleLike() {
    this._element.querySelector('.button__like').classList.toggle('button__like_active');
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
    this._element.querySelector('.elements__img').addEventListener('click', (evt) => {
      this._handleCardClick(evt);
    });

  }
  //создаем новую карточку и сразу добавляем обработчики
  generateCard() {
    this._element = this._getTemplate();
    this._img = this._element.querySelector('.elements__img');
    this._title = this._element.querySelector('.elements__title');

    this._img.alt = this._cardData.alt;
    this._img.src = this._cardData.link;
    this._title.textContent = this._cardData.name;

    this._setEventListener();

    return this._element;
  }
}



