export class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    _handleResponse(res) {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    _handleErrorResponse(err) {
        console.log(err.message);
        return Promise.reject(`Ошибка: ${err.message}`);
    }
    getUser() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then(this._handleResponse)
        .catch(this._handleErrorResponse)
    }
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(this._handleResponse)
        .catch(this._handleResponse)
    }
    editProfile(formData) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: formData.username,
                about: formData.occupation
            })
        })
        .then(this._handleResponse)
        .catch(this._handleErrorResponse)
    }
    addCard(formData) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                link: formData['palce-image-link'],
                name: formData['place-name']
            })
        })
        .then(this._handleResponse)
        .catch(this._handleErrorResponse)
    }
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._handleResponse)
        .catch(this._handleErrorResponse)
    }
    setLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(this._handleResponse)
        .catch(this._handleErrorResponse)
    }
    removeLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._handleResponse)
        .catch(this._handleErrorResponse)
    }
   updateAvatar(formData) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
           method: 'PATCH',
           headers: this._headers,
           body: JSON.stringify({
               avatar: formData
           })
        })
        .then(this._handleResponse)
        .catch(this._handleErrorResponse)
   }
}