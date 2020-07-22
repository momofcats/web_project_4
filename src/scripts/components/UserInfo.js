export default class UserInfo {
  constructor({ userNameSelector, userJobSelector, userAvatarSelector }) {
    this._userJob = document.querySelector(userJobSelector);
    this._userName = document.querySelector(userNameSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);

  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userJob.textContent,
      avatar: this._userAvatar.src,
    };
  }

  setUserInfo(userInfo) {
    if (userInfo.avatar){
      this._userAvatar.src = userInfo.avatar;
    }
    this._userName.textContent = userInfo.name;
    this._userJob.textContent = userInfo.about;

  }


}
