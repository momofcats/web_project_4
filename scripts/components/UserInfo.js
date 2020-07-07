export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._userJob = document.querySelector(userJobSelector);
    this._userName = document.querySelector(userNameSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._userJob.textContent,
    };
  }

  setUserInfo(userInfo) {
    this._userName.textContent = userInfo.name;
    this._userJob.textContent = userInfo.job;
  }
}
