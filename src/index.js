import "./pages/index.css";
import FormValidator from "./scripts/components/FormValidator";
import Card from "./scripts/components/Card";
import Section from "./scripts/components/Section";
import {
  cardTemplateSelector,
  editBtn,
  addBtn,
  changeAvatar,
  inputJob,
  inputName,
  settings,
  profileForm,
  cardForm,
  avatarForm,
} from "./scripts/utils/constants";
import UserInfo from "./scripts/components/UserInfo";
import PopupWithForm from "./scripts/components/PopupWithForm";
import PopupWithImage from "./scripts/components/PopupWithImage";
import Api from "./scripts/components/Api";
import { data } from "autoprefixer";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-2",
  headers: {
    authorization: "2ea24103-3839-4671-8e47-57675e6fba9c",
    "Content-Type": "application/json",
  },
});



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
          data.isLiked = data.likes.some((user) => user._id === me);
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
                  api
                    .delCard(card.id())
                    .then((res) => {
                      card.deleteCard();
                    })
                    .catch(console.log);
                },
              });
              delCardPopup.open();
            },
            handleLikeBtnClick: (card) => {
              if (!card.isLiked()) {
                api
                  .addLike(card.id())
                  .then((res) => {
                    card.setLiked(res.likes.some((user) => user._id === me));
                    card.setLikes(res.likes);
                    card.render();
                  })
                  .catch(console.log);
              }
              else {
                api.removeLike(card.id()).then((res) => {
                  card.setLiked(res.likes.some((user) => user._id === me));
                  card.setLikes(res.likes);
                  card.render();
                })
                .catch(console.log);
              }

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
        addCardPopup.onload(true, "Create");
        api
          .postNewCard(formData)
          .then((res) => {
            const card = new Card({
              data: res,
              templateSelector: cardTemplateSelector,
              handleCardClick: (cardData) => {
                imagePopup.open(cardData);
              },
              handleDelBtnClick: (card) => {
                const delCardPopup = new PopupWithForm({
                  popupSelector: ".js-popup-del-card",
                  onSubmit: () => {
                    api
                      .delCard(card.id())
                      .then((res) => {
                        card.deleteCard();
                      })
                      .catch(console.log);
                  },
                });
                delCardPopup.open();
              },
              handleLikeBtnClick: (card) => {
                if (!card.isLiked()) {
                  api
                    .addLike(card.id())
                    .then((res) => {
                      card.setLiked(res.likes.some((user) => user._id === me));
                      card.setLikes(res.likes);
                      card.render();
                    })
                    .catch(console.log);
                }
                else {
                  api.removeLike(card.id()).then((res) => {
                    card.setLiked(res.likes.some((user) => user._id === me));
                    card.setLikes(res.likes);
                    card.render();
                  })
                  .catch(console.log);
                }
              },
            });
            card.setLiked(false);
            const cardElement = card.generateCard();
            cardList.addItem(cardElement);
          })
          .catch(console.log)
          .finally(() => {
            addCardPopup.onload(false, "Create");
          });
      },
    });
    addBtn.addEventListener("click", () => {
      addCardPopup.open();
    });
  })
  .catch(console.log);

const editProfilePopup = new PopupWithForm({
  popupSelector: ".js-popup-profile",
  onSubmit: (formData) => {
    editProfilePopup.onload(true, "Save");
    api
      .updateUserInfo(formData)
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .catch(console.log)
      .finally(() => {
        editProfilePopup.onload(false, "Save");
      });
  },
});

const changeAvatarPopup = new PopupWithForm({
  popupSelector: ".js-popup-change-avatar",
  onSubmit: (formData) => {
    changeAvatarPopup.onload(true, "Save");
    api
      .updateAvatar(formData)
      .then((res) => {
        userInfo.setUserInfo({ avatar: res.avatar });
      })
      .catch(console.log)
      .finally(() => {
        changeAvatarPopup.onload(false, "Save");
      });
  },
});

const imagePopup = new PopupWithImage(".js-popup-picture");

editBtn.addEventListener("click", () => {
  const pageData = userInfo.getUserInfo();
  inputName.value = pageData.name;
  inputJob.value = pageData.about;
  editProfilePopup.open();
});

changeAvatar.addEventListener("click", () => {
  changeAvatarPopup.open();
});

// Validate forms
const validatedProfileForm = new FormValidator(settings, profileForm);
const validatedCardForm = new FormValidator(settings, cardForm);
const validatedAvatarForm = new FormValidator(settings, avatarForm);
validatedProfileForm.enableValidation();
validatedCardForm.enableValidation();
validatedAvatarForm.enableValidation();
