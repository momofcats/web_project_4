// templates
const cardTemplate = document.querySelector('.js-card-template').content;

//wrappers

const popupProfile = document.querySelector('.js-popup-profile');
const profileForm = popupProfile.querySelector('.form');

const popupCard = document.querySelector('.js-popup-photo-form');
const cardForm = popupCard.querySelector('.form');

const gallery = document.querySelector('.gallery');

const popupPicture = document.querySelector('.js-popup-picture');

//buutons and DOM elements
const editBtn = document.querySelector('.media__btn');
const profileFormCloseBtn = popupProfile.querySelector('.popup__btn-close');

const addBtn = document.querySelector('.profile__btn');
const cardFormCloseBtn = popupCard.querySelector('.popup__btn-close');

const picturePopupCloseBtn = popupPicture.querySelector('.popup__btn-close');

//form data
const inputName = profileForm.querySelector('.js-input-name');
const inputJob = profileForm.querySelector('.js-input-job');

const inputTitle = cardForm.querySelector('.js-input-title');
const inputLink = cardForm.querySelector('.js-input-link');

//inputs
const userName = document.querySelector('.media__name');
const userJob = document.querySelector('.media__job');

//popup data
const popupImage = popupPicture.querySelector('.popup__image');
const popupTitle = popupPicture.querySelector('.popup__title');

let id = 0;

const initialCards = [
  {
    id: id++,
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    id: id++,
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    id: id++,
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    id: id++,
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    id: id++,
    name: "Vanois National Park",
    link: "https://code.s3.yandex.net/web-code/vanois.jpg",
  },
  {
    id: id++,
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

function createCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__img');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeBtn = cardElement.querySelector('.card__like');
  const cardDelBtn = cardElement.querySelector('.card__del');
  const cardInstance = cardElement.querySelector('.card');

  cardTitle.textContent = card.name;
  cardImage.style.backgroundImage = `url('${card.link}')`;
  cardDelBtn.dataset.id = card.id;

  cardLikeBtn.addEventListener('click', function (ev) {
    const target = ev.target;
    target.classList.toggle('card__like_active');
  });

  cardDelBtn.addEventListener('click', function () {
    cardInstance.remove();
  });

  cardImage.addEventListener('click', function () {
    popupImage.src = '';
    popupTitle.textContent = '';
    popupImage.src = card.link;
    popupImage.alt = card.name;
    popupTitle.textContent = card.name;
    togglePopup(popupPicture);
    animateFadeOut(popupPicture);
  });
  return cardElement;
}

function renderGallery(cards) {
  cards.forEach((card) => {
    gallery.prepend(createCard(card));
  });
}

editBtn.addEventListener('click', function () {
  inputName.value = userName.textContent;
  inputJob.value = userJob.textContent;
  togglePopup(popupProfile);
});

addBtn.addEventListener('click', function () {
  inputTitle.value = '';
  inputLink.value = '';
  togglePopup(popupCard);
});

profileFormCloseBtn.addEventListener('click', function () {
  togglePopup(popupProfile);
  animateFadeOut(popupProfile);
});

cardFormCloseBtn.addEventListener('click', function () {
  togglePopup(popupCard);
  animateFadeOut(popupCard);
});

profileForm.addEventListener('submit', function (ev) {
  ev.preventDefault();
  userName.textContent = inputName.value;
  userJob.textContent = inputJob.value;
  togglePopup(popupProfile);
});

cardForm.addEventListener('submit', function (ev) {
  ev.preventDefault();
  const card = {
    id: id++,
    name: inputTitle.value,
    link: inputLink.value,
  };
  const cardInstance = createCard(card);
  gallery.prepend(cardInstance);
  togglePopup(popupCard);
});

picturePopupCloseBtn.addEventListener('click', function () {
  togglePopup(popupPicture);
  animateFadeOut(popupPicture);
});

renderGallery(initialCards);




const formElement = document.querySelector('.form');
const fromInput = formElement.querySelector('.form__input');
const formError = formElement.querySelector(`#${formInput.id}-error`)
const showInputError = (element) => {
  element.classList.add('form__input_type_error');
};

const hideInputError = (element) => {
  element.classList.remove('form__input_type_error');
};

const isValid = () => {
  if(!fromInput.validity.valid){
    showInputError(fromInput);
  } else{
    hideInputError(fromInput);
  }
}

formElement.addEventListener('submit', function(evt) {
  evt.preventDefault;
});

fromInput.addEventListener('input', isValid);
