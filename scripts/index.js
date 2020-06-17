let profileEdit = document.querySelector('.button_edit');
let popup = document.querySelector('.popup');
let popupClose = popup.querySelector('.popup__close');
let nameInput = popup.querySelector('.popup__input_type_name');
let jobInput = popup.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formElement = popup.querySelector('.popup__content');


let popupToggle = function (event) {
  popup.classList.toggle('popup_opened');
};

const closePopupByClickingOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return
  }
  popupToggle()
}

let popupOpened = function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popup.classList.toggle('popup_opened');
};


function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupToggle();
}

profileEdit.addEventListener('click', popupOpened);
popupClose.addEventListener('click', popupToggle);
formElement.addEventListener('submit', formSubmitHadler);
popup.addEventListener('click', closePopupByClickingOverlay);