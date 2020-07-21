export class Card {
    constructor (image, text, isLiked, likes, owner, handleCardClick, handleDeleteButtonClick, handleLikeClick, templateSelector) {
        this._image = image;
        this._text = text;
        this.isLiked = isLiked;
        this._likes = likes;
        this._owner = owner;
        this.handleCardClick = handleCardClick;
        this.handleDeleteButtonClick = handleDeleteButtonClick;
        this.handleLikeClick = handleLikeClick;
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
        this._element.querySelector('.elements__element-like').addEventListener('click', (evt) => {
            this.handleLikeClick(evt);
            this._handleLikeButton();
        })
        this._element.querySelector('.elements__element-photo').addEventListener('click', () => {
            this.handleCardClick();
        })
        this._element.querySelector('.elements__element-delete-sign').addEventListener('click', (evt) => {
            this.handleDeleteButtonClick(evt);
        })
    }
    _handleLikeButton() {
        this._element.querySelector('.elements__element-like').firstChild.classList.toggle('elements__element-like-sign_status_active');
    }
    generateCard(ownerData, likeData) {
        this._element = this._getCardElement();
        this._setEventListeners();
        if(this._owner._id !==ownerData._id) {
            this._element.querySelector('.elements__element-delete-sign').remove();
        }
        if(likeData) {
            this._element.querySelector('.elements__element-like-sign').classList.add('elements__element-like-sign_status_active');
        }
        const imageSelector = this._element.querySelector('.elements__element-photo');
        imageSelector.src = this._image;
        imageSelector.alt = this._text;
        this._element.querySelector('.elements__element-text').textContent = this._text;
        this._element.querySelector('.elements__element-like-number').textContent = this._likes;
        return this._element;
    }
}
