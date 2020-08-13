import Popup from "./Popup.js";
import { captionPopup, imgPopup } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(evt) {
    super.open();

    imgPopup.src = evt.target.src;
    imgPopup.alt = evt.target.alt;
    captionPopup.textContent = evt.target.alt;
  }
}