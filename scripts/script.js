//wrappers

const popupProfile = document.querySelector(".js-popup-profile");
const profileForm = popupProfile.querySelector(".form");

const popupCard = document.querySelector(".js-popup-photo-form");
const cardForm = popupCard.querySelector(".form");

const gallery = document.querySelector(".gallery");

const popupPicture = document.querySelector(".js-popup-picture");

//buutons and DOM elements
const editBtn = document.querySelector(".media__btn");
const profileFormCloseBtn = popupProfile.querySelector(".popup__btn-close");

const addBtn = document.querySelector(".profile__btn");
const cardFormCloseBtn = popupCard.querySelector(".popup__btn-close");

const picturePopupCloseBtn = popupPicture.querySelector(".popup__btn-close");

//form data
const inputName = profileForm.querySelector(".js-input-name");
const inputJob = profileForm.querySelector(".js-input-job");

const inputTitle = cardForm.querySelector(".js-input-title");
const inputLink = cardForm.querySelector(".js-input-link");

//inputs
const userName = document.querySelector(".media__name");
const userJob = document.querySelector(".media__job");

//popup data
const popupImage = popupPicture.querySelector(".popup__image");
const popupTitle = popupPicture.querySelector(".popup__title");

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanois National Park",
    link: "https://code.s3.yandex.net/web-code/vanois.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

function togglePopup(element) {
  element.classList.toggle("popup_role_show");
}

function animateFadeOut(element) {
  element.classList.add("popup_role_fade-out");
}

function closePopupOnEsc(evt) {
  const openedPopup = document.querySelector(".popup_role_show");
  if (evt.key === "Escape") {
    togglePopup(openedPopup);
    animateFadeOut(openedPopup);
  }
  evt.target.removeEventListener("keydown", closePopupOnEsc);
}

function closePopupOnClick(evt) {
  const targetPopup = evt.target;
  if(!targetPopup.classList.contains("popup_role_show")) {
    return;
  }
  togglePopup(targetPopup);
  animateFadeOut(targetPopup);
}

editBtn.addEventListener("click", () => {
  inputName.value = userName.textContent;
  inputJob.value = userJob.textContent;
  togglePopup(popupProfile);
});

addBtn.addEventListener("click", () => {
  inputTitle.value = "";
  inputLink.value = "";
  togglePopup(popupCard);
});

profileFormCloseBtn.addEventListener("click", () => {
  togglePopup(popupProfile);
  animateFadeOut(popupProfile);
});

cardFormCloseBtn.addEventListener("click", () => {
  togglePopup(popupCard);
  animateFadeOut(popupCard);
});

profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  userName.textContent = inputName.value;
  userJob.textContent = inputJob.value;
  togglePopup(popupProfile);
});

cardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const card = {
    name: inputTitle.value,
    link: inputLink.value,
  };
  const cardInstance = new Card(card, ".js-card-template");
  const cardElement = cardInstance.generateCard();
  gallery.prepend(cardElement);
  togglePopup(popupCard);
});

picturePopupCloseBtn.addEventListener("click", () => {
  togglePopup(popupPicture);
  animateFadeOut(popupPicture);
});


class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(
      ".card__img"
    ).style.backgroundImage = `url('${this._link}')`;
    this._element.querySelector(".card__title").textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  _handleLikeBtnClick(evt) {
    const target = evt.target;
    target.classList.toggle("card__like_active");
  }

  _handleDelBtnClick(evt) {
    const cardElement = evt.target.parentNode;
    cardElement.remove(evt);
  }

  _handleOpenPopup() {
    popupImage.src = "";
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupTitle.textContent = this._name;
    togglePopup(popupPicture);
    animateFadeOut(popupPicture);
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like")
      .addEventListener("click", (evt) => {
        this._handleLikeBtnClick(evt);
      });
    this._element
    .querySelector(".card__del")
    .addEventListener("click", (evt) => {
      this._handleDelBtnClick(evt);
    });
    this._element
    .querySelector(".card__img")
    .addEventListener("click", () => {
      this._handleOpenPopup();
    });
  }
}

document.addEventListener("click", closePopupOnClick);
document.addEventListener("keydown", closePopupOnEsc);

initialCards.forEach((item) => {
  const card = new Card(item, ".js-card-template");
  const cardElement = card.generateCard();
  gallery.append(cardElement);
});


