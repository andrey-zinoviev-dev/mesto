export class Popup {
    constructor (popupSelector) {
        this._popupSelector = popupSelector;
    }
    open() {
        document.querySelector(this._popupSelector).classList.add('popup_opened');
    }
    close() {
        document.querySelector(this._popupSelector).classList.remove('popup_opened');
        document.removeEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        })
    }
    _handleEscClose(evt) {
        if(evt.key === 'Escape') {
            this.close();
        }
    }
    setEventListeners() {
        document.querySelector(this._popupSelector).querySelector('.popup__close').addEventListener('click', () => {
            this.close();
        })
        document.querySelector(this._popupSelector).querySelector('.popup__overlay').addEventListener('click', () => {
            this.close();
        })
        document.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        })
    }
}