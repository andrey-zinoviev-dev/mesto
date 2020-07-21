import {Popup} from "./Popup.js";

export class PopupDeleteCard extends Popup{
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
    }
    setEventListeners() {
        document.querySelector(this._popupSelector).querySelector('.popup__edit-button').addEventListener('click', () => {
            this._handleSubmit();
            super.close();
        });
        super.setEventListeners();
    }
}