import Popup from "./Popup.js";
import { imgPopupSelector, captionImgPopupSelector } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._imgPopup = this._popup.querySelector(imgPopupSelector);
    this._captionImg = this._popup.querySelector(captionImgPopupSelector);
  }

  open(data) {
    console.log(data)
    super.open();

    this._imgPopup.src = data.link;
    this._imgPopup.alt = data.name;
    this._captionImg.textContent = data.name;
  }
}