const userEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeWindow = document.querySelector('.popup__close');
const author = document.querySelector('.profile__heading');
const subtitle = document.querySelector('.profile__subtitle');
let authorPopup = document.querySelector('.popup__input_order_first');
let subtitlePopup = document.querySelector('.popup__input_order_second');
const submitUserChanges = document.querySelector('.popup__edit-button');
const editForm = document.querySelector('.popup__user-edit');

function openPopup() {
    popup.classList.add('popup_opened');
    authorPopup.value = author.textContent;
    subtitlePopup.value = subtitle.textContent
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function formSubmit(event) {
    event.preventDefault();
    closePopup();
    author.textContent = authorPopup.value;
    subtitle.textContent = subtitlePopup.value;
}

function togglePopup() {
    if(popup.classList.contains('popup_opened')) {
        closePopup();
    } else {
        openPopup();
    }
}

userEditButton.addEventListener('click', togglePopup);
closeWindow.addEventListener('click', togglePopup);
editForm.addEventListener('submit', formSubmit);

