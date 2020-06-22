class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formElement = formElement;
  }

  _hasInvalidInput(inputs) {
    return inputs.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState(inputs, submitBtn) {
    if (this._hasInvalidInput(inputs)) {
      submitBtn.classList.add(this._inactiveButtonClass);
      submitBtn.setAttribute("disabled", "");
    } else {
      submitBtn.classList.remove(this._inactiveButtonClass);
      submitBtn.removeAttribute("disabled");
    }
  }

  _showInputError(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = input.validationMessage;
  }

  _hideInputError(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _setEventListeners() {
    const inputs = [...this._formElement.querySelectorAll(this._inputSelector)];
    const submitBtn = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._toggleButtonState(inputs, submitBtn);
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState(inputs, submitBtn);
      });
    });
  }
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
