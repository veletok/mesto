export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.then((items)=>{
      items.forEach(item => this._renderer(item));
    })
  }

  setItem(element) {
    this._container.prepend(element);
  }
}
