
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

//вызовы модальных окон
userEditButton.addEventListener('click', function() {
    userEditPopup.open();
    const userData = userInfo.getUserInfo();
    // console.log(userData.username);
    userNameInput.value = userData.username;
    userOccupationInput.value = userData.occupation;
    const form = new FormValidator(selectorsObject, formUserEdit);
    //вызов функции очистки инпутов от ошибок
    form.clearErrors();
    //вызов функции запуска валидации
    form.enableValidation();
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

addCardButton.addEventListener('click', function() {
    //инициирование класса PopupWithForm
    popupAddCardElement.open();
    const form = new FormValidator(selectorsObject, formAddCard);
    //вызов функции очистки инпутов от ошибок
    form.clearErrors();
    //вызов функции запуска валидации
    form.enableValidation();
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
