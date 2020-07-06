import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, onSubmit }) {
    super(popupSelector);
    this._onSubmit = onSubmit;
    this._handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(ev) {
    ev.preventDefault();
    this._onSubmit(this._getInputValues());
    this.close();
  }

  _getInputValues() {
    this._inputList = this._element.querySelectorAll(".form__input");
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._element
      .querySelector(".form")
      .addEventListener("submit", this._handleSubmit);
  }
  _removeEventListeners() {
    this._element
      .querySelector(".form")
      .removeEventListener("submit", this._handleSubmit);
  }

  close() {
    super.close();
    this._removeEventListeners();
    this._element.querySelector(".form").reset();
  }
}
