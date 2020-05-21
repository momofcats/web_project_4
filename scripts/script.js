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


function togglePopup(element){
  element.classList.toggle('popup_visible');
}

editBtn.addEventListener('click', function() {
  inputName.value = userName.textContent;
  inputJob.value = userJob.textContent;
  togglePopup(popupProfile);
});

addBtn.addEventListener('click',function(){
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
  renderGallery(initialCards);
  togglePopup(popupPhoto);
  console.log(initialCards);
})

function createCard(nameValue,linkValue){
  const cardTemplate = document.querySelector(".js-card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.js-card-title').textContent = nameValue;
  cardElement.querySelector('.js-card-img').style.backgroundImage = linkValue;
  gallery.append(cardElement);
}


function renderGallery(arr){
  arr.forEach(card => {
    nameValue = card.name;
    linkValue = `url('${card.link}')`;
    createCard(nameValue,linkValue);
  });
}

renderGallery(initialCards);
