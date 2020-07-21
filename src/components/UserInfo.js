export class UserInfo {
    constructor(userEditObject, avatarElement) {
        this._userName = document.querySelector(userEditObject.username);
        this._userOccupation = document.querySelector(userEditObject.occupation);
        this._avatar = document.querySelector(avatarElement);
    }
    getUserInfo() {
        this._returnedUserData = {username: this._userName.textContent, occupation: this._userOccupation.textContent};
        return this._returnedUserData; 
    }
    setUserInfo(formData) {
        this._userName.textContent = formData.username || formData.name;
        this._userOccupation.textContent = formData.occupation || formData.about;
        this._avatar.src = formData.avatar;
    }
}