//this variables for profile block
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileEdit = document.querySelector('.button_edit');
const cardAdd = document.querySelector('.button_add');
//this variables for popup block
const popup = document.querySelector('.popup');
const popupClose = popup.querySelector('.popup__close');
//this variables for popup_theme_profile
const popupEditProfile = popup.querySelector('.popup_theme_profile');
const formProfile = popup.querySelector('.popup__content_theme_profile');
const nameInput = popup.querySelector('.popup__input_type_name');
const jobInput = popup.querySelector('.popup__input_type_job');
//this variables for popup_theme_elements
const popupAddCard = document.querySelector('.popup_theme_elements');
const formElement = popupAddCard.querySelector('.popup__content_theme_elements');
//this variables for template elements
const elementsTemplate = document.querySelector('.template-element')

//this variables for elements
const elements = document.querySelector('.elements');
const itemsElements = elements.querySelector('.elements__items');
//this variables for popup_theme_elements
const placeInput = popupAddCard.querySelector('.popup__input_type_place');
const linkInput = popupAddCard.querySelector('.popup__input_type_link');

let  containsClass = document.querySelector('.popup_opened');

//функция добавления карточек
function addCard(card) {
  const cardTemplate = elementsTemplate.content;
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

  itemsElements.prepend(cardElements);
}

//функция рендеринга карточек при загрузке
initialCards.forEach(card => addCard(card));

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
  togglePopup(popup);
}

//открытие popup addCard
function popupAddCardShow(){
  togglePopup(popupAddCard);
}

//закрытие popup по клику на overlay
function closePopupByClickingOverlay(evt) {
  if (evt.target !== evt.currentTarget) {
    return
  }
  togglePopup(popup);
}


//обработчик profile form
function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopup(popupEditProfile)
  //popup.classList.toggle('popup_opened');
}

//обработчик card form
function cardFormSubmitHandler(evt) {
  evt.preventDefault();
  let name = placeInput.value;
  let link = linkInput.value;
  let cardItem = {
    name,
    link,
  }
  addCard(cardItem)
  togglePopup(popupAddCard)
  formElement.reset()
}

profileEdit.addEventListener('click', popupEditProfileShow);

popupClose.addEventListener('click', function(evt){
  const popupItem = evt.target.closest('.popup_opened')
  console.log(popupItem)
  if (popupItem) {
    togglePopup(popup)
  }
});

cardAdd.addEventListener('click', popupAddCardShow);
formProfile.addEventListener('submit', profileFormSubmitHandler);
formElement.addEventListener('submit', cardFormSubmitHandler);
popup.addEventListener('click', closePopupByClickingOverlay);