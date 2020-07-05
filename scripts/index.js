//this variables for profile block
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileEdit = document.querySelector('.button_edit');
const cardAdd = document.querySelector('.button_add');
//this variables for popup block
const popup = document.querySelector('.popup');
//this variables for popup_theme_profile
const popupEditProfile = document.querySelector('.popup_theme_profile');
const formProfile = popup.querySelector('.popup__content_theme_profile');
const popupCloseForProfile = popupEditProfile.querySelector('.popup__close');
const nameInput = popup.querySelector('.popup__input_type_name');
const jobInput = popup.querySelector('.popup__input_type_job');
//this variables for popup_theme_elements
const popupAddCard = document.querySelector('.popup_theme_elements');
const formElement = popupAddCard.querySelector('.popup__content_theme_elements');
const placeInput = popupAddCard.querySelector('.popup__input_type_place');
const linkInput = popupAddCard.querySelector('.popup__input_type_link');
const popupCloseForCard = popupAddCard.querySelector('.popup__close');
//this variables for popup_theme_image
const popupImg = document.querySelector('.popup_theme_image');
const imgPopup = popupImg.querySelector('.popup__img');
const captionPopup = popupImg.querySelector('.popup__caption');
const popupCloseForImg = popupImg.querySelector('.popup__close');
//this variables for template elements
const elementsTemplate = document.querySelector('.template-element');
const cardTemplate = elementsTemplate.content;
//this variables for elements
const elements = document.querySelector('.elements');
const itemsElements = elements.querySelector('.elements__items');

//Подскажите пожалуйста, "сгруппировать объявления переменных, объявления функций, вызовы функций." - это нужно сделать во всем коде? или внутри функций? переменные я объявил вначале кода, потом идут функции, потом обработчики. подскажите пожалуйста, как правильно сделать
function createCard(card){
  const cardElements = cardTemplate.cloneNode(true);
  const imgCard =  cardElements.querySelector('.elements__img');
  const titleCard = cardElements.querySelector('.elements__title');
  const btnLike = cardElements.querySelector('.button__like');
  const btnDelete = cardElements.querySelector('.button_delete');

  //присваиваем данные из input элементам разметки
  titleCard.textContent = card.name;
  imgCard.alt = card.name;
  imgCard.src = card.link;

  //обработчик кнопки btn__like_active
  btnLike.addEventListener('click', evt =>
    evt.target.classList.toggle('button__like_active'));
  //удаление элемента
  btnDelete.addEventListener('click', deleteCard);
  //обработчик клика по картинке
  imgCard.addEventListener('click', evt => {
    evt.target.closest('.elements__img');
    imgPopup.src = card.link;
    imgPopup.alt = card.name;
    captionPopup.textContent = card.name;
    togglePopup(popupImg);
  });
  return cardElements;
}

//функция добавления карточек
function addCard(card, container) {
  container.prepend(card);
}

//функция рендеринга карточек при загрузке
initialCards.forEach(function (item) {
  const card = createCard(item);
  addCard(card, itemsElements);
});

//добавление удаление класса 'popup_opened'
function togglePopup(popup){
  popup.classList.toggle('popup_opened');
}

//функция remove карточки
function deleteCard(evt) {
  const card = evt.target.closest('.elements__item');
  card.remove();
}

//открытие popup profile
function popupEditProfileShow() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  togglePopup(popupEditProfile);
}

//открытие popup addCard
function popupAddCardShow() {
  togglePopup(popupAddCard);
}

//обработчик profile form
function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopup(popupEditProfile)
}

//обработчик card form
function cardFormSubmitHandler(evt) {
  evt.preventDefault();
  const name = placeInput.value;
  const link = linkInput.value;
  const cardItem = {
    name,
    link,
  }
  const card = createCard(cardItem);
  addCard(card, itemsElements)
  togglePopup(popupAddCard)
  formElement.reset()
}


profileEdit.addEventListener('click', popupEditProfileShow);
cardAdd.addEventListener('click', popupAddCardShow);
popupCloseForCard.addEventListener('click', () => togglePopup(popupAddCard));
popupCloseForProfile.addEventListener('click', () => togglePopup(popupEditProfile));
popupCloseForImg.addEventListener('click', () => togglePopup(popupImg));
formProfile.addEventListener('submit', profileFormSubmitHandler);
formElement.addEventListener('submit', cardFormSubmitHandler);
