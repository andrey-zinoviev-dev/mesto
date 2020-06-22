const userEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeWindow = document.querySelector('.popup__close');
const author = document.querySelector('.profile__heading');
const subtitle = document.querySelector('.profile__subtitle');
const authorPopup = document.querySelector('.popup__input_order_first');
const subtitlePopup = document.querySelector('.popup__input_order_second');
const editForm = document.querySelector('.popup__form_type_user-edit');
const addCardButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_addCard');
const closeWindowAddCard = document.querySelector('.popup__close_type_addCard');
const addCardForm = document.querySelector('.popup__form_type_addCard-form');
const cardName = document.querySelector('.popup__input_place-name');
const cardPicture = document.querySelector('.popup__input_image-link');
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

const selectorsObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__edit-button',
    inactiveButtonClass: 'popup__edit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: '.popup__input-error-message'
};

//определение переменных картинок и текста карточек
const popupImageWindow = document.querySelector('.popup_picture');
const popupImageCloseSign = document.querySelector('.popup__close_type_open-image');

//определение области вокург контейнера попапа всех попапов
const overlays = Array.from(document.querySelectorAll('.popup__overlay'));

//нахождение формы изменения пользователя
const formUserEdit = document.querySelector('.popup__form_type_user-edit');
const formAddCard = document.querySelector('.popup__form_type_addCard-form');
//импорт класса Card
import {Card} from './Card.js';

//импорт класса FormValidator
import {FormValidator} from './FormValidator.js';

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
function togglePopup(element) {
    if(element.classList.contains('popup_opened')) {
        closePopup(element);

        //удаление обработчика нажатия на ESC для закрытия попапов
        document.removeEventListener('keydown', function (evt) {
            handleEscKeyboardButton(evt, element);
        })
    } else {
        openPopupElement(element);
        authorPopup.value = author.textContent;
        subtitlePopup.value = subtitle.textContent;

        //добавление обработчиков нажатия на кнопку ESC для закрытия попапа
        document.addEventListener('keydown', function (evt) {
            handleEscKeyboardButton(evt, element);
        })
    }
}

//функция добавки новой карточки
function addCard(event) {
    event.preventDefault();
    const card = new Card(cardPicture.value, cardName.value, '#card-container');
    const cardElement = card.generateCard();
    cardsList.prepend(cardElement);
}

//функция попеременного открытия и закрытия модального окна с увеличенными картинками
function toggleImagePopup(event) {
    const element = event.target.closest('.popup_picture');
    //удаление обработчика закрытия попапа с увеличенной картинкой при нажатии на ESC 
    document.removeEventListener('keydown', function (evt) {
        handleEscKeyboardButton(evt, element);
    })
    if(element.classList.contains('popup_opened')) {
        closePopup(element);
    } else {
        openPopupElement(popupImageWindow);
    }
}

//функция нахождения кнопки ESC
function handleEscKeyboardButton(evt, popupElement) {
    if(evt.key === 'Escape') {
        closePopup(popupElement);
    }
}

//вызовы модальных окон
userEditButton.addEventListener('click', function() {
    togglePopup(popup);
    const form = new FormValidator(selectorsObject, formUserEdit);
    //вызов функции очистки инпутов от ошибок
    form.clearErrors();
    //вызов функции запуска валидации
    form.enableValidation();
});
closeWindow.addEventListener('click', function() {
    togglePopup(popup);
});
editForm.addEventListener('submit', formSubmit);
addCardButton.addEventListener('click', function() {
    togglePopup(popupAddCard);
    const form = new FormValidator(selectorsObject, formAddCard);
    //вызов функции очистки инпутов от ошибок
    form.clearErrors();
    //вызов функции запуска валидации
    form.enableValidation();
});
closeWindowAddCard.addEventListener('click', function() {
    togglePopup(popupAddCard);
});
addCardForm.addEventListener('submit', addCard);

popupImageCloseSign.addEventListener('click', toggleImagePopup);


//навешивание событий закрытия оверлеев попапов
overlays.forEach((overlay) => {
    overlay.addEventListener('click', function(evt) {
        closePopup(evt.target.closest('.popup'))
    })
})

//отображение изначальных карточек через класс Card
initialCards.forEach((initialCard) => {
    const card = new Card(initialCard.link, initialCard.name, '#card-container');
    const cardElement = card.generateCard();
    cardsList.prepend(cardElement);
})


