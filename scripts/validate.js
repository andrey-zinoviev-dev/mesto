//валидность форм из попапов
function toggleErrorBasedOnValidity(form, input, inputErrorClass) {
    if(input.validity.valid) {
        hideError(form, input, inputErrorClass);
    } else {
        showError(form, input, inputErrorClass);
    }
}

//фукнция показа ошибки одного инпута в форме
function showError(formElement, input, inputErrorClass) {
    const errorElement = formElement.querySelector(`#${input.id}-error`);
    input.classList.add(inputErrorClass);
    errorElement.textContent = input.validationMessage;
}
//фукнция скрытия ошибки одного инпута в форме
function hideError(formElement, input, inputErrorClass) {
    const errorElement = formElement.querySelector(`#${input.id}-error`);
    input.classList.remove(inputErrorClass);
    errorElement.textContent = '';
}
//функция добавления проверки валидности для каждого инпута
function setEventListeners(form, inputs, formButton, buttonErrorClass, inputErrorClass) {
    inputs.forEach((input) => {
        input.addEventListener('input', () => {
            toggleErrorBasedOnValidity(form, input, inputErrorClass);
            switchButtonStatus(inputs, formButton, buttonErrorClass);
        })
    })
}
//функция проверки всех инпутов на сущестование хотя бы одного невалидного инпута
function hasInvalidInput(inputs) {
    return inputs.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}
//функция проверки статуса кнопки в зависимости от валидности инпутов
function switchButtonStatus(inputs, button, buttonErrorClass) {
    if(hasInvalidInput(inputs)) {
        button.classList.add(buttonErrorClass);
        button.disabled = true;
    } else {
        button.classList.remove(buttonErrorClass);
        button.disabled = false;
    }
}
//фукнция включения проверки валидности инпутов для всех форм документа
function enableValidationObj(object) {
    const forms = findForms(object.formSelector);
    forms.forEach((form) => {
        const inputs = Array.from(form.querySelectorAll(object.inputSelector));
        const button = form.querySelector(object.submitButtonSelector);
        switchButtonStatus(inputs, button, object.inactiveButtonClass);
        setEventListeners(form, inputs, button, object.inactiveButtonClass, object.inputErrorClass)
    })
}

//функция очистки ошибок при валидации
function clearErrorMessages(formElement, inputElement, inputErrorClass) {
    const forms = findForms(formElement);
    forms.forEach((form) => {
        const inputs = findInputs(form, inputElement);
        inputs.forEach((input) => {
            hideError(form, input, inputErrorClass)
        })
    })
}

//функция поиска форм в попапе
function findForms(formElementSelector) {
    return Array.from(document.querySelectorAll(formElementSelector));
}

//функция поиска инпутов
function findInputs(form, inputElementSelector) {
    return Array.from(form.querySelectorAll(inputElementSelector));
}
