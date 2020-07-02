import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
      this._handleFormSubmit = handleFormSubmit;
      super(popupSelector);
    }
  _getInputValues() {
    this._inputList = this._element.querySelector(".form__input");
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._element.querySelector(".form").addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
  close() {
    super.close();
    this._element.querySelector(".form").reset();
  }
}
