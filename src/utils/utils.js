// //открытие popup profile
// function popupEditProfileShow(popup, formElement, inputElement) {
//   profileFormValidator.resetErrorElement()
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileJob.textContent;
//   profileFormValidator.resetErrorElement()
//   openPopup(popupEditProfile, formElement, inputElement);
// }
//
// //функция очистки полей в popupCard
// function resetCardForm() {
//   placeInput.value = '';
//   linkInput.value = '';
// }
//
// //открытие popup addCard
// function popupAddCardShow() {
//   openPopup(popupAddCard);
//   resetCardForm();
//   cardFormValidator.resetErrorElement();
// }
//
// //обработчик profile form
// function profileFormSubmitHandler(evt) {
//   evt.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileJob.textContent = jobInput.value;
//   closePopup(popupEditProfile)
// }
//
// //обработчик card form
// function cardFormSubmitHandler(evt) {
//   evt.preventDefault();
//   const name = placeInput.value;
//   const link = linkInput.value;
//   const cardItem = {
//     name,
//     link,
//   }
//   const card = new Card(cardItem, '.template-element');
//   const cardElement = card.generateCard()
//   addCard(cardElement, elementsContainer);
//   closePopup(popupAddCard);
//   formCard.reset();
// }
//

