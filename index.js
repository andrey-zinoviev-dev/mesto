const userEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeWindow = document.querySelector('.popup__close');
const author = document.querySelector('.profile__heading');
const subtitle = document.querySelector('.profile__subtitle');
let authorPopup = document.querySelector('.popup__input_order_first');
let subtitlePopup = document.querySelector('.popup__input_order_second');
const submitUserChanges = document.querySelector('.popup__edit-button');
const editForm = document.querySelector('.popup__user-edit');
const initialCards = [
    {
        name: "Карачаевск",
        link: "./images/kirill-pershin-1088404-unsplash.jpg"
    },
    {
        name: "Гора Эльбрус",
        link: "./images/kirill-pershin-1404681-unsplash—copy.png"
    },
    {
        name: "Домбай",
        link: "./images/kirill-pershin-1404681-unsplash.png"
    },
    {
        name: "Ставрополь",
        link: "./images/4930361594912182.jpeg"
    },
    {
        name: "Домбай",
        link: "./images/thumb1130_vozd.jpg"
    },
    {
        name: "Волгоград",
        link: "./images/rm1920-2-mr.jpg"
    }
];

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

let cards = Array.from(document.querySelectorAll('.elements__element'));
let cardsNames = cards.map(card => {
    return card.querySelector('.elements__element-text');
})
let cardsLinks = cards.map(card => {
    return card.querySelector('.elements__element-photo');
})
cardsNames.forEach((el, index, array) => {
    array[index].textContent = initialCards[index].name;
})
cardsLinks.forEach((el, index, array) => {
    array[index].src = initialCards[index].link;
})
