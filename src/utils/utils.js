export const userEditButton = document.querySelector('.profile__edit-button');
export const addCardButton = document.querySelector('.profile__add-button');
import karachaevskImage from '../images/kirill-pershin-1088404-unsplash.jpg';
import elbrusImage from '../images/kirill-pershin-1404681-unsplash—copy.png';
import dombayImage from '../images/kirill-pershin-1404681-unsplash.png';
import stavropolImage from '../images/4930361594912182.jpeg';
import dombayMountainImage from '../images/thumb1130_vozd.jpg';
import volgogradImage from '../images/rm1920-2-mr.jpg';
export const initialCards = [
    {
        name: "Карачаевск",
        link: karachaevskImage,
        alt: 'Карачаевск'
    },
    {
        name: "Гора Эльбрус",
        link: elbrusImage,
        alt: 'Эльбрус'
    },
    {
        name: "Домбай",
        link: dombayImage,
        alt: 'Домбай'
    },
    {
        name: "Ставрополь",
        link: stavropolImage,
        alt: 'Ставрополь'
    },
    {
        name: "Домбай",
        link: dombayMountainImage,
        alt: 'Домбай'
    },
    {
        name: "Волгоград",
        link: volgogradImage,
        alt: 'Волгоград'
    }
];
export const selectorsObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__edit-button',
    inactiveButtonClass: 'popup__edit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: '.popup__input-error-message'
};
export const formUserEdit = document.querySelector('.popup__form_type_user-edit');
export const formAddCard = document.querySelector('.popup__form_type_addCard-form');
export const userNameInput = document.querySelector('.popup').querySelector('.popup__form').querySelector('.popup__input_order_first');
export const userOccupationInput = document.querySelector('.popup').querySelector('.popup__form').querySelector('.popup__input_order_second');
