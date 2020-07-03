export default class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
    this.setEventListeners();
    this._handleClose = this.close.bind(this);
  }
  open() {
    this._element.classList.add("popup_role_show");
    document.addEventListener("keyup", this._handleEscClose);
  }
  close() {
    this._element.classList.remove("popup_role_show");
    this._element.classList.add("popup_role_fade-out");
    document.removeEventListeners("keyup", this._handleEscClose);
  }

  _handleEscClose(evt) {
    //that stores the logic for closing the popup by pressing the Esc key.
    if (evt.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
     //that adds a click event listener to the close icon of the popup and the popup itself.
    this._element.querySelector(".popup__btn-close").addEventListener("click", () => this.close());
    this._element.addEventListener("click", () => this.close());
  }
}
