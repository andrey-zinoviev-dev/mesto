const userEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeWindow = document.querySelector('.popup__close');
const author = document.querySelector('.profile__heading');
const subtitle = document.querySelector('.profile__subtitle');
let authorPopup = document.querySelector('.popup__input_order_first');
let subtitlePopup = document.querySelector('.popup__input_order_second');
const submitUserChanges = document.querySelector('.popup__edit-button');
const editForm = document.querySelector('.popup__user-edit');
const addCardButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_addCard');
const closeWindowAddCard = document.querySelector('.popup__close_type_addCard');
const addCardForm = document.querySelector('.popup__addCard-form');
let cardName = document.querySelector('.popup__input_place-name');
let cardPicture = document.querySelector('.popup__input_image-link');
const cardTemplate = document.querySelector('#card-container');
const cardsList = document.querySelector('.elements__list');
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
}

function closePopup(element) {
    element.classList.remove('popup_opened');
}

function openAddPopup() {
    popupAddCard.classList.add('popup_opened');
}

function formSubmit(event) {
    event.preventDefault();
    closePopup();
    author.textContent = authorPopup.value;
    subtitle.textContent = subtitlePopup.value;
}

function togglePopup(event) {
    let element = event.target.parentElement.parentElement.parentElement;
    if(element.classList.contains('popup_opened')) {
        closePopup(element);
    } else {
        openPopup();
        authorPopup.value = author.textContent;
        subtitlePopup.value = subtitle.textContent;
    }
}
function toggleAddPopup(event) {
    let element = event.target.parentElement.parentElement.parentElement;
    if(element.classList.contains('popup_opened')) {
        closePopup(element);
    } else {
        openAddPopup();
    }
}

userEditButton.addEventListener('click', togglePopup);
closeWindow.addEventListener('click', togglePopup);
editForm.addEventListener('submit', formSubmit);
addCardButton.addEventListener('click', toggleAddPopup);
closeWindowAddCard.addEventListener('click', toggleAddPopup);



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

function addCard(event) {
    event.preventDefault();
    const cardContainer = cardTemplate.content;
    const cardElement = cardContainer.cloneNode(true);
    cardElement.querySelector('.elements__element-photo').src = cardPicture.value;
    cardElement.querySelector('.elements__element-text').textContent = cardName.value;
    const likeTemplate = cardElement.querySelector('.elements__element-like');
    likeTemplate.addEventListener('click', function(event) {
        if(event.target.classList.contains('elements__element-like-sign_status_active')) {
            event.target.classList.remove('elements__element-like-sign_status_active');
            event.target.src = './images/like.svg';
        } else {
            event.target.classList.add('elements__element-like-sign_status_active');
            event.target.src = './images/like_active.svg';
        }
    })
    cardsList.prepend(cardElement);
    closePopup(event.target.parentElement.parentElement);
}

addCardForm.addEventListener('submit', addCard);

let likeButtons = document.querySelectorAll('.elements__element-like');
console.log(likeButtons);
likeButtons.forEach((el, index, array) => {
    array[index].addEventListener('click', function(event) {
        if(event.target.classList.contains('elements__element-like-sign_status_active')) {
            event.target.classList.remove('elements__element-like-sign_status_active');
            event.target.src = './images/like.svg'
        } else {
            event.target.classList.add('elements__element-like-sign_status_active');
            event.target.src = './images/like_active.svg';
        }
    })
})