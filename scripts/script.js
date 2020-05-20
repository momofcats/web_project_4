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
const editBtn = document.querySelector('.js-edit-btn');
const form = document.querySelector(".js-form");
const closeBtn = popup.querySelector('.js-close-btn');
const userName = document.querySelector('.js-user-name');
const userJob = document.querySelector('.js-user-job');
const inputName = popup.querySelector('input[name=name]');
const inputJob = popup.querySelector('input[name=job]');
const gallery = document.querySelector(".js-gallery")
function togglePopup() {
  popup.classList.toggle('popup_visible');
}

editBtn.addEventListener('click', function () {
  inputName.value = userName.textContent;
  inputJob.value = userJob.textContent;
  togglePopup();
});

closeBtn.addEventListener('click', function () {
  inputName.value = '';
  inputJob.value = '';
  togglePopup();
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  userName.textContent = inputName.value;
  userJob.textContent = inputJob.value;
  togglePopup();
});

function addCard(nameValue,linkValue){
  const cardTemplate = document.querySelector(".js-card-template");
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".card__title js-card-title").textContent = nameValue;
  cardElement.querySelector(".js-card-img").setAttribute("style","linkValue");


}
