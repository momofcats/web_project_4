export default class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    this.setEventListeners();
    this._element.classList.add("popup_role_show");
    //document.addEventListener("keyup", this._handleEscClose);
  }
  close() {
    this._element.classList.remove("popup_role_show");
    this._element.classList.add("popup_role_fade-out");
    //document.removeEventListener("keyup", this._handleEscClose);
    this._removeEventListeners();
  }

  _handleEscClose(evt) {
    //that stores the logic for closing the popup by pressing the Esc key.
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClick(evt) {
    if (evt.target.classList.contains("popup_role_show")) {
      this.close();
    }

  }
  setEventListeners() {
     //that adds a click event listener to the close icon of the popup and the popup itself.
    this._element.addEventListener("click", (evt) => {
      if(evt.target.classList.contains("popup__btn-close") || evt.target.classList.contains("popup_role_show")) {
        this.close();
      }
    });
     document.addEventListener("keyup", this._handleEscClose);
    }


  _removeEventListeners() {
    document.removeEventListener("keyup", this._handleEscClose);
    this._element.removeEventListener("click", this.close);
  }
}
