const popup = document.querySelector('.js-popup');
const editBtn = document.querySelector('.js-edit-btn');
const form = document.querySelector(".js-form");
const closeBtn = popup.querySelector('.js-close-btn');
const userName = document.querySelector('.js-user-name');
const userJob = document.querySelector('.js-user-job');
const inputName = popup.querySelector('.js-input-name');
const inputJob = popup.querySelector('.js-input-job');

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
