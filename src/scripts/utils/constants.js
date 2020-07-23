//templates

export const cardTemplateSelector = ".js-card-template";

//data
export const initialCards = [
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

//buutons and DOM elements
const popupProfile = document.querySelector(".js-popup-profile");
export const profileForm = popupProfile.querySelector(".form");

const popupCard = document.querySelector(".js-popup-photo-form");
export const cardForm = popupCard.querySelector(".form");

export const editBtn = document.querySelector(".media__btn_size_sm");
export const addBtn = document.querySelector(".profile__btn");

//form data
export const inputName = profileForm.querySelector(".js-input-name");
export const inputJob = profileForm.querySelector(".js-input-job");

//form validation configurations
export const settings = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-btn",
  inactiveButtonClass: "form__submit-btn_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};
