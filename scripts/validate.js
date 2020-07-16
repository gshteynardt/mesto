
//функция отображения ошибок в форме
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = inputElement.closest(config.popupFieldSelector).querySelector(config.errorSelector);

  inputElement.classList.add('popup__input_type_error');
  errorElement.classList.add('popup__error_visible');
  errorElement.textContent = errorMessage;
}

//фуекция удаления ошибок в форме
const hideInputError = (formElement, inputElement) => {
  const errorElement = inputElement.closest(config.popupFieldSelector).querySelector(config.errorSelector);

  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
}

//функция проверяющая валидность поля для отображения/скрытия ошибок
const checkInputValidity = (inputElement, formElement) => {
  if(!inputElement.validity.valid){
    showInputError(formElement, inputElement, inputElement.validationMessage)
  }else {
    hideInputError(formElement, inputElement)
  }
}

//функция поиска невалидных полей, в дальнейшем передаем результат этой функции для активации кнопки submit
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//функция переключающая состояние кнопки button_submit
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('button_disabled');
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove('button_disabled');
    buttonElement.removeAttribute('disabled');
  }
};

//устанавливаем обработчик событий на каждый input
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement, formElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}


//устанавливаем обработчик событий на каждую форму
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}


