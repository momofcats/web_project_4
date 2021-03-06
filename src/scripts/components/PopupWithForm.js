import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, onSubmit }) {
    super(popupSelector);
    this._form = this._element.querySelector(".form");
    this._formButton = this._form.querySelector(".form__submit-btn");
    this._onSubmit = onSubmit;
    this._handleSubmit = this.handleSubmit.bind(this);
  }

  setOnSubmit(onSubmit) {
    this._onSubmit = onSubmit;
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this._onSubmit(this._getInputValues());
    this.close();
  }

  _getInputValues() {
    const dataFromForm = new FormData(this._form);
    this._formValues = Object.fromEntries(dataFromForm);
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleSubmit);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._form.removeEventListener("submit", this._handleSubmit);
  }

  close() {
    super.close();
    this._removeEventListeners();
    this._element.querySelector(".form").reset();
  }

  onload(isLoading) {
    if(isLoading) {
      this._formButton.textContent = "Saving...";
    }
    else {
      this._formButton.textContent = this._formButton.dataset.text;
    }
  }
}
