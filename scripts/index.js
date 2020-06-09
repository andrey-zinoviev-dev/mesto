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
const popupPicture = document.querySelector('.popup__image');
const popupPictureText = document.querySelector('.popup__image-text');
const popupImageCloseSign = document.querySelector('.popup__close_type_open-image');

//определение области вокург контейнера попапа всех попапов
const overlays = Array.from(document.querySelectorAll('.popup__overlay'));

//определение всех попапов
// const popups = Array.from(document.querySelectorAll('.popup'));

// authorPopup.value = author.textContent;
// subtitlePopup.value = subtitle.textContent;
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
function togglePopup(element, formElement, inputElement, inputErrorClass) {
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

        //вызов функции сброса ошибок полей инпутов
        clearErrorMessages(formElement, inputElement, inputErrorClass);
        enableValidationObj(selectorsObject);

        //добавление обработчиков нажатия на кнопку ESC для закрытия попапа
        document.addEventListener('keydown', function (evt) {
            handleEscKeyboardButton(evt, element);
        })
    }
}

//функция добавки новой карточки
function addCard(event) {
    event.preventDefault();
    const cardContainer = cardTemplate.content;
    const cardElement = cardContainer.cloneNode(true);
    renderCard(cardsList, cardElement, cardPicture.value, cardName.value);
    closePopup(event.target.closest('.popup_addCard'));
    clearForm(cardName, cardPicture);
}

//функция добавления текста и источника картинки
function addTextAndImage(elementPicture, elementText, image, text) {
    elementPicture.src = image;
    elementText.textContent = text;
}

//функция удаления картинки
function deleteCard(element) {
    element.closest('.elements__element').classList.add('elements__element_status_deleted');
}

//функция актив-деактив лайков
function likeToggle(element) {
    element.firstChild.classList.toggle('elements__element-like-sign_status_active');
}

//функция рендера карточки
function renderCard(elementsList, element, image, text) {
    const cardImage = element.querySelector('.elements__element-photo');
    const cardText = element.querySelector('.elements__element-text');
    const deleteButton = element.querySelector('.elements__element-delete-sign');
    const likeButton = element.querySelector('.elements__element-like')
    addTextAndImage(cardImage, cardText, image, text);
    deleteButton.addEventListener('click', function() {
        deleteCard(deleteButton);
    })
    likeButton.addEventListener('click', function() {
        likeToggle(likeButton);
    })
    cardImage.addEventListener('click', function (event) {
        zoomImage(event);
        popupImageCloseSign.addEventListener('click', toggleImagePopup);
    })
    elementsList.prepend(element);
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

//функция увеличения картинки по клику
function zoomImage(element) {
    const imageLink = element.target.src;
    const imageName = element.target.nextElementSibling.children[0].textContent;
    popupPicture.src = imageLink;
    popupPictureText.textContent = imageName;
    openPopupElement(popupImageWindow);
    
    //добавление обработчика закрытия попапа с увеличенной картинкой нажатием на ESC
    document.addEventListener('keydown', function (evt) {
        handleEscKeyboardButton(evt, popupImageWindow);
    })
}
//фукнция очистки форм
function clearForm(input1, input2) {
    input1.value = '';
    input2.value = '';
}

//фукнция добавления изначальных карточек
function addInitialCards(cardsList, object) {
    const cardContainer = cardTemplate.content;
    const cardElement = cardContainer.cloneNode(true);
    renderCard(cardsList, cardElement, object.link, object.name);
}

//функция нахождения кнопки ESC
function handleEscKeyboardButton(evt, popupElement) {
    if(evt.key === 'Escape') {
        closePopup(popupElement);
    }
}

//отображение начальных карточек
initialCards.forEach((el) => {
    addInitialCards(cardsList, el);
})


//вызовы модальных окон
userEditButton.addEventListener('click', function() {
    togglePopup(popup, selectorsObject.formSelector, selectorsObject.inputSelector, selectorsObject.inputErrorClass);
});
closeWindow.addEventListener('click', function() {
    togglePopup(popup, selectorsObject.formSelector, selectorsObject.inputSelector, selectorsObject.inputErrorClass);
});
editForm.addEventListener('submit', formSubmit);
addCardButton.addEventListener('click', function() {
    togglePopup(popupAddCard, selectorsObject.formSelector, selectorsObject.inputSelector, selectorsObject.inputErrorClass);
});
closeWindowAddCard.addEventListener('click', function() {
    togglePopup(popupAddCard, selectorsObject.formSelector, selectorsObject.inputSelector, selectorsObject.inputErrorClass);
});
addCardForm.addEventListener('submit', addCard);

//навешивание событий закрытия оверлеев попапов
overlays.forEach((overlay) => {
    overlay.addEventListener('click', function(evt) {
        closePopup(evt.target.closest('.popup'))
    })
})
