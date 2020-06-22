export class FormValidator {
    constructor (_selectorsObject, _formElement) {
        this._selectorsObject = _selectorsObject;
        this._formElement = _formElement;
    }
    enableValidation() {
        const inputs = Array.from(this._formElement.querySelectorAll(this._selectorsObject.inputSelector));
        inputs.forEach((input) => {
            this._switchButtonStatus(inputs, this._formElement.querySelector(this._selectorsObject.submitButtonSelector));
            this._setEventListeners(input, inputs);
        })
    }
    clearErrors() {
        const inputs = Array.from(this._formElement.querySelectorAll(this._selectorsObject.inputSelector));
        inputs.forEach((input) => {
            this._hideErrorMessage(input);
        })
    }
    _toggleErrorBasedOnValidity(input) {
        if(input.validity.valid) {
            this._hideErrorMessage(input);
        } else {
            this._showErrorMessage(input);
        }
    }
    _showErrorMessage(input) {
        const errorElement = this._formElement.querySelector(`#${input.id}-error`);
        input.classList.add(this._selectorsObject.inputErrorClass);
        errorElement.textContent = input.validationMessage;
    }
    _hideErrorMessage(input) {
        const errorElement = this._formElement.querySelector(`#${input.id}-error`);
        input.classList.remove(this._selectorsObject.inputErrorClass);
        errorElement.textContent = '';
    }
    _hasInvalidInput(inputs) {
        return inputs.some((input) => {
            return !input.validity.valid;
        })
    }
    _switchButtonStatus(inputs, button) {
        if(this._hasInvalidInput(inputs)) {
            button.classList.add(this._selectorsObject.inactiveButtonClass)
        } else {
            button.classList.remove(this._selectorsObject.inactiveButtonClass);
        }
    }
    _setEventListeners(input, inputs) {
        input.addEventListener('input', () => {
            this._toggleErrorBasedOnValidity(input);
            this._switchButtonStatus(inputs, this._formElement.querySelector(this._selectorsObject.submitButtonSelector));
        })
    }
}