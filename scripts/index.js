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
const formCard = popupAddCard.querySelector('.popup__content_theme_elements');
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

const config = {
  formSelector: '.popup__content',
  inputSelector: '.popup__input',
  submitButtonSelector: '.button_submit',
  inactiveButtonClass: '.button_disabled',
  inputErrorClass: '.popup__input_type_error',
  errorSelector: '.popup__error',
  errorClass: '.popup__error_visible',
  popupFieldSelector: '.popup__field',
};

enableValidation(config);

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
    openPopup(popupImg);
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

//функция открытия popup
function openPopup(popup,formElement, inputElement) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', closePopupByKeydownEsc);

  formElement = popupEditProfile.querySelector(config.formSelector);
  inputElement = formElement.querySelectorAll(config.inputSelector);
  hideInputError(formElement, inputElement)
}

//функция закрытия popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByKeydownEsc);
}

//функция remove карточки
function deleteCard(evt) {
  const card = evt.target.closest('.elements__item');
  card.remove();
}

//открытие popup profile
function popupEditProfileShow(popup, formElement, inputElement) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEditProfile, formElement, inputElement);
}

//открытие popup addCard
function popupAddCardShow() {
  openPopup(popupAddCard);
}

//обработчик profile form
function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile)
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
  closePopup(popupAddCard)
  formCard.reset()
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
closePopupByClickingOverlay()

//закрытия popup по нажатию на esc
  function closePopupByKeydownEsc(evt) {
      if (evt.key === 'Escape' && document.querySelector('.popup_opened')) {
        closePopup(popupEditProfile)
      }
    }


profileEdit.addEventListener('click', popupEditProfileShow);
cardAdd.addEventListener('click', popupAddCardShow);
popupCloseForCard.addEventListener('click', () => closePopup(popupAddCard));
popupCloseForProfile.addEventListener('click', () => closePopup(popupEditProfile));
popupCloseForImg.addEventListener('click', () => closePopup(popupImg));
formProfile.addEventListener('submit', profileFormSubmitHandler);
formCard.addEventListener('submit', cardFormSubmitHandler);

document.addEventListener('keydown', closePopupByKeydownEsc);