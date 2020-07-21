import {Popup} from './Popup.js'

export class PopupWithForm extends Popup{
    constructor ({popupSelector, submitForm}) {
        super(popupSelector);
        this._submitForm = submitForm;
    }
    close () {
        document.querySelector(this._popupSelector).querySelector('.popup__form').reset();
        super.close();
    }
    _getInputValues() {
        this._inputList = Array.from(document.querySelector(this._popupSelector).querySelector('.popup__form').querySelectorAll('.popup__input'));
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        })
        return this._formValues;
    }
    setEventListeners() {
        document.querySelector(this._popupSelector).querySelector('.popup__form').addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues(), evt);
        })
        super.setEventListeners();        
    }
}