let profileEdit = document.querySelector('.button_edit');
let popup = document.querySelector('.popup');
let popupClose = popup.querySelector('.popup__close');
let nameInput = popup.querySelector('.popup__input_type_name');
let jobInput = popup.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formElement = popup.querySelector('.popup__content');

let containsClass = popup.classList.contains("popup_opened");

function popupShow() {
  if (!containsClass) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    popup.classList.toggle('popup_opened');
  }
  if (containsClass) {
    popup.classList.toggle('popup_opened');
  }
}

function closePopupByClickingOverlay(event) {
  if (event.target !== event.currentTarget) {
    return
  }
  popup.classList.toggle('popup_opened');
}


function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popup.classList.toggle('popup_opened');
}

profileEdit.addEventListener('click', popupShow);
popupClose.addEventListener('click', popupShow);
formElement.addEventListener('submit', formSubmitHandler);
popup.addEventListener('click', closePopupByClickingOverlay);