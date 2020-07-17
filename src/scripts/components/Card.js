export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
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
    this._card.querySelector(".card__likes").textContent = this._likes.length;
    this._setEventListeners();
    return this._card;
  }

  _handleLikeBtnClick(evt) {
    evt.target.classList.toggle("card__like_active");
  }

  _handleDelBtnClick() {
    this._card.remove();
  }

  _setEventListeners() {
    this._card.querySelector(".card__like").addEventListener("click", (evt) => {
      this._handleLikeBtnClick(evt);
    });
    this._card.querySelector(".card__del").addEventListener("click", (evt) => {
      this._handleDelBtnClick(evt);
    });
    this._card.querySelector(".card__img").addEventListener("click", () => {
      this._handlecardClick({ link: this._link, name: this._name });
    });
  }
}


