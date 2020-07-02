import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor (popupSelector, data) {
    super(popupSelector);
    this._link = data.link;
    this._alt = data.alt;
    this._name = data.name;
    this._image = this._element.querySelector(".popup__image");
    this._caption = this._element.querySelector(".popup__title");
  }
  open() {
    super.open();
    this._image.src = "";
    this._image.src = this._link;
    this._image.alt = this._alt;
    this._caption.textContent = this._name;
  }
}
