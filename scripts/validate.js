// const config = {
//   formSelector: '.popup__content',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.button_submit',
//   inactiveButtonClass: '.button_disabled',
//   inputErrorClass: '.popup__input_type_error',
//   errorSelector: '.popup__error',
//   errorClass: '.popup__error_visible',
//   popupFieldSelector: '.popup__field'
// };


//this function shows an error
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = inputElement.closest(config.popupFieldSelector).querySelector(config.errorSelector);

  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = errorMessage;
}

//this function hides an error
const hideInputError = (formElement, inputElement) => {
  const errorElement = inputElement.closest(config.popupFieldSelector).querySelector(config.errorSelector);

  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
}

//this function checks input valid
const checkInputValidity = (inputElement, formElement) => {
  if(!inputElement.validity.valid){
    showInputError(formElement, inputElement, inputElement.validationMessage)
  }else {
    hideInputError(formElement, inputElement)
  }
}

//this function
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//this function
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('button_disabled');
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove('button_disabled');
    buttonElement.removeAttribute('disabled');
  }
};

//this function sets validation inputs
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector('.button_submit');

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (evt) => {
      checkInputValidity(inputElement, formElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}


//this function sets validation forms
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}


