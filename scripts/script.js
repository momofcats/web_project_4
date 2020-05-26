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


const page = document.querySelector('.js-page');
const popupProfile = document.querySelector('.js-popup-profile');
const popupPhoto = document.querySelector('.js-popup-photo');
const editBtn = document.querySelector('.js-edit-btn');
const profileForm = document.querySelector(".js-profile-form");
const cardForm = document.querySelector('.js-card-form');
const userName = document.querySelector('.js-user-name');
const userJob = document.querySelector('.js-user-job');
const cardTitle = document.querySelector('.js-card-title');
const cardLink = document.querySelector('.js-card-link');
const inputName = profileForm.querySelector('.js-input-name');
const inputJob = profileForm.querySelector('.js-input-job');
const inputTitle = cardForm.querySelector('.js-input-title');
const inputLink = cardForm.querySelector('.js-input-link');
const gallery = document.querySelector('.js-gallery');
const addBtn = document.querySelector('.js-add-btn');
const delBtn = document.querySelector('.js-del-btn');

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

  togglePopup(popupPhoto);
});

page.addEventListener('click',function(ev){
  const target = ev.target;
  if(!target.classList.contains('js-close-btn')){
    return;
  }
  popupProfile.classList.contains('popup_visible') ? togglePopup(popupProfile) : togglePopup(popupPhoto);

})

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
  togglePopup(popupPhoto);
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
