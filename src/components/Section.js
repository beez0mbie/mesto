export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(domElement) {
    this._container.prepend(domElement);
  }

  renderItems(dataItems) {
    dataItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
