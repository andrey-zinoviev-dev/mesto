import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
    }
    open(link, name) {
        document.querySelector(this._popupSelector).querySelector('.popup__image').src= link;
        document.querySelector(this._popupSelector).querySelector('.popup__image-text').textContent = name;
        super.open();
    }
}