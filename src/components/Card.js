
export default class Card {
  constructor({ data, currentUserId, handleCardClick, handleLikeClick, handleDeleteIconClick, handleAvatarClick}, cardSelector) {

    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._userId = currentUserId;
    this._ownerId = data.owner._id;
    this.handleCardClick = handleCardClick;
    this.handleLikeClick = handleLikeClick
    this.handleDeleteIconClick = handleDeleteIconClick;
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
  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _getLikesCount() {
    return this._likes.length
  }

  //сравниваем наш текущий id и like_id карточки
  isLiked() {
    return !!this._likes.find(like => like._id === this._userId);
  }

  //функция обновления
  updateLikes(newLikes) {
    this._likes = newLikes;
    this._element.querySelector('.elements__likes').textContent = this._getLikesCount();
    if(this.isLiked()) {
      this._element.querySelector('.button__like').classList.add('button__like_active');
    } else {
      this._element.querySelector('.button__like').classList.remove('button__like_active');
    }
  }


  //метод добавления слушателя
  _setEventListener(){
    //вешаем обработчик на кнопку delete
    this._element.querySelector('.button_delete').addEventListener('click', this.handleDeleteIconClick);

    //вешаем обработчик на кнопку like
    this._element.querySelector('.button__like').addEventListener('click', this.handleLikeClick);

    //вешаем обработчик саму картинку
    this._element.querySelector('.elements__img').addEventListener('click', this.handleCardClick);

  }

  //создаем новую карточку и сразу добавляем обработчики
  getCard() {
    this._element = this._getTemplate();
    this._img = this._element.querySelector('.elements__img');
    this._title = this._element.querySelector('.elements__title');

    if (this._ownerId === this._userId) {
      const btnCardDelete = this._element.querySelector('.button_delete');
      btnCardDelete.style.display = 'block';
    } else {
      const btnCardDelete = this._element.querySelector('.button_delete');
      btnCardDelete.style.display = 'none';
    }

    this._img.alt = this._name;
    this._img.src = this._link;
    this._title.textContent = this._name;

    this.updateLikes(this._likes);
    this._setEventListener();

    return this._element;
  }
}



