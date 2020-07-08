import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open({ link, name }) {
    this._element.querySelector(".popup__image").src = "";
    this._element.querySelector(".popup__image").src = link;
    this._element.querySelector(".popup__image").alt = name;
    this._element.querySelector(".popup__title").textContent = name;
    super.open();
  }
}
