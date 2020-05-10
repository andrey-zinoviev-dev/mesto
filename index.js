const userEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeWindow = document.querySelector('.popup__close');
const author = document.querySelector('.profile__heading');
const subtitle = document.querySelector('.profile__subtitle');
const authorPopup = document.querySelector('.popup__input_order_first');
const subtitlePopup = document.querySelector('.popup__input_order_second');
const submitUserChanges = document.querySelector('.popup__edit-button');
const editForm = document.querySelector('.popup__user-edit');
userEditButton.addEventListener('click', function() {
    popup.classList.add('popup_opened');
    authorPopup.value = author.textContent;
    subtitlePopup.value = subtitle.textContent;
})
function closePopup() {
    popup.classList.remove('popup_opened');
}
closeWindow.addEventListener('click', closePopup);

function formSubmit(event) {
    event.preventDefault();
    closePopup();
    author.textContent = authorPopup.value;
    subtitle.textContent = subtitlePopup.value;
}
editForm.addEventListener('submit', formSubmit)

