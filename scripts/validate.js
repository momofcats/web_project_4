function showInputError(form, input, { errorClass, inputErrorClass }) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = input.validationMessage;
}

function hideInputError(form, input, { errorClass, inputErrorClass }) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
}

function checkInputValidity(form, input, rest) {
  if (!input.validity.valid) {
    showInputError(form, input, rest);
  } else {
    hideInputError(form, input, rest);
  }
}

function hasInvalidInput(inputs) {
  return inputs.some((input) => {
    return !input.validity.valid;
  });
}

function toggleButtonState(
  inputs,
  submitBtn,
  { inactiveButtonClass, ...rest }
) {
  if (hasInvalidInput(inputs, rest)) {
    submitBtn.classList.add(inactiveButtonClass);
    submitBtn.setAttribute("disabled","");
  } else {
    submitBtn.classList.remove(inactiveButtonClass);
    submitBtn.removeAttribute("disabled");
  }
}

function setEventListeners(
  form,
  { inputSelector, submitButtonSelector, ...rest }
) {
  const submitBtn = form.querySelector(submitButtonSelector);
  const inputs = [...form.querySelectorAll(inputSelector)];
  toggleButtonState(inputs, submitBtn, rest);
  inputs.forEach((input) => {
    input.addEventListener("input", function() {
      checkInputValidity(form, input, rest);
      toggleButtonState(inputs, submitBtn, rest);
    });
  });
}

function enableValidation({ formSelector, ...rest }) {
  const forms = [...document.querySelectorAll(formSelector)];
  forms.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, rest);
  });
}

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-btn",
  inactiveButtonClass: "form__submit-btn_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
});
