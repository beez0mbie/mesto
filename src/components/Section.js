export class Section {
  constructor({ dataItems, renderer }, containerSelector) {
    this._itemsToRender = dataItems;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(domElement) {
    this._container.prepend(domElement);
  }

  renderItems() {
    this._itemsToRender.forEach((item) => {
      this._renderer(item);
    });
  }
}
