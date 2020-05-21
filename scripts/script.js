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



const popup = document.querySelector('.js-popup');
const addPhotoPopup = document.querySelector('.js-add-photo');
const editBtn = document.querySelector('.js-edit-btn');
const form = document.querySelector(".js-form");
const closeBtn = popup.querySelector('.js-close-btn');
const closeBtnPhoto = addPhotoPopup.querySelector('.js-close-photo');
const userName = document.querySelector('.js-user-name');
const userJob = document.querySelector('.js-user-job');
const inputName = popup.querySelector('.js-input-name');
const inputJob = popup.querySelector('.js-input-job');
const gallery = document.querySelector('.js-gallery');
const addBtn = document.querySelector('.js-add-btn');


editBtn.addEventListener('click', function() {
  inputName.value = userName.textContent;
  inputJob.value = userJob.textContent;
  popup.classList.add('popup_visible');
});

addBtn.addEventListener('click',function(){
  addPhotoPopup.classList.add('popup_visible');
});

closeBtn.addEventListener('click', function () {
  inputName.value = '';
  inputJob.value = '';
  if (popup.classList.contains('popup_visible')){
    popup.classList.remove('popup_visible');
  }
});

closeBtnPhoto.addEventListener('click', function(){
  if (addPhotoPopup.classList.contains('popup_visible')){
    addPhotoPopup.classList.remove('popup_visible');
  }
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  userName.textContent = inputName.value;
  userJob.textContent = inputJob.value;
  togglePopup();
});

function addCard(nameValue,linkValue){
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
    addCard(nameValue,linkValue);
  });
}

renderGallery(initialCards);
