import {config} from "./utils.js";

export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = inputElement.closest(this._config.popupFieldSelector).querySelector(this._config.errorSelector);

    inputElement.classList.add('popup__input_type_error');
    errorElement.classList.add('popup__error_visible');
    errorElement.textContent = errorMessage;
  }

  //функция удаления ошибок в форме
  _hideInputError(inputElement) {
    const errorElement = inputElement.closest(this._config.popupFieldSelector).querySelector(this._config.errorSelector);

    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__error_visible');
    errorElement.textContent = '';
  }

  //функция проверяющая валидность поля для отображения/скрытия ошибок
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(inputElement)
    }
  }

  //функция поиска невалидных полей, в дальнейшем передаем результат этой функции для активации кнопки submit
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

//функция включения состояния disabled для кнопки button_submit
  _onDisabledSubmit(buttonElement) {
    buttonElement.classList.add('button_disabled');
    buttonElement.setAttribute('disabled', true);
  }

//функция выключения состояния disabled для кнопки button_submit
  _offDisabledSubmit(buttonElement) {
    buttonElement.classList.remove('button_disabled');
    buttonElement.removeAttribute('disabled');
  }

//функция переключающая состояние кнопки button_submit
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._onDisabledSubmit(buttonElement);
    } else {
      this._offDisabledSubmit(buttonElement);
    }
  };


//устанавливаем обработчик событий на каждый input
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(config.inputSelector));
    const buttonElement = this._formElement.querySelector(config.submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

//устанавливаем обработчик событий на каждую форму
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  //функция сброса ошибок в форме
  resetErrorElement() {
    const  inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    const buttonElement = this._formElement.querySelector(config.submitButtonSelector);

    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      this._toggleButtonState(inputList, buttonElement);
    });
  }
}


const formProfile = document.querySelector('.popup__content_theme_profile');
const formCard = document.querySelector('.popup__content_theme_elements');

export const profileFormValidator = new FormValidator(config, formProfile);
profileFormValidator.enableValidation(config);

export const cardFormValidator = new FormValidator(config, formCard);
cardFormValidator.enableValidation(config);

