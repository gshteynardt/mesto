import Popup from "./Popup.js";
import { imgPopupSelector, captionImgPopupSelector } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._imgPopup = this._popup.querySelector(imgPopupSelector);
    this._captionImg = this._popup.querySelector(captionImgPopupSelector);
  }

  open(evt) {
    super.open();

    this._imgPopup.src = evt.target.src;
    this._imgPopup.alt = evt.target.alt;
    this._captionImg.textContent = evt.target.alt;
  }
}