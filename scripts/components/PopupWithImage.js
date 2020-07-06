import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._image = this._element.querySelector(".popup__image");
    this._caption = this._element.querySelector(".popup__title");
  }
  open({link, name}) {
    super.open();
    this._image.src = "";
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
  }
}
