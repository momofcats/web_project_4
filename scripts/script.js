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
const form = document.querySelector(".js-form");
const userName = document.querySelector('.js-user-name');
const userJob = document.querySelector('.js-user-job');
const inputName = document.querySelector('.js-input-name');
const inputJob = document.querySelector('.js-input-job');
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
