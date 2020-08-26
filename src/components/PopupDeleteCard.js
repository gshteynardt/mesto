import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__content');
  }

  setEventListeners(item) {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      if(this._handleFormSubmit) {
        this._handleFormSubmit();
      }
      super.close();
    });
  }

  setSubmitHandler(handler) {
    this._handleFormSubmit = handler;
  }
}