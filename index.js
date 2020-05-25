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

//фкнция открытия модального окна
function openPopupElement(element) {
    element.classList.add('popup_opened');
}
//функция закрытия модального окна
function closePopup(element) {
    element.classList.remove('popup_opened');
}

function formSubmit(event) {
    event.preventDefault();
    closePopup(event.target.closest('.popup'));
    author.textContent = authorPopup.value;
    subtitle.textContent = subtitlePopup.value;
}
//функция перменного открытия и закрытия модального окна на основе существования класса
function togglePopup(event) {
    let element = event.target.parentElement.parentElement.parentElement;
    if(element.classList.contains('popup_opened')) {
        closePopup(element);
    } else {
        openPopupElement(popup);
        authorPopup.value = author.textContent;
        subtitlePopup.value = subtitle.textContent;
    }
}
//функция попеременного котрытия и закрытия модального окна добавления новой карточки
function toggleAddPopup(event) {
    console.log(event);
    let element = event.target.parentElement.parentElement.parentElement;
    if(element.classList.contains('popup_opened')) {
        closePopup(element);
    } else {
        openPopupElement(popupAddCard);
    }
}
//загрузка начальных карточек через массив
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
//функция добавки новой карточки
function addCard(event) {
    event.preventDefault();
    const cardContainer = cardTemplate.content;
    const cardElement = cardContainer.cloneNode(true);
    cardElement.querySelector('.elements__element-photo').src = cardPicture.value;
    cardElement.querySelector('.elements__element-text').textContent = cardName.value;
    const likeTemplate = cardElement.querySelector('.elements__element-like');
    likeTemplate.addEventListener('click', function(event) {
        if(event.target.classList.contains('elements__element-like-sign_status_active')) {
            likeActive(event);
        } else {
            likeUnactive(event);
        }
    })
    const deleteTemplate = cardElement.querySelector('.elements__element-delete-sign');
    deleteTemplate.addEventListener('click', function(event) {
        event.target.parentElement.classList.add('elements__element_status_deleted');
    })
    cardElement.querySelector('.elements__element-photo').addEventListener('click', function(event) {
        zoomImage(event);
        popupImageCloseSign.addEventListener('click', toggleImagePopup);
    })
    cardsList.prepend(cardElement);
    closePopup(event.target.closest('.popup_addCard'));
    clearForm(cardName, cardPicture);
}

//определение переменных картинок и текста карточек
let cardsImages = document.querySelectorAll('.elements__element-photo');
const popupImageWindow = document.querySelector('.popup_picture');
const popupPicture = document.querySelector('.popup__image');
const popupPictureText = document.querySelector('.popup__image-text');
const popupImageCloseSign = document.querySelector('.popup__close_type_open-image');
//функция попеременного открытия и закрытия модального окна с увеличенными картинками
function toggleImagePopup(event) {
    let element = event.target.closest('.popup_picture');
    if(element.classList.contains('popup_opened')) {
        closePopup(element);
    } else {
        openPopupElement(popupImageWindow);
    }
}
//функция определения изменения картинки для лайков
//функия для активации лайка
function likeActive(element) {
    element.target.classList.remove('elements__element-like-sign_status_active');
    element.target.src = './images/like.svg';
}
//функция деактивации лайка
function likeUnactive(element) {
    element.target.classList.add('elements__element-like-sign_status_active');
    element.target.src = './images/like_active.svg';
}
//функция увеличения картинки по клику
function zoomImage(element) {
    let imageLink;
    let imageName;
    console.log(element);
    imageLink = element.target.src;
    imageName = element.target.nextElementSibling.children[0].textContent;
    popupPicture.src = imageLink;
    popupPictureText.textContent = imageName;
    openPopupElement(popupImageWindow);
    popupImageCloseSign.addEventListener('click', toggleImagePopup);
}
//фукнция очистки форм
function clearForm(input1, input2) {
    input1.value = '';
    input2.value = '';
}

//определение кнопок удаления карточек
let deleteButtons = document.querySelectorAll('.elements__element-delete-sign');

//вызовы модальных окон
userEditButton.addEventListener('click', togglePopup);
closeWindow.addEventListener('click', togglePopup);
editForm.addEventListener('submit', formSubmit);
addCardButton.addEventListener('click', toggleAddPopup);
closeWindowAddCard.addEventListener('click', toggleAddPopup);
addCardForm.addEventListener('submit', addCard);

//применение функции открытия картинок карточек через массив
cardsImages.forEach((el, index, array) => {
    array[index].addEventListener('click', zoomImage)
})

//вызов функции удаления карточек при клике на картинку удаления через массив
deleteButtons.forEach((el, index, array) => {
    array[index].addEventListener('click', function(event) {
        event.target.parentElement.classList.add('elements__element_status_deleted');
    })
})
//вызов функции активации-деактивации лайков
let likeButtons = document.querySelectorAll('.elements__element-like');
likeButtons.forEach((el, index, array) => {
    array[index].addEventListener('click', function(event) {
        if(event.target.classList.contains('elements__element-like-sign_status_active')) {
            likeActive(event);
        } else {
            likeUnactive(event);
        }
    })
})

