//popup data

const popupPicture = document.querySelector(".js-popup-picture");
const popupImage = popupPicture.querySelector(".popup__image");
const popupTitle = popupPicture.querySelector(".popup__title");


class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handlecardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._card.querySelector(
      ".card__img"
    ).style.backgroundImage = `url('${this._link}')`;
    this._card.querySelector(".card__title").textContent = this._name;
    this._setEventListeners();
    return this._card;
  }

  _handleLikeBtnClick(evt) {
    const target = evt.target;
    target.classList.toggle("card__like_active");
  }

  _handleDelBtnClick(evt) {
    const cardElement = evt.target.parentNode;
    cardElement.remove(evt);
  }

  // _handleOpenPopup() {
  //   popupImage.src = "";
  //   popupImage.src = this._link;
  //   popupImage.alt = this._name;
  //   popupTitle.textContent = this._name;
  //   togglePopup(popupPicture);
  //   animateFadeOut(popupPicture);
  // }

  _setEventListeners() {
    this._card.querySelector(".card__like").addEventListener("click", (evt) => {
      this._handleLikeBtnClick(evt);
    });
    this._card.querySelector(".card__del").addEventListener("click", (evt) => {
      this._handleDelBtnClick(evt);
    });
    // this._card.querySelector(".card__img").addEventListener("click", () => {
    //   this._handleOpenPopup();
    // });
  }
}

export { Card, popupPicture };
