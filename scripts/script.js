const initialCards = [
  {
      name: "Yosemite Valley",
      link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
      name: "Lake Louise",
      link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
      name: "Bald Mountains",
      link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
      name: "Latemar",
      link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
      name: "Vanois National Park",
      link: "https://code.s3.yandex.net/web-code/vanois.jpg"
  },
  {
      name: "Lago di Braies",
      link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

//wrappers
const popupProfile = document.querySelector('.js-popup-profile');
const profileForm = popupProfile.querySelector('.js-form');

const popupCard = document.querySelector('.js-popup-photo');
const cardForm = popupCard.querySelector('.js-form');

const gallery = document.querySelector('.js-gallery');

//buutons and DOM elements
const editBtn = document.querySelector('.js-edit-btn');
const profileFormCloseBtn = popupProfile.querySelector('.js-close-btn');

const addBtn = document.querySelector('.js-add-btn');
const cardFormCloseBtn = popupCard.querySelector('.js-close-btn');

//form data
const inputName = profileForm.querySelector('.js-input-name');
const inputJob = profileForm.querySelector('.js-input-job');

const inputTitle = cardForm.querySelector('.js-input-title');
const inputLink = cardForm.querySelector('.js-input-link');

//inputs
const userName = document.querySelector('.js-user-name');
const userJob = document.querySelector('.js-user-job');

const cardTitle = document.querySelector('.js-card-title');
const cardLink = document.querySelector('.js-card-link');




function togglePopup(element){
  element.classList.toggle('popup_visible');
}

function createCard(nameValue,linkValue, i){
  const cardTemplate = document.querySelector(".js-card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.js-card-title').textContent = nameValue;
  cardElement.querySelector('.js-card-img').style.backgroundImage = linkValue;
  cardElement.querySelector('.js-like-btn').addEventListener('click', function(ev){
    const target = ev.target;
    target.classList.toggle('card__like_active');
  });
  cardElement.querySelector('.js-del-btn').dataset.index = i;
  gallery.append(cardElement);
}

function renderGallery(arr,index){
  arr.forEach(card => {
    nameValue = card.name;
    linkValue = `url('${card.link}')`;
    i = index;
    createCard(nameValue,linkValue);
  });
}

function clearGallery(){
  gallery.innerHTML = '';
}

function setIndex(arr,i){
  arr.map(card => card.index = i);
}

function delCard(arr,index){
  arr.splice(index,1);
}
editBtn.addEventListener('click', function() {
  inputName.value = userName.textContent;
  inputJob.value = userJob.textContent;
  togglePopup(popupProfile);
});

addBtn.addEventListener('click',function(){
  inputTitle.value = '';
  inputLink.value = '';

  togglePopup(popupCard);
});

profileFormCloseBtn.addEventListener('click',function(){
  togglePopup(popupProfile);
});

cardFormCloseBtn.addEventListener('click',function(){
  togglePopup(popupCard);
});

profileForm.addEventListener('submit', function (ev) {
  ev.preventDefault();
  userName.textContent = inputName.value;
  userJob.textContent = inputJob.value;
  togglePopup(popupProfile);
});

cardForm.addEventListener('submit',function(ev){
  ev.preventDefault();
  const card = {};
  card.name = inputTitle.value;
  card.link = inputLink.value;
  initialCards.unshift(card);
  clearGallery();
  renderGallery(initialCards);
  togglePopup(popupCard);
  console.log(initialCards);
});

gallery.addEventListener('click',function(ev){
  const el = ev.target;
  if(!el.classList.contains('js-del-btn')){
    return;
  }
  const index = initialCards.indexOf(el.parentElement);
  //todo need to figure out the index of card
  delCard(initialCards,index);
  clearGallery();
  renderGallery(initialCards);
})
renderGallery(initialCards);
