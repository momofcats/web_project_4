import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  open({ link, name }) {
    const image = this._element.querySelector(".popup__image");
    const title = this._element.querySelector(".popup__title");
    image.src = "";
    image.src = link;
    image.alt = name;
    title.textContent = name;
    super.open();
  }
}
