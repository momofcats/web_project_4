import FormValidator from "./components/FormValidator.js";
import {
  Card,
  popupPicture,
  togglePopup,
  animateFadeOut,
} from "./components/Card.js";
import Section from "./components/Section.js";
import { cardTemplateSelector, initialCards } from "./utils/constants.js";
import Popup from "./components/Popup.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithForm from "./components/PopupWithForm.js";

//wrappers

const popupProfile = document.querySelector(".js-popup-profile");
const profileForm = popupProfile.querySelector(".form");

const popupCard = document.querySelector(".js-popup-photo-form");
const cardForm = popupCard.querySelector(".form");

//buutons and DOM elements
const editBtn = document.querySelector(".media__btn");

const addBtn = document.querySelector(".profile__btn");

const picturePopupCloseBtn = popupPicture.querySelector(".popup__btn-close");

//form data
const inputName = profileForm.querySelector(".js-input-name");
const inputJob = profileForm.querySelector(".js-input-job");

const inputTitle = cardForm.querySelector(".js-input-title");
const inputLink = cardForm.querySelector(".js-input-link");

//inputs
const userName = document.querySelector(".media__name");
const userJob = document.querySelector(".media__job");

const settings = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-btn",
  inactiveButtonClass: "form__submit-btn_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

//open popup form
editBtn.addEventListener("click", () => {
  const userInfo = new UserInfo({
    userNameSelector: ".media__name",
    userJobSelector: ".media__job",
  });
  const pageData = userInfo.getUserInfo();
  inputName.value = pageData.name;
  inputJob.value = pageData.job;

  const editProfilePopup = new PopupWithForm({
    popupSelector: ".js-popup-profile",
    handleFormSubmit: (formData) => {
      userInfo.setUserInfo(formData);
    },
  });
  editProfilePopup.open();
});

addBtn.addEventListener("click", () => {
  inputTitle.value = "";
  inputLink.value = "";
  const addCardPopup = new PopupWithForm({
    popupSelector: ".js-popup-photo-form",
    handleFormSubmit: (formData) => {
      //create instance of card
    },
  });
  addCardPopup.open();
});

// profileForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   userName.textContent = inputName.value;
//   userJob.textContent = inputJob.value;
//   togglePopup(popupProfile);
// });

cardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const card = {
    name: inputTitle.value,
    link: inputLink.value,
  };
  renderCard(card);
  togglePopup(popupCard);
});

// document.addEventListener("click", closePopupOnClick);
//document.addEventListener("keydown", closePopupOnEsc);

// Render gallery
const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, cardTemplateSelector);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  ".gallery"
);
cardList.renderItems();

// initialCards.forEach((item) => {
//   renderCard(item);
// });

// Validate forms

const validatedProfileForm = new FormValidator(settings, profileForm);
const validatedCardForm = new FormValidator(settings, cardForm);
validatedProfileForm.enableValidation();
validatedCardForm.enableValidation();
