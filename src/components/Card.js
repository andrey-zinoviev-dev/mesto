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
    }
    _handleDeleteButton() {
        this._element.classList.add('elements__element_status_deleted');
    }
    _handleLikeButton() {
        this._element.querySelector('.elements__element-like').firstChild.classList.toggle('elements__element-like-sign_status_active');
    }
    generateCard() {
        this._element = this._getCardElement();
        this._setEventListeners();
        const imageSelector = this._element.querySelector('.elements__element-photo');
        imageSelector.src = this._image;
        imageSelector.alt = this._text;
        this._element.querySelector('.elements__element-text').textContent = this._text;
        return this._element;
    }
}
