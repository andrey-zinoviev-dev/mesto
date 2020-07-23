
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

import {userEditButton, addCardButton, selectorsObject, formUserEdit, formUserEditInputs, formUserEditSubmitButton, formAddCard, formAddCardInputs, formAddCardSubmitButton, userNameInput, userOccupationInput, avatarElement, userAvatarEditButton, avatarEditPopupSelector, avatarEditForm, renderLoading, cardIsLiked} from '../utils/utils.js'

import './index.css';

import {Api} from '../components/Api.js'
// import { Popup } from '../components/Popup.js';
import {PopupDeleteCard} from '../components/PopupDeleteCard.js';

//создание экземпляра класса Api 
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
    headers: {
        authorization: '12f43955-076f-4f9d-b681-082f556a73e2',
        'Content-Type': 'application/json'
    }
})

//параметр для определения поставленного лайка картинке, понадобится позже
let isLiked; 

//создание экземпляра класса PopupWithForm для редактирования пользователя страницы
const userInfo = new UserInfo ({username: '.profile__heading', occupation: '.profile__subtitle'},  avatarElement);


//создание экземпляра класса Section
const cardsDefaultList = new Section({}, '.elements__list');

//функция создания экземпляра класса Card
function createAndAppendCard(item, userData) {
    const card = new Card(item.link, item.name, isLiked, item.likes.length, item.owner, () => {
        imagePopup.open(item.link, item.name);
        imagePopup.setEventListeners();
        }, () => {
        deleteCardPopup._handleSubmit = () => {
            api.deleteCard(item._id)
            .then((data) => {
                card.removeCard();
            })
            .catch((err) => {
                console.log(err);
            })
        }
        deleteCardPopup.open();
        }, () => {
        if(card.isLiked) {
            api.removeLike(item._id)
            .then((data) => {
                card._handleLikeButton();
                card._handleLikeCount(data.likes.length);
                card.isLiked = !card.isLiked;
            })
            .catch((err) => {
                console.log(err);
            })
        } else {
            api.setLike(item._id)
            .then((data) => {
                card._handleLikeButton();
                card._handleLikeCount(data.likes.length)
                card.isLiked = !card.isLiked;
            })
            .catch((err) => {
                console.log(err);
            })
        }
     }, "#card-container");
    const cardElement = card.generateCard(userData, card.isLiked);
    cardsDefaultList.addItem(cardElement);
}
//запрос данных о пользователе с сервера вместе с картинками

Promise.all([api.getUser(), api.getInitialCards()])
.then((data) => {
    //ответ сервера с данными пользователя и карточками
    const [userData, initialCards] = data;
    //запись данных пользователя в DOM
    userInfo.setUserInfo(userData);
    cardsDefaultList._items = initialCards;
    cardsDefaultList._renderer = (item) => {
        if(cardIsLiked(item.likes, userData)) {
            isLiked = true;
        } else {
            isLiked = false;
        }
        createAndAppendCard(item, userData);
    } 
    cardsDefaultList.elementRenderer();
})
.catch((err) => {
    console.log(err);
})

//создание классов PopupWithForm и UserInfo

const userEditPopup = new PopupWithForm({popupSelector: '.popup', submitForm: (formData, evt) => {
    renderLoading(true, evt.target)
    api.editProfile(formData)
    .then((data) => {
        userInfo.setUserInfo(data);
        userEditPopup.close();
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        renderLoading(false, evt.target);
    })
}})

//ВАЖНО!!! УСТАНОВИТЬ ОБРАБОТЧИКИ СОБЫТИЙ ОДИН РАЗ, А НЕ НА КАЖДОЕ ОТКРЫТИЕ ПОПАПА!!!
userEditPopup.setEventListeners();

//создание экземпляра класса PopupWithImage
const imagePopup = new PopupWithImage('.popup_picture');

//создание экземпляра класса FormValidator при изменении пользователя
const userEditForm = new FormValidator(selectorsObject, formUserEdit);

//вызов функции запуска валидации
userEditForm.enableValidation();

//вызовы модальных окон

//открытие попапа редактирования пользователя
userEditButton.addEventListener('click', function() {
    userEditPopup.open();
    const userData = userInfo.getUserInfo();
    userNameInput.value = userData.username;
    userOccupationInput.value = userData.occupation;
    
    //вызов функции очистки инпутов от ошибок
    userEditForm.clearErrors();
    //вызов фукнции изменения статуса кнопки
    userEditForm.switchButtonStatus(formUserEditInputs, formUserEditSubmitButton)
});

//содание экземпляра класса PopupWithForm (попап с добвлением новой карточки)

const popupAddCardElement = new PopupWithForm ({popupSelector:'.popup_addCard', submitForm: (formData, evt) => {
    renderLoading(true, evt.target);
    api.addCard(formData)
    .then((data) => {
        createAndAppendCard(data, data.owner);
        popupAddCardElement.close();
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        renderLoading(false, evt.target);
    })
}})

popupAddCardElement.setEventListeners();

//создание экземпляра класса FormValidator для формы попапа добавления новой карточки
const addCardForm = new FormValidator(selectorsObject, formAddCard);

//вызов функции запуска валидации
addCardForm.enableValidation();

//открытие попапа добавления новой карточки
addCardButton.addEventListener('click', function() {
    //инициирование класса PopupWithForm
    popupAddCardElement.open();
    
    //вызов функции очистки инпутов от ошибок
    addCardForm.clearErrors();
    //вызов фукнции изменения статуса кнопки
    addCardForm.switchButtonStatus(formAddCardInputs, formAddCardSubmitButton);
});

//создание экземпляра класса Popup для удаления карточки
const deleteCardPopup = new PopupDeleteCard('.popup_delete-image');
deleteCardPopup.setEventListeners();

//создание экземпляра класса FormValidator для формы обновления аватара пользователя
const userAvatarForm = new FormValidator(selectorsObject, avatarEditForm);
//вызов функции валидации формы обновления аватара
userAvatarForm.enableValidation();

//попап замены аватара
const changeUserAvatar = new PopupWithForm({popupSelector: avatarEditPopupSelector, submitForm: (formData, evt) => {
    renderLoading(true, evt.target);
    api.updateAvatar(formData['avatar-link'])
    .then((data) => {
        document.querySelector(avatarElement).src = data.avatar;
        changeUserAvatar.close();
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        renderLoading(false, evt.target);
    })
}})
changeUserAvatar.setEventListeners();

userAvatarEditButton.addEventListener('click', () => {
    changeUserAvatar.open();
})