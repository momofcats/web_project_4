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

// templates
const cardTemplate = document.querySelector(".js-card-template").content;

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

function createCard(card,index){
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.js-card-img');
  const cardTitle = cardElement.querySelector('.js-card-title');
  const cardLikeBtn = cardElement.querySelector('.js-like-btn');
  const cardDelBtn = cardElement.querySelector('.js-del-btn');

  cardTitle.textContent = card.name;

  cardImage.style.backgroundImage = `url('${card.link}')`;

  cardDelBtn.dataset.index = index;

  cardLikeBtn.addEventListener('click', function(ev){
    const target = ev.target;
    target.classList.toggle('card__like_active');
  });

  cardDelBtn.addEventListener('click',function(ev){
    const element = ev.target;
    element.parentElement.remove();
    initialCards.splice(index,1);
    console.log(initialCards);
  });
  return cardElement;
}


function renderGallery(cards){
  cards.forEach((card,index)=>{
    gallery.prepend(createCard(card,index));
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
  const card = {
    name: inputTitle.value,
    link: inputLink.value
  };
  initialCards.push(card);
  const index = initialCards.indexOf(card);
  const cardInstance = createCard(card,index);
  gallery.prepend(cardInstance);
  togglePopup(popupCard);
  console.log(initialCards);

});

renderGallery(initialCards);




