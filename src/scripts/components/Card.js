import { data } from "autoprefixer";

export default class Card {
  constructor({
    data,
    templateSelector,
    handleCardClick,
    handleDelBtnClick,
    handleLikeBtnClick,
  }) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handlecardClick = handleCardClick;
    this._handleDelBtnClick = handleDelBtnClick;
    this._handleLikeBtnClick = handleLikeBtnClick;
    this._id = data._id;
    this._isReadOnly = data.isReadOnly;
    this._isLiked = data.isLiked;
  }

  getLikes() {
    return this._likes;
  }

  setLikes(likes) {
    this._likes = likes;
  }

  isLiked() {
    return this._isLiked;
  }

  setLiked(isLiked) {
    this._isLiked = isLiked;
  }

  id() {
    return this._id;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  render() {
    this._card.querySelector(
      ".card__img"
    ).style.backgroundImage = `url('${this._link}')`;
    this._card.querySelector(".card__title").textContent = this._name;
    this._card.querySelector(".card__likes").textContent = this._likes.length;

    const delEl = this._card.querySelector(".card__del");
    if (this._isReadOnly && delEl) {
      delEl.remove();
    }

    this._card
      .querySelector(".card__like")
      .classList.toggle("card__like_active", this._isLiked);
  }

  generateCard() {
    this._card = this._getTemplate();
    this.render();
    this._setEventListeners();
    return this._card;
  }

  unlikeCard() {
    this._card
      .querySelector(".card__like")
      .classList.remove("card__like_active");
  }

  deleteCard() {
    this._card.remove();
  }

  _setEventListeners() {
    this._card.querySelector(".card__like").addEventListener("click", () => {
      this._handleLikeBtnClick(this);
    });
    if (this._card.querySelector(".card__del")) {
      this._card.querySelector(".card__del").addEventListener("click", () => {
        this._handleDelBtnClick(this);
      });
    }

    this._card.querySelector(".card__img").addEventListener("click", () => {
      this._handlecardClick({ link: this._link, name: this._name });
    });
  }
}
