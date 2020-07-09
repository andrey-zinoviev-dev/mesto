export class UserInfo {
    constructor(userEditObject) {
        this._userName = document.querySelector(userEditObject.username);
        this._userOccupation = document.querySelector(userEditObject.occupation)
    }
    getUserInfo() {
        this._returnedUserData = {username: this._userName.textContent, occupation: this._userOccupation.textContent};
        return this._returnedUserData; 
    }
    setUserInfo(formData) {
        this._userName.textContent = formData.username;
        this._userOccupation.textContent = formData.occupation;
    }
}