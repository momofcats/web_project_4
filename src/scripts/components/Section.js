export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._promise = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems() {
    this._promise.then(items => {
      items.forEach((item) => this._renderer(item))
    });

  }

  addItem(element) {
    this._container.prepend(element);
  }
}
