function enableValidation({ formSelector, ...rest }) {
  const forms = [...document.querySelectorAll(formSelector)];
  forms.forEach((form) => {
    form.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(form, rest);
  });
}

function setEventListeners(
  form,
  { inputSelector, submitButtonSelector, ...rest }
) {
  const submitBtn = form.querySelector(submitButtonSelector);
  const inputs = [...form.querySelectorAll(inputSelector)];
  toggleButtonState(inputs, submitBtn, rest);
  inputs.forEach((input) => {
    input.addEventListener("input", function (evt) {
      checkInputValidity(form, input, rest);
      toggleButtonState(inputs, submitBtn, rest);
    });
  });
}

function toggleButtonState(
  inputs,
  submitBtn,
  { inactiveButtonClass, ...rest }
) {
  if (hasInvalidInput(inputs, rest)) {
    submitBtn.classList.add(inactiveButtonClass);
  } else {
    submitBtn.classList.remove(inactiveButtonClass);
  }
}

function hasInvalidInput(inputs, rest) {
  return inputs.some((input) => {
    return !input.validity.valid;
  });
}

function checkInputValidity(form, input, rest) {
  if (!input.validity.valid) {
    showInputError(form, input, rest);
  } else {
    hideInputError(form, input, rest);
  }
}

function showInputError(form, input, { errorClass, inputErrorClass, ...rest }) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = input.validationMessage;
}

function hideInputError(form, input, { errorClass, inputErrorClass, ...rest }) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
}

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-btn",
  inactiveButtonClass: "form__submit-btn_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
});
