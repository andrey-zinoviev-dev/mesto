export class Card {
    constructor (image, text, handleCardClick, templateSelector) {
        this._image = image;
        this._text = text;
        this.handleCardClick = handleCardClick;
        this._templateSelector = templateSelector;
    }
    _getCardElement() {
        const cardElement = document.querySelector(this._templateSelector)
        .content
        .querySelector('.elements__element')
        .cloneNode(true);

        return cardElement;
    }
    _setEventListeners() {
        this._element.querySelector('.elements__element-like').addEventListener('click', () => {
            this._handleLikeButton();
        })
        this._element.querySelector('.elements__element-photo').addEventListener('click', () => {
            this.handleCardClick();
        })
        this._element.querySelector('.elements__element-delete-sign').addEventListener('click', () => {
            this._handleDeleteButton();
        })
        // document.addEventListener('keydown',(evt) => {
        //     this._handleEscKeyboardButton(evt);
        // })
    }
    // _handleImagePopup() {
    //     document.querySelector('.popup_picture').classList.add('popup_opened');
    //     document.querySelector('.popup__image').src = this._image;
    //     document.querySelector('.popup__image-text').textContent = this._text;
    //     document.addEventListener('keydown', (evt) => {
    //         this._handleEscKeyboardButton(evt);
    //     })
    // }
    _handleDeleteButton() {
        this._element.classList.add('elements__element_status_deleted');
    }
    _handleLikeButton() {
        this._element.querySelector('.elements__element-like').firstChild.classList.toggle('elements__element-like-sign_status_active');
    }
    // _handleEscKeyboardButton(evt) {
    //     if(evt.key === 'Escape') {
    //         document.querySelector('.popup_picture').classList.remove('popup_opened');
    //     }
    // }
    generateCard() {
        this._element = this._getCardElement();
        this._setEventListeners();
        this._element.querySelector('.elements__element-photo').src = this._image;
        this._element.querySelector('.elements__element-text').textContent = this._text;
        return this._element;
    }
}
