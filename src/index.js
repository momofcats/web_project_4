import "./pages/index.css";
import FormValidator from "./scripts/components/FormValidator";
import Card from "./scripts/components/Card";
import Section from "./scripts/components/Section";
import {
  cardTemplateSelector,
  initialCards,
  editBtn,
  addBtn,
  inputJob,
  inputName,
  settings,
  profileForm,
  cardForm,
} from "./scripts/utils/constants";
import UserInfo from "./scripts/components/UserInfo";
import PopupWithForm from "./scripts/components/PopupWithForm";
import PopupWithImage from "./scripts/components/PopupWithImage";

// for loading user info on the page

const avatar = document.querySelector(".media__image");
const name = document.querySelector(".media__name");
const about = document.querySelector(".media__job");

const userInfo = new UserInfo({
  userNameSelector: ".media__name",
  userJobSelector: ".media__job",
});

const editProfilePopup = new PopupWithForm({
  popupSelector: ".js-popup-profile",
  onSubmit: (formData) => {
    userInfo.setUserInfo(formData);
  },
});

const imagePopup = new PopupWithImage(".js-popup-picture");

editBtn.addEventListener("click", () => {
  const pageData = userInfo.getUserInfo();
  inputName.value = pageData.name;
  inputJob.value = pageData.job;
  editProfilePopup.open();
});

const addCardPopup = new PopupWithForm({
  popupSelector: ".js-popup-photo-form",
  onSubmit: (formData) => {
    const card = new Card(formData, cardTemplateSelector, (cardData) => {
      imagePopup.open(cardData);
    });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  },
});

addBtn.addEventListener("click", () => {
  addCardPopup.open();
});

// Render gallery
const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, cardTemplateSelector, (cardData) => {
        imagePopup.open(cardData);
      });
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  ".gallery"
);
cardList.renderItems();

// Validate forms
const validatedProfileForm = new FormValidator(settings, profileForm);
const validatedCardForm = new FormValidator(settings, cardForm);
validatedProfileForm.enableValidation();
validatedCardForm.enableValidation();

fetch("https://around.nomoreparties.co/v1/group-2/cards", {
  headers: {
    authorization: "2ea24103-3839-4671-8e47-57675e6fba9c"
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });

fetch("https://around.nomoreparties.co/v1/group-2/users/me", {
  headers: {
    authorization: "2ea24103-3839-4671-8e47-57675e6fba9c"
  }
})
  .then(res => res.json())
  .then((result) => {
    avatar.src = result.avatar;
    name.textContent = result.name;
    about.textContent = result.about;
  });
