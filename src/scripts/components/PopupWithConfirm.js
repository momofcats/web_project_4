import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._button = this._element.querySelector(".form__submit-btn");
  }

  setOnConfirm(onConfirm) {
    this._onConfirm = onConfirm;
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener("click", this._onConfirm);
  }
  _removeEventListeners() {
    super._removeEventListeners();
    this._button.removeEventListener("click", this._onConfirm);
  }

  close() {
    super.close();
    this._removeEventListeners();
  }
}
