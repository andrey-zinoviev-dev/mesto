
//импорт класса Card
import {Card} from '../components/Card.js';

//импорт класса FormValidator
import {FormValidator} from '../components/FormValidator.js';

//импорт класса Section
import {Section} from '../components/Section.js';

//импорт класса PopupWithImage
import {PopupWithImage} from '../components/PopupWithImage.js';

//импорт класса PopupWithForm 
import {PopupWithForm} from '../components/PopupWithForm.js';

import { UserInfo } from '../components/UserInfo.js';

import {userEditButton, addCardButton, initialCards, selectorsObject, formUserEdit, formAddCard, userNameInput, userOccupationInput} from '../utils/utils.js'

import './index.css';

//создание классов PopupWithForm и UserInfo

const userInfo = new UserInfo ({username: '.profile__heading', occupation: '.profile__subtitle'});

const userEditPopup = new PopupWithForm({popupSelector: '.popup', submitForm: (formData) => {
    userInfo.setUserInfo(formData);
    userEditPopup.close();
}})

//ВАЖНО!!! УСТАНОВИТЬ ОБРАБОТЧИКИ СОБЫТИЙ ОДИН РАЗ, А НЕ НА КАЖДОЕ ОТКРЫТИЕ ПОПАПА!!!
userEditPopup.setEventListeners();

//создание экземпляра класса PopupWithImage
const imagePopup = new PopupWithImage('.popup_picture');

//создание экземпляра класса FormValidator при изменении пользователя
const userEditForm = new FormValidator(selectorsObject, formUserEdit);

//вызовы модальных окон

//открытие попапа редактирования пользователя
userEditButton.addEventListener('click', function() {
    userEditPopup.open();
    const userData = userInfo.getUserInfo();
    userNameInput.value = userData.username;
    userOccupationInput.value = userData.occupation;
    
    //вызов функции очистки инпутов от ошибок
    userEditForm.clearErrors();
    //вызов функции запуска валидации
    userEditForm.enableValidation();
});

//содание экземпляра класса PopupWithForm (попап с добвлением новой карточки)
const popupAddCardElement = new PopupWithForm ({popupSelector:'.popup_addCard', submitForm: (formData) => {
    const card = new Card (formData['palce-image-link'], formData['place-name'], () => {
        imagePopup.open(formData['palce-image-link'], formData['place-name']);
        imagePopup.setEventListeners();
    }, '#card-container');
    const cardElement = card.generateCard();
    popupAddCardElement.close();
    cardsDefaultList.addItem(cardElement);
}})

popupAddCardElement.setEventListeners();

//создание экземпляра класса FormValidator для формы попапа добавления новой карточки
const addCardForm = new FormValidator(selectorsObject, formAddCard);

//открытие попапа добавления новой карточки
addCardButton.addEventListener('click', function() {
    //инициирование класса PopupWithForm
    popupAddCardElement.open();
    
    //вызов функции очистки инпутов от ошибок
    addCardForm.clearErrors();
    //вызов функции запуска валидации
    addCardForm.enableValidation();
});

//отображение изначальных через класс section
const cardsDefaultList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item.link, item.name, () => {
           
            imagePopup.open(item.link, item.name);
            imagePopup.setEventListeners();
        }, "#card-container");
        const cardElement = card.generateCard();
        cardsDefaultList.addItem(cardElement);
        }
    },
    '.elements__list'
)

cardsDefaultList.elementRenderer();
