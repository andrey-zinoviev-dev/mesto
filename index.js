let userEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeWindow = document.querySelector('.popup__close');
let author = document.querySelector('.profile-info__heading');
let subtitle = document.querySelector('.profile-info__subtitle');
let authorPopup = document.querySelector('.user-edit__author');
let subtitlePopup = document.querySelector('.user-edit__subtitle');
let submitUserChanges = document.querySelector('.user-edit__button');
let editForm = document.querySelector('.user-edit');
let data;
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
    popup.classList.remove('popup-window_opened');
    author.textContent = authorPopup.value;
    subtitle.textContent = subtitlePopup.value;
    console.log(author.textContent);
    console.log(subtitle.textContent);

}
editForm.addEventListener('submit', formSubmit)

