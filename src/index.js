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
import PopupWithConfirm from "./scripts/components/PopupWithConfirm";
import Api from "./scripts/components/Api";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-2",
  headers: {
    authorization: "2ea24103-3839-4671-8e47-57675e6fba9c",
    "Content-Type": "application/json",
  },
});

// for loading user info on the page

const userInfo = new UserInfo({
  userNameSelector: ".media__name",
  userJobSelector: ".media__job",
  userAvatarSelector: ".media__image",
});

api
  .getAppInfo()
  .then(([cards, userData]) => {
    const me = userData._id;
    const cardList = new Section(
      {
        items: cards,
        renderer: (data) => {
          data.isReadOnly = data.owner._id !== me;
          const card = new Card({
            data,
            templateSelector: cardTemplateSelector,
            handleCardClick: () => {
              imagePopup.open(data);
            },
            handleDelBtnClick: (card) => {
             const delCardPopup = new PopupWithForm({
                popupSelector: ".js-popup-del-card",
                onSubmit: () => {
                  api.delCard(card.id());
                  card.deleteCard();
                },
              });
              delCardPopup.open();
            },
          });
          const cardElement = card.generateCard();
          cardList.addItem(cardElement);
        },
      },
      ".gallery"
    );
    cardList.renderItems();
    userInfo.setUserInfo(userData);
    const addCardPopup = new PopupWithForm({
      popupSelector: ".js-popup-photo-form",
      onSubmit: (formData) => {
        formData.likes = [];
        api.postNewCard(formData).then((res) => {
          const card = new Card({
            data: formData,
            templateSelector: cardTemplateSelector,
            handleCardClick: (cardData) => {
              imagePopup.open(cardData);
            },
            handleDelBtnClick: (card) => {
              const delCardPopup = new PopupWithForm({
                popupSelector: ".js-popup-del-card",
                onSubmit: () => {
                  api.delCard(card.id());
                  card.deleteCard();
                },
              });
              delCardPopup.open();
            },
          });
          const cardElement = card.generateCard();
          cardList.addItem(cardElement);
        });
      },
    });
    addBtn.addEventListener("click", () => {
      addCardPopup.open();
    });
  })
  .catch(console.log);

// api
//   .getUserInfo()
//   .then((userData) => {
//     userInfo.setUserInfo(userData);
//     return userData;
//   })
//   .catch((err) => console.log(err))
//   .then((userData) => {
//     // Render gallery
//     const me = userData._id;
//     const delCardPopup = new PopupWithForm({
//       popupSelector: ".js-popup-del-card",
//       onSubmit: (card) => {
//         api.delCard(card.id());
//         card.deleteCard();
//       },
//     });
//     const cardList = new Section(
//       {
//         data: api.getInitialCards(),
//         renderer: (data) => {
//           data.isReadOnly = data.owner._id !== me;
//           const card = new Card({
//             data,
//             templateSelector: cardTemplateSelector,
//             handleCardClick: () => {
//               imagePopup.open(data);
//             },
//             handleDelBtnClick: () => {
//               // delCardPopup.setOnConfirm(() => {
//               //   api.delCard(card.id());
//               //   card.deleteCard();
//               //   delCardPopup.close();
//               // });
//               delCardPopup.open();
//             },
//           });
//           const cardElement = card.generateCard();
//           cardList.addItem(cardElement);
//         },
//       },
//       ".gallery"
//     );
//     cardList.renderItems();

//     const addCardPopup = new PopupWithForm({
//       popupSelector: ".js-popup-photo-form",
//       onSubmit: (formData) => {
//         formData.likes = [];
//         api.postNewCard(formData);
//         const card = new Card({
//           data: formData,
//           templateSelector: cardTemplateSelector,
//           handleCardClick: (cardData) => {
//             imagePopup.open(cardData);
//           },
//           handleDelBtnClick: () => {
//             delCardPopup.open();
//             // api.delCard(card.id());
//             // card.deleteCard();
//           },
//         });
//         const cardElement = card.generateCard();
//         cardList.addItem(cardElement);
//       },
//     });

//   addBtn.addEventListener("click", () => {
//     addCardPopup.open();
//   });
// });

// const addCardPopup = new PopupWithForm({
//   popupSelector: ".js-popup-photo-form",
//   onSubmit: (formData) => {
//     formData.likes = [];
//     api.postNewCard(formData);
//     const card = new Card({
//       data: formData,
//       templateSelector: cardTemplateSelector,
//       handleCardClick: (cardData) => {
//         imagePopup.open(cardData);
//       },
//       handleDelBtnClick: () => {
//         delCardPopup.open();
//         // api.delCard(card.id());
//         // card.deleteCard();
//       },
//     });
//     const cardElement = card.generateCard();
//     cardList.addItem(cardElement);
//   },
// });

// addBtn.addEventListener("click", () => {del
//   addCardPopup.open();
// });

const editProfilePopup = new PopupWithForm({
  popupSelector: ".js-popup-profile",
  onSubmit: (formData) => {
    userInfo.setUserInfo(formData);
    api.updateUserInfo(formData);
  },
});

const imagePopup = new PopupWithImage(".js-popup-picture");

editBtn.addEventListener("click", () => {
  const pageData = userInfo.getUserInfo();
  inputName.value = pageData.name;
  inputJob.value = pageData.about;
  editProfilePopup.open();
});

// Validate forms
const validatedProfileForm = new FormValidator(settings, profileForm);
const validatedCardForm = new FormValidator(settings, cardForm);
validatedProfileForm.enableValidation();
validatedCardForm.enableValidation();
