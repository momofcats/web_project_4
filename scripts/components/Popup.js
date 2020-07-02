export default class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
    this.setEventListeners();
    this._handleClose = this.close.bind(this);
  }
  open() {
    this._element.classList.add("popup_role_show");
  }
  close() {
    this._element.classList.remove("popup_role_show");
    this._animateFadeout();
  }
  _animateFadeout() {
    this._element.classList.add("popup_role_fade-out");
  }
  _handleEscClose(evt) {
    //that stores the logic for closing the popup by pressing the Esc key.
    if (evt.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
     //that adds a click event listener to the close icon of the popup.
    this._element.querySelector(".popup__btn-close").addEventListener("click", () => this.close());
  }
}
