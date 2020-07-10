import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
    }
    open(link, name) {
        const popupImageSelector = document.querySelector(this._popupSelector).querySelector('.popup__image');
        popupImageSelector.src= link;
        popupImageSelector.alt = name;
        document.querySelector(this._popupSelector).querySelector('.popup__image-text').textContent = name;
        super.open();
    }
}