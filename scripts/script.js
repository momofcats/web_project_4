
// templates
const cardTemplate = document.querySelector(".js-card-template").content;

//wrappers

const popupProfile = document.querySelector('.js-popup-profile');
const profileForm = popupProfile.querySelector('.js-form');

const popupCard = document.querySelector('.js-popup-photo-form');
const cardForm = popupCard.querySelector('.js-form');

const gallery = document.querySelector('.js-gallery');

const popupPicture = document.querySelector('.js-popup-picture');

//buutons and DOM elements
const editBtn = document.querySelector('.js-edit-btn');
const profileFormCloseBtn = popupProfile.querySelector('.js-close-btn');

const addBtn = document.querySelector('.js-add-btn');
const cardFormCloseBtn = popupCard.querySelector('.js-close-btn');

const picturePopupCloseBtn = popupPicture.querySelector('.js-close-btn');

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

//popup data
const popupImage = popupPicture.querySelector('.js-popup-image');
const popupTitle = popupPicture.querySelector('.js-popup-title');


let id = 0;

const initialCards = [
  {
      id: id++,
      name: "Yosemite Valley",
      link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
      id: id++,
      name: "Lake Louise",
      link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
      id: id++,
      name: "Bald Mountains",
      link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
      id: id++,
      name: "Latemar",
      link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
      id: id++,
      name: "Vanois National Park",
      link: "https://code.s3.yandex.net/web-code/vanois.jpg"
  },
  {
      id: id++,
      name: "Lago di Braies",
      link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];



function togglePopup(element){
  element.classList.toggle('popup_visible');
}


function toggleAnimation(element){
  element.classList.toggle('popup_fade-out');

}

function createCard(card){
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.js-card-img');
  const cardTitle = cardElement.querySelector('.js-card-title');
  const cardLikeBtn = cardElement.querySelector('.js-like-btn');
  const cardDelBtn = cardElement.querySelector('.js-del-btn');
  const cardInstance = cardElement.querySelector('.js-gallery-item');
  cardTitle.textContent = card.name;

  cardImage.style.backgroundImage = `url('${card.link}')`;

  cardDelBtn.dataset.id = card.id;

  cardLikeBtn.addEventListener('click', function(ev){
    const target = ev.target;
    target.classList.toggle('card__like_active');
  });

  cardDelBtn.addEventListener('click',function(ev){
    const element = ev.target;
    const identifier = parseInt(element.dataset.id,10);
    const index = initialCards.findIndex((card) => card.id === identifier);
    initialCards.splice(index,1);
    element.parentElement.remove();

  });
  cardInstance.addEventListener('click', function(){
    popupImage.src = card.link;
    popupTitle.textContent = card.name;
    togglePopup(popupPicture);
  })
  return cardElement;
}


function renderGallery(cards){
  cards.forEach((card)=>{
    gallery.prepend(createCard(card));
  });
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
  toggleAnimation(popupProfile);

});


cardFormCloseBtn.addEventListener('click',function(){
  togglePopup(popupCard);
  toggleAnimation(popupCard);
});


profileForm.addEventListener('submit', function (ev) {
  ev.preventDefault();
  userName.textContent = inputName.value;
  userJob.textContent = inputJob.value;
  togglePopup(popupProfile);
});

cardForm.addEventListener('submit',function(ev){
  ev.preventDefault();
  const card = {
    id: id++,
    name: inputTitle.value,
    link: inputLink.value
  };
  initialCards.push(card);
  const cardInstance = createCard(card);
  gallery.prepend(cardInstance);
  togglePopup(popupCard);
  console.log(initialCards);

});

picturePopupCloseBtn.addEventListener('click', function(){
  togglePopup(popupPicture);
  toggleAnimation(popupPicture);
})



renderGallery(initialCards);




