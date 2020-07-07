import FormValidator from "./components/FormValidator.js";
import Card from "./components/Card.js";
import Section from "./components/Section.js";
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
} from "./utils/constants.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";

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
    onSubmit: (formData) => {
      userInfo.setUserInfo(formData);
    },
  });
  editProfilePopup.open();
});

addBtn.addEventListener("click", () => {
  const addCardPopup = new PopupWithForm({
    popupSelector: ".js-popup-photo-form",
    onSubmit: (formData) => {
      const card = new Card(formData, cardTemplateSelector, () => {
        const imagePopup = new PopupWithImage(".js-popup-picture");
        imagePopup.open({ link: formData.link, name: formData.name });
      });
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  });
  addCardPopup.open();
});

// Render gallery
const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, cardTemplateSelector, () => {
        const imagePopup = new PopupWithImage(".js-popup-picture");
        imagePopup.open({ link: item.link, name: item.name });
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
