const userEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeWindow = document.querySelector('.popup__close');
const author = document.querySelector('.profile-info__heading');
const subtitle = document.querySelector('.profile-info__subtitle');
const authorPopup = document.querySelector('.user-edit__author');
const subtitlePopup = document.querySelector('.user-edit__subtitle');
const submitUserChanges = document.querySelector('.user-edit__button');
const editForm = document.querySelector('.user-edit');
userEditButton.addEventListener('click', function() {
    popup.classList.add('popup_opened');
    authorPopup.value = author.textContent;
    subtitlePopup.value = subtitle.textContent;
})
closeWindow.addEventListener('click', function() {
    popup.classList.remove('popup_opened');
})
// outerZone.addEventListener('click', function() {
//     popup.classList.remove('popup-window_opened');
// })
// function submitForm(event) {
//     event.preventDefault
// }
function formSubmit(event) {
    event.preventDefault();
    popup.classList.remove('popup_opened');
    author.textContent = authorPopup.value;
    subtitle.textContent = subtitlePopup.value;
    console.log(author.textContent);
    console.log(subtitle.textContent);

}
editForm.addEventListener('submit', formSubmit)

