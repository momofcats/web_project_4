//templates
export const cardTemplateSelector = ".js-card-template";

//buutons and DOM elements
const popupProfile = document.querySelector(".js-popup-profile");
export const profileForm = popupProfile.querySelector(".form");

const popupCard = document.querySelector(".js-popup-photo-form");
export const cardForm = popupCard.querySelector(".form");

const popupAvatar = document.querySelector(".js-popup-change-avatar");
export const avatarForm = popupAvatar.querySelector(".form");

export const editBtn = document.querySelector(".media__btn_size_sm");
export const addBtn = document.querySelector(".profile__btn");
export const changeAvatar = document.querySelector(".media__btn_size_lg")

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
