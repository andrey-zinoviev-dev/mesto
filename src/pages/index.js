
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
// import { is } from 'core-js/fn/object';
//создание экземпляра класса Api 
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
    headers: {
        authorization: '12f43955-076f-4f9d-b681-082f556a73e2',
        'Content-Type': 'application/json'
    }
})

//создание экземпляра класса PopupWithForm для редактирования пользователя страницы
const userInfo = new UserInfo ({username: '.profile__heading', occupation: '.profile__subtitle'},  avatarElement);

//запрос данных о пользователе с сервера

let isLiked; 

const initialUser = api.getUser()
.then((data) => {
    userInfo.setUserInfo(data);
    //запрос данных о картинках с сервера
    api.getInitialCards()
    .then((cardsData) => {
        const cardsDefaultList = new Section({
            items: cardsData,
            renderer: (item) => {
                if(cardIsLiked(item.likes, data)) {
                    isLiked = true;
                } else {
                    isLiked = false;
                }
                const card = new Card(item.link, item.name, isLiked,item.likes.length, item.owner, () => {
               
                imagePopup.open(item.link, item.name);
                imagePopup.setEventListeners();
            }, (evt) => {
                deleteCardPopup.open();
                deleteCardPopup._handleSubmit = () => {
                    api.deleteCard(item._id)
                    .then((res) => {
                        evt.target.closest('.elements__element').remove();
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                }
            }, (evt) => {
                if(card.isLiked) {
                    api.removeLike(item._id)
                    .then((cardData) => {
                        evt.target.closest('.elements__element-like-count').querySelector('.elements__element-like-number').textContent = cardData.likes.length;
                        card.isLiked = !card.isLiked;
                    })
                } 
                else {
                    api.setLike(item._id)
                    .then((cardData) => {
                        evt.target.closest('.elements__element-like-count').querySelector('.elements__element-like-number').textContent = cardData.likes.length;
                        card.isLiked = !card.isLiked;
                    })
                }
            }, "#card-container");
            const cardElement = card.generateCard(data, cardIsLiked(item.likes, data));
            cardsDefaultList.addItem(cardElement);
            }
        },
        '.elements__list'
    )
        cardsDefaultList.elementRenderer();
    })
})



//создание классов PopupWithForm и UserInfo

const userEditPopup = new PopupWithForm({popupSelector: '.popup', submitForm: (formData, evt) => {
    renderLoading(true, evt.target)
    const editUser = api.editProfile(formData)
    .then((data) => {
        userInfo.setUserInfo(data);
        renderLoading(false, evt.target);
        userEditPopup.close();
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
    const addedCard = api.addCard(formData)
    // addedCard.then((res) => {
    //     return res.json();
    // })
    .then((data) => {
        renderLoading(false, evt.target);
        const appendCardSection = new Section ({items: data, renderer: (data) => {
            const card = new Card (data.link, data.name, false,data.likes.length, data.owner, () => {
                imagePopup.open(data.link, data.name);
                imagePopup.setEventListeners();
                },(evt) => {
                    deleteCardPopup.open();
                    deleteCardPopup._handleSubmit = () =>{
                        api.deleteCard(data._id)
                        .then((data) => {
                            evt.target.closest('.elements__element').remove();
                        })
                    }
                }, (evt) => {
                    if(card.isLiked) {
                        console.log('like unset on new card');
                        api.removeLike(data._id)
                        .then((cardData) => {
                            evt.target.closest('.elements__element-like-count').querySelector('.elements__element-like-number').textContent = cardData.likes.length;
                            card._handleLikeButton();
                            evt.target.classList.remove('elements__element-like-sign_status_active');
                            card.isLiked = !card.isLiked;
                        })
                    } else {
                        console.log('like set on new card');
                        api.setLike(data._id)
                        .then((cardData) => {
                            evt.target.closest('.elements__element-like-count').querySelector('.elements__element-like-number').textContent = cardData.likes.length;
                            evt.target.classList.add('elements__element-like-sign_status_active');
                            card.isLiked = !card.isLiked;
                        })
                    }
                },'#card-container');
                const cardElement = card.generateCard(data.owner);
                appendCardSection.addItem(cardElement);
            }
        }, '.elements__list')
        appendCardSection.oneElementRenderer();
    })
    popupAddCardElement.close();
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
        renderLoading(false, evt.target);
        document.querySelector(avatarElement).src = data.avatar;
        changeUserAvatar.close();
    })
    
}})
changeUserAvatar.setEventListeners();

userAvatarEditButton.addEventListener('click', () => {
    changeUserAvatar.open();
})