
export default class Card {
  constructor({ data, myID, handleCardClick, handleLikeClick, handleDeleteIconClick }, cardSelector) {
    console.log(data)
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._userID = myID;
    this._ownerID = data.owner._id;
    this._cardID = data._id;
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

  //отображение количества лайков
  getSumLikes(data) {
    const countLikes = this._element.querySelector('.elements__likes');
    if(data.likes.length > 0) {
      countLikes.textContent = data.likes.length;
    }
  }

  // //метод измения статуса кнопки like
  // _toggleLike() {
  //   this._element.querySelector('.button__like').classList.toggle('button__like_active');
  // }

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
  generateCard(data) {
    this._element = this._getTemplate();
    this._img = this._element.querySelector('.elements__img');
    this._title = this._element.querySelector('.elements__title');

    if (this._userID !== this._ownerID) {
      const btnCardDelete = this._element.querySelector('.button_delete');
      btnCardDelete.style.display = 'none';
      btnCardDelete.setAttribute('disabled', true);
    } else {
      const btnCardDelete = this._element.querySelector('.button_delete');
      btnCardDelete.style.display = 'block';
      btnCardDelete.setAttribute('disabled', false);
    }

    this._img.alt = this._name;
    this._img.src = this._link;
    this._title.textContent = this._name;

    this.getSumLikes(data);
    this._setEventListener();

    return this._element;
  }
}



